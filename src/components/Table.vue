<template>
  <div>
    <!-- Table content -->
    <q-table :rows="entities" :rows-per-page-options="[10]" v-model="pagination.page" :loading="loading">
      <!-- Table header -->
      <template #top>
        <q-btn color="primary" @click="openAddItemModal">Add Item</q-btn>
      </template>

      <!-- Table body -->
      <template #body="props">
        <!-- Row -->
        <q-tr :props="props">
          <!-- ID column -->
          <q-td key="id" :props="props">{{ props.row.id }}</q-td>
          <!-- Name column -->
          <q-td key="name" :props="props">
            <q-input dense outlined v-model="props.row.name" @blur="editEntity(props.row)" />
          </q-td>
          <!-- Active column -->
          <q-td key="active" :props="props">
            <q-input dense outlined type="number" v-model="props.row.active" :min="0" :max="1"
              @blur="editEntity(props.row)" />
          </q-td>
          <!-- Order column -->
          <q-td key="order" :props="props">
            <q-input dense outlined type="number" v-model="props.row.order" :min="0" @blur="editEntity(props.row)" />
          </q-td>
          <!-- Delete button column -->
          <q-td>
            <q-btn dense flat color="negative" icon="mdi-delete" @click="deleteEntity(props.row)"></q-btn>
          </q-td>
        </q-tr>
      </template>

      <!-- Table footer -->
      <template #bottom>
        <!-- Add item row -->
        <q-tr :style="{ display: isAddItemModalOpen ? 'block' : 'none' }">
          <q-td>New Item:</q-td>
          <q-td>
            <q-input v-model="newItem.name" label="Item Name" dense outlined type="text" />
          </q-td>
          <q-td>
            <q-input v-model="newItem.active" label="Active" :min="0" :max="1" dense outlined type="number" />
          </q-td>
          <q-td>
            <q-input v-model="newItem.order" label="Item Order" :min="0" dense outlined type="number" />
          </q-td>
          <q-td>
            <q-btn color="primary" label="Save" @click="saveItem(newItem)" />
          </q-td>
        </q-tr>

        <!-- Pagination -->
        <q-tr>
          <q-td :colspan="5" class="text-center">
            <q-btn v-if="pagination.prev" color="primary" label="Previous" @click="loadPage(pagination.prev)" />
            <q-btn v-if="pagination.next" color="primary" label="Next" @click="loadPage(pagination.next)" />

            <!-- <q-btn v-for="pageNumber in getTotalPages" :key="pageNumber" color="primary" :label="pageNumber"
              @click="loadPage(pageNumber)" /> -->
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent, computed } from "vue";
import HouseRuleService from "../services/apiService";
export default defineComponent({
  name: "TableCrud",
  setup() {
    const entities = ref([]);
    const pagination = reactive({
      page: 1,
      rowsPerPage: 10,
      totalItems: 0,
      prev: null,
      next: null,
    });
    const loading = ref(false);
    const isAddItemModalOpen = ref(false);
    const newItem = reactive({
      name: "",
      active: 0,
      order: 0,
    });

    const updateEntitiesAndPagination = (response) => {
      entities.value = response.data.entities;
      pagination.page = response.data.pagination.current_page;
      pagination.rowsPerPage = response.data.pagination.per_page;
      pagination.totalItems = response.data.pagination.count;
      pagination.prev = response.data.pagination.links.prev || null;
      pagination.next = response.data.pagination.links.next || null;
    };

    const fetchEntities = async () => {
      loading.value = true;

      try {
        const response = await HouseRuleService.listHouseRules();
        loading.value = false;
        updateEntitiesAndPagination(response);
      } catch (error) {
        console.log("Error fetching entities:", error);
      }
    };

    const loadPage = async (url) => {
      const pageNumber = url.match(/page=(\d+)/)[1];
      const address = pageNumber ? pageNumber : url;
      loading.value = true;

      try {
        const response = await HouseRuleService.loadEntitiesByUrl(address);
        loading.value = false;
        updateEntitiesAndPagination(response);
        pagination.apiUrl = response.data.pagination.links.next || null;
      } catch (error) {
        console.log("Error loading page:", error);
      }
    };

    const openAddItemModal = () => {
      isAddItemModalOpen.value = true;
    };

    const closeAddItemModal = () => {
      isAddItemModalOpen.value = false;
      newItem.name = "";
      newItem.active = 0;
      newItem.order = 0;
    };

    const getTotalPages = computed(() => {
      return Math.ceil(pagination.totalItems / pagination.rowsPerPage);
    });

    const editEntity = async (entity) => {
      const { id, name, active } = entity;
      try {
        await HouseRuleService.updateHouseRule(id, name, active);
        console.log("Editing entity:", entity);
      } catch (error) {
        console.log("Error editing entity:", error);
      }
    };

    const deleteEntity = async (entity) => {
      const { id } = entity;
      try {
        await HouseRuleService.deleteHouseRule(id);
        console.log("Deleting entity:", entity);
        fetchEntities(); // Reload entities after deleting the item
      } catch (error) {
        console.log("Error deleting entity:", error);
      }
    };

    const saveItem = async () => {
      try {
        await HouseRuleService.createHouseRule(newItem.name, newItem.active);
        console.log("Saved item:", newItem);
        closeAddItemModal();
        fetchEntities(); // Reload entities after saving the item
      } catch (error) {
        console.error("Error saving item:", error);
      }
    };




    // Other methods

    onMounted(() => {
      fetchEntities();
    });

    return {
      entities,
      pagination,
      loading,
      isAddItemModalOpen,
      newItem,
      saveItem,
      editEntity,
      deleteEntity,
      openAddItemModal,
      getTotalPages,
      closeAddItemModal,
      loadPage
    };
  },
}); </script>