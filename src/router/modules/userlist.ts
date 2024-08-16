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
      path: "/userlist/corporationList",
      name: "CorporationList",
      component: () => import("@/views/userlist/corporationList.vue"),
      meta: {
        title: $t("menus.corporation"),
        showParent: true
      }
    },
    {
      path: "/userlist/collectorBinding",
      name: "CollectorBinding",
      component: () => import("@/views/userlist/collectorBinding.vue"),
      meta: {
        title: $t("menus.collectorList"),
        showLink: false,
        activePath: "query"
      }
    },
    {
      path: "/userlist/equipmentList",
      name: "EquipmentList",
      component: () => import("@/views/userlist/equipmentList.vue"),
      meta: {
        title: $t("menus.companyEquipmentList"),
        showLink: false,
        activePath: "query"
      }
    }
  ]
} satisfies RouteConfigsTable;
