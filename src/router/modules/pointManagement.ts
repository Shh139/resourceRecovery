import { $t } from "@/plugins/i18n";

export default {
  path: "/pointManagement",
  redirect: "/pointManagement/index",
  meta: {
    icon: "ep:coin",
    title: $t("menus.pointManagement")
  },
  children: [
    {
      path: "/pointManagement/index",
      name: "IntegralDetail",
      component: () => import("@/views/pointManagement/index.vue"),
      meta: {
        title: $t("menus.integralDetail"),
        showParent: true
      }
    },
    {
      path: "/pointManagement/userIntegral",
      name: "userIntegral",
      component: () => import("@/views/pointManagement/userIntegral.vue"),
      meta: {
        title: $t("menus.userIntegral"),
        showParent: true
      }
    },
    {
      path: "/pointManagement/integralConversion",
      name: "integralConversion",
      component: () => import("@/views/pointManagement/integralConversion.vue"),
      meta: {
        title: $t("menus.integralConversion"),
        showParent: true
      }
    }
  ]
};

// {
//   path: "/pointManagement/bonusPointsDistribution",
//   name: "bonusPointsDistribution",
//   component: () =>
//     import("@/views/pointManagement/bonusPointsDistribution.vue"),
//   meta: {
//     title: $t("menus.bonusPointsDistribution"),
//     showParent: true
//   }
// }
// {
//   path: "/pointManagement/gardenPointManagement",
//   name: "gardenPointManagement",
//   component: () =>
//     import("@/views/pointManagement/gardenPointManagement.vue"),
//   meta: {
//     title: $t("menus.gardenPointManagement"),
//     showParent: true
//   }
// }
// {
//   path: "/pointManagement/IntegralBatchModification",
//   name: "IntegralBatchModification",
//   component: () =>
//     import("@/views/pointManagement/IntegralBatchModification.vue"),
//   meta: {
//     title: $t("menus.integralBatchModification"),
//     showParent: true
//   }
// },
