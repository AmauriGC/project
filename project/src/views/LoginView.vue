<script setup lang="ts">
import Swal from "sweetalert2";
import CardLogin from "../components/login/CardLogin.vue";
import usersData from "../components/login/dataLogin/user.json";
import accountsData from "../components/login/dataLogin/account.json";
import type { User, Account } from "../components/login/dataLogin/interfaces";
import { AuthService } from "../services/auth.service";
import { useRouter } from "vue-router";


interface LoginData {
  correo: string;
  contraseña: string;
}

const users = usersData as User[];
const accounts = accountsData as Account[];

const router = useRouter();


const login = (data: LoginData) => {
  const foundUser = users.find(
    (u) => u.contactData.email === data.correo && u.contactData.password === data.contraseña
  );

  if (foundUser) {
    const account = accounts.find((a) => a.userId === foundUser.id);
    if (account) {
      AuthService.login(foundUser, account);

      Swal.fire({
        icon: "success",
        title: "Bienvenido",
        text: `Hola ${foundUser.personalData.nombre}, tu rol es: ${account.role ?? "sin rol"}.`,
      }).then(() => {
        console.log("Redirigiendo según el rol...");
        if (account.role === "admin") router.push({ name: "Admin" });
        else if (account.role === "user") router.push({ name: "User" });
        else router.push({ name: "Guest" });
      });

    } else {
      // Si no hay account
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se encontró la cuenta asociada.",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Los datos ingresados son incorrectos.",
    });
  }
};

</script>

<template>
  <div class="w-screen h-screen flex justify-center items-center bg-gray-100">
    <CardLogin
      containerClass="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center"
      headerClass="text-center mb-6"
      bodyClass="w-full"
      formClass="flex flex-col gap-6 w-full"
      inputContainer="flex flex-col w-full"
      aContainer="flex flex-col items-end w-full"
      pClass="text-sm text-gray-600 font-medium mb-1"
      inputClass="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-black"
      buttonClass="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      footerClass="text-sm text-blue-500 hover:underline"
      titleClass="text-3xl font-semibold text-gray-800"
      subtitleClass="text-lg text-gray-500"
      msgClass="text-gray-500 text-center mb-4"
      title="Bienvenido"
      subtitle="Inicia sesión para continuar"
      msg="Por favor, ingresa tus datos para acceder a tu cuenta"
      correo="Correo electrónico"
      contraseña="Contraseña"
      footer="¿Olvidaste tu contraseña?"
      button="Iniciar sesión"
      placehorderCorreo="Tu correo electrónico"
      placehorderContraseña="Tu contraseña"
      @login="login"
    />
  </div>
</template>
