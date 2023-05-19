<template>
  <q-page class="flex flex-center">
    <login-block></login-block>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import LoginBlock from "components/Login.vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    LoginBlock,
  },
});
</script>
