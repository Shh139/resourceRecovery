import { $t } from "@/plugins/i18n";

export default {
  path: "/equipment",
  redirect: "/equipment/index",
  meta: {
    icon: "ep:set-up",
    title: $t("menus.equipmentMenus"),
    rank: 9
  },
  children: [
    {
      path: "/equipment/index",
      name: "Equipment",
      component: () => import("@/views/equipment/index.vue"),
      meta: {
        title: $t("menus.equipmentMenus"),
        showParent: false
      }
    }
  ]
} satisfies RouteConfigsTable;
