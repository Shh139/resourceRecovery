<!-- 回收类型管理 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <el-row>
        <el-col :span="4">
          <el-form-item :label="t('content.selectType')">
            <el-select
              v-model="topflag"
              :placeholder="t('content.select')"
              filterable
            >
              <el-option :value="-1" :label="t('form.itemName')" />
              <el-option :value="10" :label="t('content.userMess4')" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="queryMsg"
            style="width: 100%"
            :placeholder="t('content.inputMess')"
          />
        </el-col>
        <el-col :span="5">
          <el-button type="primary" :icon="Search" @click="getUserList">{{
            t("buttons.pureSearch")
          }}</el-button>
          <el-button type="primary" :icon="CirclePlus" @click="handleAdd">{{
            t("buttons.pureAppend")
          }}</el-button>
        </el-col>
      </el-row>
      <el-row style="height: 480px">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2
              :columns="columns"
              :data="dataTab"
              :width="width"
              :height="height"
              :estimated-row-height="120"
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
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import {
  getHuiPrdYCList,
  addHuiPrd2,
  delHuiPrdYC,
  updateHuiPrdYC
} from "@/api/resourceOperation";
import { message } from "@/utils/message";
import reclamationType from "./dialog/reclamationType.vue";
import editReclamationType from "./dialog/editReclamationType.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();

const dataTab = ref([]);
const siteMess = ref(null);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "ReclamationType"
});

const columns: Column<any>[] = [
  {
    dataKey: "title",
    key: "title",
    title: t("table.name2"),
    width: 150
  },
  { dataKey: "tel", key: "tel", title: t("table.tel"), width: 150 },
  {
    dataKey: "price",
    key: "price",
    title: t("table.price"),
    width: 150
  },
  {
    dataKey: "units",
    key: "units",
    title: t("form.officeType3"),
    width: 150
  },
  {
    dataKey: "iconImg",
    key: "iconImg",
    title: t("form.image"),
    width: 150,
    cellRenderer: ({ cellData: iconImg }) =>
      h("img", { src: iconImg, alt: t("form.image") })
  },
  {
    dataKey: "fullname",
    key: "fullname",
    title: t("table.shopName"),
    width: 150
  },
  {
    dataKey: "address",
    key: "address",
    title: t("content.userMess4"),
    width: 150
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("table.regionTable3"),
    width: 150
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
          { default: () => t("table.amend") }
        ),
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

var topflag = ref(-1);
var status = ref(0);
var count = ref(0);
var queryMsg = ref("");
var table = reactive({
  pageNum: 1,
  pageSize: 15
});

onMounted(() => {
  nextTick(() => {
    getUserList();
  });
});

function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getUserList();
}

function getUserList() {
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    status: status.value, // 搜索类型
    queryMsg: queryMsg.value // 所填写的关键字
  };
  getHuiPrdYCList(data).then(res => {
    if (res.status === 10001000) {
      dataTab.value = (res as { status: number; data: any }).data;
      count.value = (res as { count: number }).count;
      message(t("message.success"), { type: "success" });
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

const formThreeInline = ref({
  recyType: 1,
  title: "",
  price: 0,
  units: "",
  keyWords: "",
  macfiflter: "",
  caijiUserId: 0,
  iconImgSrc: ""
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

/** 添加回收类型 */
function handleAdd() {
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.addMess")),
    contentRenderer: () =>
      createVNode(reclamationType, {
        formInline: formThreeInline.value
      }),
    closeCallBack: ({ options, args }) => {
      let mess = formThreeInline.value;
      console.log(mess);
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        addHuiPrd2(mess).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
          }
          getUserList();
          // 重置表单数据
          formThreeInline.value = cloneDeep(resetFormThreeInline);
        });
      } else {
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      }
    }
  });
}

/** 用户编辑 redactMess */
function handleEdit(data) {
  const resetFormThreeInline = cloneDeep(data.rowData);
  const formThreeInline = data.rowData;
  formThreeInline.iconImgSrc = data.rowData.iconImg;
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.editMess")),
    contentRenderer: () =>
      createVNode(editReclamationType, {
        formInline: data.rowData
      }),
    closeCallBack: ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        updateHuiPrdYC({
          recyType: 1,
          id: formThreeInline.id,
          title: formThreeInline.title,
          price: formThreeInline.price,
          units: formThreeInline.units,
          iconImg: formThreeInline.iconImgSrc,
          fullname: formThreeInline.fullname
        }).then(res => {
          console.log(res);
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
          }
          getUserList();
          // 重置表单数据
          formThreeInline.value = cloneDeep(resetFormThreeInline);
        });
      } else {
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      }
    }
  });
}

/** 用户删除 */
function handleDelete(data) {
  console.log(data);
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.deleteMsg2")),
    closeCallBack: ({ options, args }) => {
      if (args?.command === "sure") {
        delHuiPrdYC({ id: data.rowData.id }).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
            getUserList();
          } else {
            message(`${(res as { msg: string }).msg}`);
          }
        });
      }
    }
  });
}

// columns.value = generateColumns(10);
// console.log(columns.value);
// dataTab.value = generateData(columns, 200);
// console.log(dataTab);
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
