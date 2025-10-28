<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "../components/Sidebar.vue";
import { AuthService } from "../services/auth.service";

const router = useRouter();

// Obtener el rol del usuario
const userRole = computed(() => AuthService.getRole());

// Configuración del sidebar según el rol
const sidebarConfig = computed(() => {
  const role = userRole.value;

  const configs = {
    admin: {
      title: "Panel Admin",
      subtitle: "Administración completa",
      items: [
        { text: "Dashboard", icon: "home", route: "/admin" },
        { text: "Usuarios", icon: "users", route: "/admin/users" },
        { text: "Configuración", icon: "cog", route: "/admin/settings" },
        { text: "Reportes", icon: "chart-bar", route: "/admin/reports" },
      ],
    },
    user: {
      title: "Mi Panel",
      subtitle: "Usuario registrado",
      items: [
        { text: "Inicio", icon: "home", route: "/user" },
        { text: "Mi Perfil", icon: "user", route: "/user/profile" },
        { text: "Mis Datos", icon: "file-text", route: "/user/data" },
      ],
    },
    guest: {
      title: "Panel Invitado",
      subtitle: "Acceso limitado",
      items: [
        { text: "Inicio", icon: "home", route: "/guest" },
        { text: "Información", icon: "info-circle", route: "/guest/info" },
      ],
    },
  };

  return configs[role as keyof typeof configs] || configs.guest;
});

// Manejar selección del sidebar
const handleSidebarSelect = (item: { text: string; route?: string; id?: string | number }) => {
  if (item.route) {
    router.push(item.route);
  }
};

// Función para logout
const handleLogout = () => {
  AuthService.logout();
  router.push("/login");
};
</script>

<template>
  <div class="flex w-screen h-screen">
    <!-- Sidebar -->
    <Sidebar
      :title="sidebarConfig.title"
      :subtitle="sidebarConfig.subtitle"
      :items="sidebarConfig.items"
      title-class="text-xl font-bold text-gray-900 dark:text-white"
      subtitle-class="text-sm text-gray-500 dark:text-gray-400 mt-1"
      body-class="mt-6"
      item-class="mb-1"
      link-class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors duration-200"
      footer-class="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700"
      :show-user-footer="true"
      :user-role="userRole"
      logout-button-text="Cerrar Sesión"
      @select="handleSidebarSelect"
      @logout="handleLogout"
    />

    <!-- Contenido principal -->
    <main class="flex flex-1 overflow-auto">
      <div class="p-6">
        <!-- Aquí se renderizan las vistas hijas -->
        <RouterView />
      </div>
    </main>
  </div>
</template>
