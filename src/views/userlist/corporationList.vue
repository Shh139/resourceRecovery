<!-- 公司信息管理 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <el-row>
        <el-col :span="3">
          <el-button type="primary" :icon="CirclePlus" @click="handleAdd">{{
            t("buttons.pureAppend")
          }}</el-button>
        </el-col>
      </el-row>
      <el-row style="height: 500px">
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
  </el-form>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import {
  addCorporationUser,
  editCorporationUser,
  getCorporationUserList
} from "@/api/user";
import { useDetail } from "./hooks";
import { message } from "@/utils/message";
import forms from "./dialog/addCompany.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
let { toDetail, router } = useDetail();
const columns: Column<any>[] = [
  {
    dataKey: "corporationName",
    key: "corporationName",
    title: t("table.name2"),
    width: 200
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("form.checkInScore2"),
    width: 200
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 500,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleEdit(data)
          },
          { default: () => t("table.amend") }
        ),
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => collectorBinding(data)
          },
          { default: () => t("table.collectorBindingList") }
        ),
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => deviceBinding(data)
          },
          { default: () => t("table.deviceBindingList") }
        )
      ]);
    }
  }
];
const dataTab = ref([]);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "CorporationList"
});

var qrcodeType = ref(0);
var count = ref(0);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});

onMounted(() => {
  nextTick(() => {
    getData();
  });
});

function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getData();
}

function getData() {
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize // 每页显示数
  };
  getCorporationUserList(data).then(res => {
    if (res.status === 10001000) {
      dataTab.value = res.data;
      count.value = res.count;
      message(t("message.success"), { type: "success" });
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

const formThreeInline = ref({
  corporationName: ""
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

/** 添加信息 */
function handleAdd() {
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.addMess")),
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: ({ options, args }) => {
      let mess = formThreeInline.value;
      console.log(mess.corporationName);
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        addCorporationUser({
          ...mess
        }).then(res => {
          if (res.status !== 10001000) {
            message(`${res.msg}`);
          } else {
            message(`t("message.successfulOperation")`);
            getData();
          }
        });
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else {
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      }
    }
  });
}

/** 编辑信息 redactMess */
function handleEdit(data) {
  const resetFormThreeInline = cloneDeep(data.rowData);
  const formThreeInline = data.rowData;
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.editMess")),
    contentRenderer: () =>
      createVNode(forms, {
        formInline: data.rowData
      }),
    closeCallBack: ({ options, args }) => {
      console.log(formThreeInline);
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        editCorporationUser({
          ...formThreeInline
        }).then(res => {
          if (res.status !== 10001000) {
            message(`${res.msg}`);
          } else {
            message(t("message.successfulOperation"));
            getData();
          }
          // 重置表单数据
        });
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else {
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      }
    }
  });
}

/** 采集员绑定 */
function collectorBinding(data) {
  toDetail(data.rowData, 0);
}

/** 设备绑定列表 */
function deviceBinding(data) {
  toDetail(data.rowData, 1);
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
