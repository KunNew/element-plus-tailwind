import MainLayout from "@/layouts/MainLayout.vue";
import type { AppRouteConfig } from "@/types/types";

const HomeRoute: AppRouteConfig = {
  path: "/dashboard",
  name: "dashboard",
  component: MainLayout,
  redirect: "/dashboard",
  meta: {
    title: "Dashboard",
    icon: "ep:home-filled",
  },
  children: [
    {
      path: "/dashboard",
      name: "dashboard_page",
      component: () => import("@/pages/Home.vue"),
      meta: {
        title: "Dashboard",
        hideMenu: true,
      },
    },
  ],
};

const AdminSettingRoute: AppRouteConfig = {
  path: "/admin-setting",
  name: "admin-setting",
  component: MainLayout,
  redirect: "/admin-setting",
  meta: {
    title: "Admin-Setting",
    icon: "ri:settings-4-fill",
  },
  children: [
    {
      path: "/admin-setting",
      name: "admin_setting_page",
      component: () => import("@/pages/AdminSetting.vue"),
      meta: {
        title: "Admin-Setting",
        hideMenu: true,
      },
    },
  ],
};
const SystemRoute: AppRouteConfig = {
  path: "/system",
  name: "system",
  component: MainLayout,
  meta: {
    title: "menu.system.root",
    icon: "ri:settings-4-fill",
  },
  children: [
    {
      path: "menu",
      name: "menu",
      // component: () => import("@/"),
      meta: {
        title: "menu.system.menu",
      },
    },
  ],
};

const AdminRoutes: AppRouteConfig[] = [
  HomeRoute,
  AdminSettingRoute,
  SystemRoute,
];

export default AdminRoutes;
