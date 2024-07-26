import { $t } from "@/plugins/i18n";

export default {
  path: "/userlist",
  redirect: "/userlist/index",
  meta: {
    icon: "ep:user-filled",
    title: $t("menus.usermessage"),
    rank: 2
  },
  children: [
    {
      path: "/userlist/index",
      name: "Userlist",
      component: () => import("@/views/userlist/index.vue"),
      meta: {
        title: $t("menus.usermessage"),
        showParent: true
      }
    },
    {
      path: "/userlist/bulkImport",
      name: "BulkImport",
      component: () => import("@/views/bulkImport/index.vue"),
      meta: {
        title: $t("menus.bulkImport"),
        showParent: true
      }
    },
    {
      path: "/userlist/userProfile",
      name: "UserProfile",
      component: () => import("@/views/userProfile/index.vue"),
      meta: {
        title: $t("menus.userProfile"),
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
