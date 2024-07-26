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
      path: "/collectorManagement/employee",
      name: "AttendanceList",
      component: () => import("@/views/collectorManagement/employee.vue"),
      meta: {
        title: $t("menus.attendanceList"),
        showParent: true
      }
    },
    {
      path: "/collectorManagement/dataReport",
      name: "DataReport",
      component: () => import("@/views/collectorManagement/dataReport.vue"),
      meta: {
        title: $t("menus.dataReport"),
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
    }
  ]
} satisfies RouteConfigsTable;
