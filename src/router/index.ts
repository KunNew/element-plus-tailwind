import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import AdminRoutes from "./modules/admin";
import { AppRouteConfig } from "@/types/types";

const LoginRoute: AppRouteConfig = {
  path: "/",
  name: "Login",
  component: () => import("@/layouts/PublicLayout.vue"),
  meta: {
    title: "Login",
    requiresAuth: false,
  },
  children: [
    {
      path: "/login",
      name: "login_page",
      component: () => import("@/pages/Login.vue"),
      meta: {
        title: "Login",
        hideMenu: true,
      },
    },
  ],
};


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    LoginRoute,
    ...AdminRoutes,
  ] as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
