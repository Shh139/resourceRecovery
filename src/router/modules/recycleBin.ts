import { $t } from "@/plugins/i18n";

export default {
  path: "/recycleBin",
  redirect: "/recycleBin/index",
  meta: {
    icon: "ep:help-filled",
    title: $t("menus.recycleBin"),
    rank: 8
  },
  children: [
    {
      path: "/recycleBin/index",
      name: "RecycleBin",
      component: () => import("@/views/recycleBin/index.vue"),
      meta: {
        title: $t("menus.recycleBin"),
        showParent: false
      }
    }
  ]
} satisfies RouteConfigsTable;
