import { createRouter, createWebHistory } from "vue-router";
import { AuthService } from "../services/auth.service";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/",
      component: () => import("../layouts/AppLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        // Rutas Admin
        {
          path: "admin",
          name: "Admin",
          component: () => import("../views/AdminView.vue"),
          meta: { requiredRole: "admin" },
        },
        {
          path: "admin/users",
          name: "AdminUsers",
          component: () => import("../views/AdminView.vue"), // Cambiar por vista específica
          meta: { requiredRole: "admin" },
        },
        {
          path: "admin/settings",
          name: "AdminSettings",
          component: () => import("../views/AdminView.vue"), // Cambiar por vista específica
          meta: { requiredRole: "admin" },
        },
        {
          path: "admin/reports",
          name: "AdminReports",
          component: () => import("../views/AdminView.vue"), // Cambiar por vista específica
          meta: { requiredRole: "admin" },
        },
        // Rutas User
        {
          path: "user",
          name: "User",
          component: () => import("../views/UserView.vue"),
          meta: { requiredRole: "user" },
        },
        {
          path: "user/profile",
          name: "UserProfile",
          component: () => import("../views/UserView.vue"), // Cambiar por vista específica
          meta: { requiredRole: "user" },
        },
        {
          path: "user/data",
          name: "UserData",
          component: () => import("../views/UserView.vue"), // Cambiar por vista específica
          meta: { requiredRole: "user" },
        },
        // Rutas Guest
        {
          path: "guest",
          name: "Guest",
          component: () => import("../views/GuestView.vue"),
          meta: { requiredRole: "guest" },
        },
        {
          path: "guest/info",
          name: "GuestInfo",
          component: () => import("../views/GuestView.vue"), // Cambiar por vista específica
          meta: { requiredRole: "guest" },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = AuthService.isAuthenticated();
  const userRole = AuthService.getRole();

  // Si la ruta requiere autenticación y no está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
    return;
  }

  // Si la ruta requiere un rol específico y no coincide
  if (to.meta.requiredRole && to.meta.requiredRole !== userRole) {
    // Redirigir según el rol del usuario
    if (userRole === "admin") next("/admin");
    else if (userRole === "user") next("/user");
    else if (userRole === "guest") next("/guest");
    else next("/login");
    return;
  }

  // Si está autenticado y va a login, redirigir a su dashboard
  if (to.path === "/login" && isAuthenticated) {
    if (userRole === "admin") next("/admin");
    else if (userRole === "user") next("/user");
    else if (userRole === "guest") next("/guest");
    else next();
    return;
  }

  // Redirigir la raíz al dashboard correspondiente
  if (to.path === "/" && isAuthenticated) {
    if (userRole === "admin") next("/admin");
    else if (userRole === "user") next("/user");
    else if (userRole === "guest") next("/guest");
    else next("/login");
    return;
  }

  next();
});

export default router;
