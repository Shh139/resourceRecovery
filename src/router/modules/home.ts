import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/welcome",
  meta: {
    icon: "ep:home-filled",
    title: $t("menus.pureHome"),
    rank: 0
  },
  children: [
    {
      path: "/welcome",
      name: "Welcome",
      component: () => import("@/views/welcome/index.vue"),
      meta: {
        title: $t("menus.pureHomeChild"),
        showLink: true
      }
    },
    {
      path: "/OperMon",
      name: "OperationMonitoring",
      component: () => import("@/views/welcome/operationMonitoring.vue"),
      meta: {
        title: $t("menus.resourceOperation"),
        showLink: true
      }
    },
    {
      path: "/RedAndBlackList",
      name: "RedAndBlackList",
      component: () => import("@/views/welcome/redAndBlackList.vue"),
      meta: {
        title: $t("menus.redAndBlackList"),
        showLink: true
      }
    },
    {
      path: "/map",
      name: "mapView",
      component: () => import("@/views/welcome/map.vue"),
      meta: {
        title: $t("menus.deviceReleaseMap"),
        showLink: true
      }
    }
  ]
} satisfies RouteConfigsTable;
