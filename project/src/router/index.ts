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
            path: "/admin",
            name: "Admin",
            component: () => import("../views/AdminView.vue"),
            meta: { requiresAuth: true, requiredRole: "admin" },
        },
        {
            path: "/user",
            name: "User",
            component: () => import("../views/UserView.vue"),
            meta: { requiresAuth: true, requiredRole: "user" },
        },
        {
            path: "/guest",
            name: "Guest",
            component: () => import("../views/GuestView.vue"),
            meta: { requiresAuth: true, requiredRole: "guest" },
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/login"
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = AuthService.isAuthenticated();
    const userRole = AuthService.getRole();

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("Login");
        return;
    }

    if (to.meta.requiredRole && to.meta.requiredRole !== userRole) {
        if (userRole === "admin") next("/admin");
        else if (userRole === "user") next("/user");
        else if (userRole === "guest") next("/guest");
        else next("/login");
        return;
    }

    next();
});

export default router;