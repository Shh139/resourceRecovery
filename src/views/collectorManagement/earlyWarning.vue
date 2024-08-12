<template>
  <!-- 未收集预警 -->
  <el-form size="default">
    <el-card shadow="never">
      <site-form ref="siteMess" />
      <el-row>
        <el-col :span="7">
          <el-form-item :label="t('form.selectDate')">
            <el-date-picker
              v-model="timeDate"
              type="datetimerange"
              start-placeholder="Start date"
              end-placeholder="End date"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD ddd"
              time-format="A hh:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" :icon="Search" @click="getUserList">{{
            t("buttons.pureSearch")
          }}</el-button>
          <!-- <el-button :icon="Position">{{ t("buttons.pureDerive") }}</el-button> -->
        </el-col>
      </el-row>
      <el-row style="height: 400px">
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
import siteForm from "@/components/siteForm/index.vue";
import { ElButton } from "element-plus";
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import {
  staffList,
  editCollectionUser,
  updateCollectionUser,
  deleteCollectionUser,
  addCollectionUser
} from "@/api/staff";
import { message } from "@/utils/message";
import CollectorEdit, {
  type FormProps
} from "@/views/components/dialog/collector.vue";
import forms from "@/views/components/dialog/collectorAdd.vue";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
interface FormMess {
  username: string;
  tel: string;
  pwd: string;
  pass: string;
  fullname: string;
  sex: string;
  ucode: string;
  address: string;
  isDiscern: string;
}
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "EarlyWarning"
});
const timeDate = ref("");
const count = ref(100);
const dataTab = ref([]);
const siteMess = ref(null);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});

onMounted(() => {
  nextTick(() => {
    getUserList();
  });
});

const columns: Column<any>[] = [
  {
    dataKey: "userName",
    key: "userName",
    title: t("table.userName"),
    width: 140
  },
  { dataKey: "tel", key: "tel", title: t("table.tel"), width: 150 },
  {
    dataKey: "street",
    key: "street",
    title: t("table.townStreet"),
    width: 160
  },
  {
    dataKey: "village",
    key: "village",
    title: t("table.subordinate"),
    width: 150
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.name"),
    width: 150
  },
  {
    dataKey: "tel",
    key: "tel",
    title: t("form.tel"),
    width: 150
  },
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("table.addDate"),
    width: 150
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

/** 获取收集员列表 */
function getUserList() {
  const form = siteMess.value.getSite();
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    dangid: -1, // 身份信息
    provinceid: form.provinceId, // 省级
    cityid: form.cityId, // 市级
    areaid: form.areaId, // 县
    streetid: form.streetId, // 街道
    estateid: form.estateId, // 区
    villageid: form.villageId // 村
  };
  staffList(data).then(res => {
    console.log(res);
    if (
      (res as { status: number; data: any; count: number }).status === 10001000
    ) {
      dataTab.value = (res as { status: number; data: any }).data;
      count.value = (res as { count: number }).count;
      message(t("message.success"), { type: "success" });
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

var formThreeInline = ref({
  username: "",
  tel: "",
  pwd: "",
  pass: "",
  fullname: "",
  sex: "",
  ucode: "",
  address: "",
  isDiscern: ""
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

/** 添加收集员信息 */
function handleAdd() {
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.addUser")),
    contentRenderer: () =>
      createVNode(forms, {
        formInline: formThreeInline.value
      }),
    closeCallBack: ({ options, args }) => {
      const form = siteMess.value.getSite();
      let mess = formThreeInline.value;
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        addCollectionUser({
          ...mess,
          provinceid: form.provinceId,
          cityid: form.cityId,
          areaid: form.areaId,
          streetid: form.streetId,
          estateid: form.estateId,
          villageid: form.villageId
        }).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
          } else {
            message(t("message.successfulOperation"), { type: "success" });
          }
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

/** 编辑信息 */
function handleEdit(data) {
  editCollectionUser({ id: data.rowData.id }).then(res => {
    let data = (res as { data: object }).data;
    const resetFormThreeInline = cloneDeep(
      (data as { caijiuser: object }).caijiuser
    );
    let mess = (data as { caijiuser: object }).caijiuser;
    let form = {
      username: (mess as FormMess).username,
      tel: (mess as FormMess).tel,
      pwd: (mess as FormMess).pwd,
      pass: (mess as FormMess).pass,
      fullname: (mess as FormMess).fullname,
      sex: (mess as FormMess).sex,
      ucode: (mess as FormMess).ucode,
      address: (mess as FormMess).address,
      isDiscern: (mess as FormMess).isDiscern
    };
    // formThreeInline.value = (data as { caijiuser: object }).caijiuser;
    formThreeInline.value = form;
    addDialog({
      title: "可拖拽",
      height: "500px",
      draggable: false,
      headerRenderer: ({ close, titleId, titleClass }) =>
        h("div", t("title.editMess")),
      contentRenderer: () =>
        createVNode(CollectorEdit, {
          formInline: (data as { caijiuser: object }).caijiuser
        }),
      closeCallBack: ({ options, args }) => {
        const { formInline } = options.props as FormProps;
        const form = siteMess.value.getSite();
        if (args?.command === "cancel") {
          // 您点击了取消按钮
          // 重置表单数据
          formThreeInline.value = cloneDeep(resetFormThreeInline);
        } else if (args?.command === "sure") {
          updateCollectionUser({
            ...formThreeInline,
            provinceid: form.provinceId,
            cityid: form.cityId,
            areaid: form.areaId,
            streetid: form.streetId,
            estateid: form.estateId,
            villageid: form.villageId
          }).then(res => {
            console.log(res);
            if ((res as { status: number }).status !== 10001000) {
              message(`${(res as { msg: string }).msg}`);
            }
            // 重置表单数据
            formThreeInline.value = cloneDeep(resetFormThreeInline);
          });
        } else {
          // 重置表单数据
          formThreeInline.value = cloneDeep(resetFormThreeInline);
        }
      }
    });
  });
}

/** 删除信息 */
function handleDelete(data) {
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.deleteMsg")),
    closeCallBack: ({ options, args }) => {
      const { formInline } = options.props as FormProps;
      const form = siteMess.value.getSite();
      if (args?.command === "sure") {
        deleteCollectionUser({ id: data.rowData.id }).then(res => {
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

/** 获取相应页面信息 */
function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getUserList();
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
