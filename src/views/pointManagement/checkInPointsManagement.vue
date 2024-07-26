<template>
  <!-- 签到积分管理 -->
  <el-card shadow="never">
    <site-form ref="siteMess" />
    <el-row>
      <el-col :span="5">
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          t("buttons.pureSearch")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row style="height: 440px">
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
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import siteForm from "@/components/siteForm/index.vue";
import { ref, reactive, onMounted, nextTick, h, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import { signPoint } from "@/api/points";
import { message } from "@/utils/message";
import { ElButton } from "element-plus";
import checkInScore from "@/views/components/dialog/checkInScore.vue";
import { cloneDeep } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
const siteMess = ref(null);
const count = ref(0);
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "checkInPointsManagement"
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
    width: 200
  },
  {
    dataKey: "signPoint",
    key: "signPoint",
    title: t("table.regionTable2"),
    width: 200
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("table.regionTable3"),
    width: 200
  },
  {
    dataKey: "isActive",
    key: "isActive",
    title: t("table.regionTable4"),
    width: 200,
    cellRenderer: ({ cellData: isActive }) =>
      h("p", isActive ? t("form.checkInScore4-i") : t("form.checkInScore4-ni"))
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 200,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleEdit(data)
          },
          { default: () => t("buttons.editMess") }
        ),
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => handleOutService(data)
          },
          { default: () => t("buttons.outService") }
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
const formThreeInline = ref({
  regionName: "",
  creationTime: "",
  updateTime: "",
  checkInScore: "",
  status: 0
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
  signPoint(data).then(res => {
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

function handleEdit(data) {
  let obj = {
    regionName: data.rowData.village,
    creationTime: data.rowData.createTime,
    updateTime: data.rowData.createTime,
    checkInScore: data.rowData.signPoint,
    status: data.rowData.signPoint.isActive ? 1 : 0
  };
  const resetFormThreeInline = cloneDeep(obj);
  formThreeInline.value = obj;
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("form.orderProcessing")),
    contentRenderer: () =>
      createVNode(checkInScore, {
        formInline: obj
      }),
    closeCallBack: ({ options, args }) => {
      const form = siteMess.value.getSite();
      // if (args?.command === "cancel") {
      //   // 您点击了取消按钮
      //   // 重置表单数据
      //   formThreeInline.value = cloneDeep(resetFormThreeInline);
      // } else if (args?.command === "sure") {
      //   updateUserInfo({
      //     ...formThreeInline,
      //     provinceid: form.provinceId,
      //     cityid: form.cityId,
      //     areaid: form.areaId,
      //     streetid: form.streetId,
      //     estateid: form.estateId,
      //     villageid: form.villageId
      //   }).then(res => {
      //     console.log(res);
      //     if ((res as { status: number }).status !== 10001000) {
      //       message(`${(res as { msg: string }).msg}`);
      //     }
      //     // 重置表单数据
      //     formThreeInline.value = cloneDeep(resetFormThreeInline);
      //   });
      // } else {
      //   // 重置表单数据
      //   formThreeInline.value = cloneDeep(resetFormThreeInline);
      // }
    }
  });
}

function handleOutService(data) {
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.tip1")),
    closeCallBack: ({ options, args }) => {
      const form = siteMess.value.getSite();
      // if (args?.command === "sure") {
      //   deleteUser({ id: data.rowData.id }).then(res => {
      //     if ((res as { status: number }).status !== 10001000) {
      //       message(`${(res as { msg: string }).msg}`);
      //     } else {
      //       message(`${(res as { msg: string }).msg}`);
      //     }
      //   });
      // }
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
