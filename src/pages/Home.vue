<template>
  <q-page class="flex flex-center">
    <table-crud></table-crud>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import TableCrud from "components/Table.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    TableCrud,
  },
});
</script>
