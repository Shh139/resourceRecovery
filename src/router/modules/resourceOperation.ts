// 资源运营管理
import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/resourceOperation",
  redirect: "/resourceOperation/index",
  name: "resourceOperation",
  component: Layout,
  meta: {
    icon: "ep:notification",
    title: $t("menus.resourceOperation1"),
    rank: 7
  },
  children: [
    {
      path: "/resourceOperation/index",
      name: "ReclamationType",
      component: () => import("@/views/resourceOperation/index.vue"),
      meta: {
        title: $t("menus.reclamationType"),
        showParent: true
      }
    },
    {
      path: "/resourceOperation/recallOrder",
      name: "RecallOrder",
      component: () => import("@/views/resourceOperation/recallOrder.vue"),
      meta: {
        title: $t("menus.recallOrder"),
        showParent: true
      }
    }
  ]
};
