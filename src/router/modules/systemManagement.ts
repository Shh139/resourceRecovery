import { $t } from "@/plugins/i18n";

export default {
  path: "/systemManagement",
  redirect: "/systemManagement/index",
  meta: {
    icon: "ep:setting",
    title: $t("menus.systemManagement"),
    rank: 20
  },
  children: [
    {
      path: "/systemManagement/index",
      name: "SystemManagement",
      component: () => import("@/views/systemManagement/index.vue"),
      meta: {
        title: $t("menus.addressManagement"),
        showParent: true
      }
    },
    {
      path: "/systemManagement/changePassword",
      name: "ChangePassword",
      component: () => import("@/views/systemManagement/changePassword.vue"),
      meta: {
        title: $t("buttons.changePassword"),
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
