<template>
  <div class="q-pa-lg">
    <h1>Login</h1>
    <q-input filled v-model="email" label="Email" dense />
    <q-input
      filled
      v-model="password"
      label="Senha"
      :type="passwordVisible ? 'text' : 'password'"
      dense
    >
      <template v-slot:append>
        <q-icon
          :name="passwordIcon"
          color="gray"
          @click="togglePasswordVisibility"
        />
      </template>
    </q-input>
    <q-btn color="primary" label="Entrar" @click="login" />
  </div>
</template>

<script>
import { ref, defineComponent, defineProps } from "vue";
import { QInput, QBtn } from "quasar";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginBlock",
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  components: {
    QInput,
    QBtn,
  },
  data() {
    return {
      email: "teste@teste.com",
      password: "123456",
      passwordVisible: false,
      passwordIcon: "mdi-eye",
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
      this.passwordIcon = this.passwordVisible ? "mdi-eye-off" : "mdi-eye";
    },
    login() {
      if (this.email === "teste@teste.com" && this.password === "123456") {
        // Navigate to the Home component
        this.router.push({ path: "/home" });
      } else {
        alert("Invalid credentials");
      }
    },
  },
});
</script>
