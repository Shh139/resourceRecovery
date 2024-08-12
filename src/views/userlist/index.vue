<template>
  <el-form size="default">
    <el-card shadow="never">
      <site-form ref="siteMess" />
      <el-row>
        <el-col :span="4">
          <el-form-item :label="t('content.selectType')">
            <el-select
              v-model="topflag"
              :placeholder="t('content.select')"
              filterable
            >
              <el-option :value="-1" :label="t('content.lodgingType1')">{{
                t("content.lodgingType1")
              }}</el-option>
              <el-option :value="10" :label="t('table.topflag1')">{{
                t("table.topflag1")
              }}</el-option>
              <el-option :value="20" :label="t('table.topflag2')">{{
                t("table.topflag2")
              }}</el-option>
              <el-option :value="30" :label="t('table.topflag3')">{{
                t("table.topflag3")
              }}</el-option>
              <el-option :value="40" :label="t('table.topflag4')">{{
                t("table.topflag4")
              }}</el-option>
              <el-option :value="50" :label="t('table.topflag5')">{{
                t("table.topflag5")
              }}</el-option>
              <el-option :value="60" :label="t('table.topflag6')">{{
                t("table.topflag6")
              }}</el-option>
              <el-option :value="70" :label="t('table.topflag7')">{{
                t("table.topflag7")
              }}</el-option>
              <el-option :value="100" :label="t('table.topflag8')">{{
                t("table.topflag8")
              }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="t('content.selectType')">
            <el-select
              v-model="status"
              :placeholder="t('content.select')"
              filterable
            >
              <el-option :value="0" :label="t('content.userMess1')">{{
                t("content.userMess1")
              }}</el-option>
              <el-option :value="2" :label="t('content.userMess2')">{{
                t("content.userMess2")
              }}</el-option>
              <el-option :value="3" :label="t('content.userMess3')">{{
                t("content.userMess3")
              }}</el-option>
              <el-option :value="4" :label="t('content.userMess4')">{{
                t("content.userMess4")
              }}</el-option>
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
        <el-col :span="7">
          <el-form-item :label="t('content.housingCondition')">
            <el-select v-model="cease">
              <el-option :value="-1" :label="t('content.lodgingType1')">{{
                t("content.lodgingType1")
              }}</el-option>
              <el-option :value="0" :label="t('content.lodgingType3')">{{
                t("content.lodgingType3")
              }}</el-option>
              <el-option :value="1" :label="t('content.lodgingType2')">{{
                t("content.lodgingType2")
              }}</el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item :label="t('content.code')">
            <el-select v-model="qrcodeType">
              <el-option :value="0" :label="t('content.codeType5')" />
              <el-option :value="1" :label="t('content.codeType1')" />
              <el-option :value="2" :label="t('content.codeType2')" />
              <el-option :value="3" :label="t('content.codeType3')" />
              <el-option :value="4" :label="t('content.codeType4')" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" :icon="Search" @click="getUserList">{{
            t("buttons.pureSearch")
          }}</el-button>
          <el-button type="primary" :icon="CirclePlus" @click="handleAdd">{{
            t("buttons.pureAppend")
          }}</el-button>
          <!-- <el-button :icon="Position">{{ t("buttons.pureDerive") }}</el-button> -->
        </el-col>
        <el-col :span="4" :offset="0.5"
          >{{ t("buttons.pureTotal") }}：{{ count }}
          {{ t("buttons.pureTotal2") }}</el-col
        >
      </el-row>
      <el-row style="height: 361px">
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
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import siteForm from "@/components/siteForm/index.vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import {
  getUserListMess,
  addUserInfo,
  deleteUser,
  updateUserInfo
} from "@/api/user";
import { message } from "@/utils/message";
import forms, { type FormProps } from "@/views/components/dialog/form.vue";
import vewMess from "@/views/components/dialog/viewMess.vue";
import redactMess from "@/views/components/dialog/redact.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
const columns: Column<any>[] = [
  {
    dataKey: "fullname",
    key: "fullname",
    title: t("table.fullname"),
    width: 150
  },
  { dataKey: "tel", key: "tel", title: t("table.tel"), width: 150 },
  {
    dataKey: "topflag",
    key: "topflag",
    title: t("table.topflag"),
    width: 150
  },
  {
    dataKey: "areaInfo",
    key: "areaInfo",
    title: t("table.areaInfo"),
    width: 150
  },
  {
    dataKey: "address",
    key: "address",
    title: t("table.address"),
    width: 150
  },
  {
    dataKey: "ifresident",
    key: "ifresident",
    title: t("table.ifresident"),
    width: 150
  },
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("table.puttime"),
    width: 150
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 230,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => viewUser(data)
          },
          { default: () => t("table.check") }
        ),
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
const dataTab = ref([]);
const siteMess = ref(null);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Userlist"
});

var qrcodeType = ref(0);
var cease = ref(0);
var topflag = ref(-1);
var status = ref(0);
var ifresident = ref(-1);
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
  const form = siteMess.value.getSite();
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    ifresident: cease.value === -1 ? "" : cease.value, // 是否常住
    ifRenter: "", // 是否租户
    dangid: -1, // 身份信息
    topflag: topflag.value, // 角色
    status: status.value, // 搜索类型
    queryMsg: queryMsg.value, // 所填写的关键字
    provinceid: form.provinceId, // 省级
    cityid: form.cityId, // 市级
    areaid: form.areaId, // 县
    streetid: form.streetId, // 街道
    estateid: form.estateId, // 区
    villageid: form.villageId, // 村
    exportQrType: qrcodeType.value // 导出二维码
  };
  console.log(qrcodeType.value);
  getUserListMess(data).then(res => {
    if (
      (res as { status: number; data: any; count: number }).status === 10001000
    ) {
      dataTab.value = dataFormat((res as { status: number; data: any }).data);
      count.value = (res as { count: number }).count;
      message(t("message.success"), { type: "success" });
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

function dataFormat(data: any) {
  let list = [];
  for (let item of data) {
    let obj = item;
    obj.ifresident = item.ifresident == false ? "不常住" : "常住";
    obj.topflag = queryRole(item.topflag);
    list.push(obj);
  }
  return list;
}

function queryRole(data) {
  let roleList = [
    {
      id: 10,
      label: "超级管理员"
    },
    {
      id: 20,
      label: "省级管理员"
    },
    {
      id: 30,
      label: "市级管理员"
    },
    {
      id: 40,
      label: "区县管理员"
    },
    {
      id: 50,
      label: "街道管理员"
    },
    {
      id: 60,
      label: "村管理员"
    },
    {
      id: 70,
      label: "自然村管理员"
    },
    {
      id: 100,
      label: "村民"
    }
  ];
  for (let item of roleList) {
    if (item.id == data) {
      return item.label;
      break;
    }
  }
}
const formThreeInline = ref({
  user: "",
  region: "",
  tel: "",
  yfCardNo: "",
  yfCardNoSec: "",
  jfCardNo: "",
  jfCardNoSec: "",
  qtCardNo: "",
  qtCardNoSec: "",
  pwd: "",
  rePwd: "",
  company: "",
  fullname: "",
  sex: "男",
  uCode: "",
  dangId: 0,
  ifresident: 0,
  iscleaner: 0,
  build: 0,
  unit: 0,
  address: "",
  userType: 1,
  cadre: "",
  cadreTel: "",
  party: "",
  partyTel: "",
  officeName: "",
  officeUserName: "",
  officeType: 1,
  population: 0,
  imgpath: ""
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

/** 添加用户 */
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
        addUserInfo({
          ...mess,
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
}

/** 查看信息 */
function viewUser(data) {
  const resetFormThreeInline = cloneDeep(data.rowData);
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.viewMess")),
    contentRenderer: () =>
      createVNode(vewMess, {
        formInline: data.rowData
      }),
    closeCallBack: ({ options, args }) => {
      formThreeInline.value = cloneDeep(resetFormThreeInline);
    }
  });
}

/** 用户编辑 redactMess */
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
      createVNode(redactMess, {
        formInline: data.rowData
      }),
    closeCallBack: ({ options, args }) => {
      const { formInline } = options.props as FormProps;
      const form = siteMess.value.getSite();
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        updateUserInfo({
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
}

/** 用户删除 */
function handleDelete(data) {
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.deleteMsg")),
    closeCallBack: ({ options, args }) => {
      const form = siteMess.value.getSite();
      if (args?.command === "sure") {
        deleteUser({ id: data.rowData.id }).then(res => {
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
