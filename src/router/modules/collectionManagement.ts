import { $t } from "@/plugins/i18n";

export default {
  path: "/collectorManagement",
  redirect: "/collectorManagement/index",
  meta: {
    icon: "ep:message-box",
    title: $t("menus.collectorManagement"),
    rank: 3
  },
  children: [
    {
      path: "/collectorManagement/index",
      name: "CollectorManagement",
      component: () => import("@/views/collectorManagement/index.vue"),
      meta: {
        title: $t("menus.collectorEmployeeManagement"),
        showParent: true
      }
    },
    {
      path: "/collectorManagement/collectionList",
      name: "CollectionList",
      component: () => import("@/views/collectorManagement/collectionList.vue"),
      meta: {
        title: $t("menus.collectionList"),
        showParent: true
      }
    },
    {
      path: "/collectorManagement/noCollectList",
      name: "NoCollectList",
      component: () => import("@/views/collectorManagement/noCollectList.vue"),
      meta: {
        title: $t("menus.noCollectList"),
        showParent: true
      }
    }
  ]
} satisfies RouteConfigsTable;
