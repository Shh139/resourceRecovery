import { $t } from "@/plugins/i18n";

export default {
  path: "/aiRecognition",
  redirect: "/aiRecognition/index",
  meta: {
    icon: "ep:cpu",
    title: $t("menus.aiRecognition"),
    rank: 10
  },
  children: [
    {
      path: "/aiRecognition/recognitionResultList",
      name: "RecognitionResultList",
      component: () =>
        import("@/views/aiRecognition/recognitionResultList.vue"),
      meta: {
        title: $t("menus.recognitionResultList"),
        showParent: true
      }
    }
  ]
};

// {
//   path: "/aiRecognition/index",
//   name: "AIRecognition",
//   component: () => import("@/views/aiRecognition/index.vue"),
//   meta: {
//     title: $t("menus.garbageIdentificationList"),
//     showParent: true
//   }
// },
