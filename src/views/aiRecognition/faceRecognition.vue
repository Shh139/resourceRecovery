<template>
  <!-- 人脸识别注册列表  -->
  <el-card shadow="never">
    <site-form ref="siteMess" />
    <el-row>
      <el-col :span="5">
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          t("buttons.pureSearch")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row style="height: 430px">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="dataTab"
            :width="width"
            :height="height"
            fixed
          />
        </template>
      </el-auto-resizer>
    </el-row>
    <el-row>
      <el-pagination
        size="small"
        background
        layout="prev, pager, next"
        :total="count"
        class="mt-4"
        @change="changeFun"
      />
    </el-row>
  </el-card>
</template>
<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import siteForm from "@/components/siteForm/index.vue";
import { ref, reactive, onMounted, nextTick, h } from "vue";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import { userFaceList, deleteUserFace } from "@/api/ai";
import { message } from "@/utils/message";
import { ElButton } from "element-plus";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
const siteMess = ref(null);
const count = ref(0);
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "FaceRecognition"
});
var table = reactive({
  pageNum: 1,
  pageSize: 15
});
const dataTab = ref([]);

const columns: Column<any>[] = [
  {
    dataKey: "village",
    key: "village",
    title: t("table.regionTable1"),
    width: 130
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.name"),
    width: 140
  },
  {
    dataKey: "address",
    key: "address",
    title: t("table.userCredit1"),
    width: 160
  },
  {
    dataKey: "tel",
    key: "tel",
    title: t("form.tel"),
    width: 140
  },
  {
    dataKey: "imgPath",
    key: "imgPath",
    title: t("table.ruleImage"),
    width: 200,
    cellRenderer: ({ cellData: imgpath }) =>
      h("img", {
        src: imgpath,
        alt: t("table.realTimePicture"),
        style: { height: "100px" }
      })
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("table.regionTable3"),
    width: 200
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 150,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => handleDelete(data)
          },
          { default: () => t("table.delete") }
        )
      ]);
    }
  }
];

onMounted(() => {
  nextTick(() => {
    getUserList();
  });
});

/** 获取相应页面信息 */
function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getUserList();
}

function getUserList() {
  const form = siteMess.value.getSite();
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  userFaceList(data).then(res => {
    console.log(res);
    if (
      (res as { status: number; data: any; count: number }).status === 10001000
    ) {
      dataTab.value = (res as { status: number; data: any }).data;
      count.value = (res as { count: number }).count;
      message(t("message.success"), { type: "success" });
    } else {
      message((res as { msg: string }).msg, { type: "error" });
    }
  });
}

function handleDelete(data) {
  // deleteUserFace
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.deleteMsg")),
    closeCallBack: ({ options, args }) => {
      if (args?.command === "sure") {
        deleteUserFace({ id: data.rowData.id }).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
          } else {
            message(`${(res as { msg: string }).msg}`);
          }
        });
      }
    }
  });
}
</script>
<style lang="scss" scoped>
.el-col {
  margin-right: 10px;
}
::v-deep .el-form-item__label {
  color: #000 !important;
  font-weight: 300 !important;
}
::v-deep .el-row {
  width: 100%;
}
::v-deep .el-dialog__body {
  height: 500px !important;
  overflow: auto;
}
</style>
