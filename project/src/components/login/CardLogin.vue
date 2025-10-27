<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  titleClass?: string;
  subtitleClass?: string;
  msgClass?: string;
  pClass?: string;
  footerClass?: string;

  title: string;
  subtitle: string;
  msg: string;
  correo: string;
  contraseña: string;
  footer: string;
  button: string;

  containerClass?: string;
  headerClass?: string;
  bodyClass?: string;
  formClass?: string;

  inputContainer?: string;
  aContainer?: string;

  buttonClass?: string;
  inputClass?: string;

  placehorderCorreo: string;
  placehorderContraseña: string;
}>();

const emit = defineEmits<{
  (e: "login", data: { correo: string; contraseña: string }): void;
}>();

const correoInput = ref("");
const contraseñaInput = ref("");

const handleLogin = () => {
  emit("login", { correo: correoInput.value, contraseña: contraseñaInput.value });
};
</script>

<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <h1 :class="titleClass">{{ title }}</h1>
      <h2 :class="subtitleClass">{{ subtitle }}</h2>
    </div>

    <div :class="bodyClass">
      <p :class="msgClass">{{ msg }}</p>
      <div :class="formClass">
        <div :class="inputContainer">
          <p :class="pClass">{{ correo }}</p>
          <input
            v-model="correoInput"
            type="text"
            name="email"
            id="email"
            :class="inputClass"
            :placeholder="placehorderCorreo"
          />
        </div>

        <div :class="aContainer">
          <div :class="inputContainer">
            <p :class="pClass">{{ contraseña }}</p>
            <input
              v-model="contraseñaInput"
              type="password"
              name="password"
              id="password"
              :class="inputClass"
              :placeholder="placehorderContraseña"
            />
          </div>
          <a :class="footerClass" href="#">{{ footer }}</a>
        </div>
      </div>
    </div>

    <button type="button" :class="buttonClass" @click="handleLogin">
      {{ button }}
    </button>
  </div>
</template>
