<template>
  <!-- 用户积分查询 -->
  <el-card shadow="never">
    <el-alert
      :title="t('title.ViewIntegral')"
      type="warning"
      show-icon
      style="margin-bottom: 10px"
    />
    <site-form ref="siteMess" />
    <el-row>
      <el-col :span="4">
        <el-form-item :label="t('form.fjiaMess')">
          <el-select
            v-model="status"
            :placeholder="t('content.select')"
            filterable
          >
            <el-option :value="0" :label="t('content.userMess1')">{{
              t("form.own")
            }}</el-option>
            <el-option :value="1" :label="t('table.name')">{{
              t("table.name")
            }}</el-option>
            <el-option :value="2" :label="t('content.userMess2')">{{
              t("content.userMess2")
            }}</el-option>
            <el-option :value="3" :label="t('form.IDhao')">{{
              t("form.IDhao")
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
      <el-col :span="3">
        <el-form-item :label="t('table.topflag')">
          <el-select
            v-model="identityMessage"
            :placeholder="t('content.select')"
            filterable
          >
            <el-option :value="-1" :label="t('content.lodgingType1')" />
            <el-option :value="1" :label="t('form.dangType1')" />
            <el-option :value="2" :label="t('form.dangType2')" />
            <el-option :value="3" :label="t('form.dangType3')" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          t("buttons.pureSearch")
        }}</el-button>
      </el-col>
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
</template>

<script setup lang="ts">
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import siteForm from "@/components/siteForm/index.vue";
import { ref, reactive, onMounted, nextTick, h, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import { pointUserList } from "@/api/points";
import { message } from "@/utils/message";
import { ElButton } from "element-plus";
import interModification from "@/views/components/dialog/integralModification.vue";
import { cloneDeep } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "userIntegral"
});
const status = ref(0);
const queryMsg = ref("");
const identityMessage = ref(-1);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});
const siteMess = ref(null);
const dataTab = ref([]);
const count = ref(0);

const columns: Column<any>[] = [
  {
    dataKey: "address",
    key: "address",
    title: t("table.userCredit1"),
    width: 200
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.userCredit2"),
    width: 200
  },
  {
    dataKey: "partyId",
    key: "partyId",
    title: t("table.userCredit3"),
    width: 200
  },
  {
    dataKey: "perishablePoint",
    key: "perishablePoint",
    title: t("table.userCredit4"),
    width: 200
  },
  {
    dataKey: "recyclablePoint",
    key: "recyclablePoint",
    title: t("table.userCredit5"),
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
            type: "primary",
            size: "small",
            onClick: () => handleEdit(data)
          },
          { default: () => t("table.amend") }
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

/** 获取数据 */
function getUserList() {
  const form = siteMess.value.getSite();
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    status: status.value,
    queryMsg: queryMsg.value,
    identityMessage: identityMessage.value,
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  pointUserList(data).then(res => {
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
/** 获取相应页面信息 */
function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getUserList();
}

const formThreeInline = ref({
  classname: "",
  tel: "",
  pwd: "",
  exchangecount: "",
  pointType: 0,
  point: "",
  updateMessage: "",
  uuid: ""
});
/** 修改积分 */
function handleEdit(data) {
  let obj = {
    classname: data.rowData.fullName,
    tel: data.rowData.tel,
    pwd: data.rowData.perishablePoint,
    exchangecount: data.rowData.recyclablePoint,
    pointType: 0,
    point: 0,
    updateMessage: "",
    uuid: data.rowData.uuid
  };
  const resetFormThreeInline = cloneDeep(obj);
  const formThreeInline = obj;
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.editMess")),
    contentRenderer: () =>
      createVNode(interModification, {
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
