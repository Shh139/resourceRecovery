<!-- 回收订单 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <site-form ref="siteMess" />
      <el-row>
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
          <el-col :span="4">
            <el-form-item :label="t('table.collectName')">
              <el-input
                v-model="caijiUserName"
                :placeholder="t('table.collectName2')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="t('form.examineType')">
              <el-select v-model="auditType">
                <el-option :value="0" :label="t('content.lodgingType1')" />
                <el-option :value="1" :label="t('content.examine1')" />
                <el-option :value="2" :label="t('content.examine2')" />
                <el-option :value="3" :label="t('content.examine3')" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-button type="primary" :icon="Search" @click="getUserList">{{
              t("buttons.pureSearch")
            }}</el-button>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <div class="reclamationType">
          <div class="head">
            <div>类型</div>
            <div>重量</div>
            <div>金额</div>
          </div>
          <div v-for="item of typeList" :key="item.rubbishName">
            <template v-if="item.rubbishName">
              <div>{{ item.rubbishName }}</div>
              <div>{{ item.weight }}kg</div>
              <div>${{ item.money }}</div>
            </template>
          </div>
        </div>
      </el-row>
      <el-row style="height: 361px">
        <el-auto-resizer>
          <template #default="{ height, width }">
            <el-table-v2
              :columns="columns"
              :data="dataTab"
              :width="width"
              :height="height"
              :estimated-row-height="100"
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
  getPoisonousOrderDail,
  selectTotalWeight
} from "@/api/resourceOperation";
import { message } from "@/utils/message";
import forms, { type FormProps } from "@/views/components/dialog/form.vue";
import orderForm from "./dialog/orderForm.vue";
import vewMess from "@/views/components/dialog/viewMess.vue";
import { cloneDeep, debounce } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
defineOptions({
  name: "RecallOrder"
});
const columns: Column<any>[] = [
  {
    dataKey: "orderid",
    key: "orderid",
    title: t("table.orderForGoods1"),
    width: 150
  },
  {
    dataKey: "username",
    key: "username",
    title: t("table.orderForGoods2"),
    width: 150
  },
  {
    dataKey: "userteleno",
    key: "userteleno",
    title: t("table.orderForGoods3"),
    width: 150
  },
  {
    dataKey: "productname",
    key: "productname",
    title: t("table.orderForGoods4"),
    width: 150
  },
  {
    dataKey: "addusername",
    key: "addusername",
    title: t("table.orderForGoods5"),
    width: 150
  },
  {
    dataKey: "weight",
    key: "weight",
    title: t("table.orderForGoods6"),
    width: 80
  },
  {
    dataKey: "pointStr",
    key: "pointStr",
    title: t("table.orderForGoods7"),
    width: 80
  },
  {
    dataKey: "money",
    key: "money",
    title: t("table.orderForGoods8"),
    width: 80
  },
  {
    dataKey: "auditType",
    key: "auditType",
    title: t("table.orderForGoods9"),
    width: 120,
    cellRenderer: ({ cellData: auditType }) =>
      h(
        "div",
        auditType == 1
          ? t("content.examine1")
          : auditType == 2
            ? t("content.examine2")
            : t("content.examine3")
      )
  },
  {
    dataKey: "imgpath",
    key: "imgpath",
    title: t("table.orderForGoods10"),
    width: 150,
    cellRenderer: ({ cellData: imgpath }) =>
      h("img", { src: imgpath, alt: t("form.image") })
  },
  {
    dataKey: "createtime",
    key: "createtime",
    title: t("table.orderForGoods11"),
    width: 150
  }
];
// {
//   dataKey: "operation",
//   key: "operation",
//   title: t("table.operation"),
//   width: 150,
//   cellRenderer: data => {
//     return h("div", null, [
//       h(
//         ElButton,
//         {
//           type: "primary",
//           size: "small",
//           onClick: () => viewUser(data)
//         },
//         { default: () => t("table.check") }
//       )
//     ]);
//   }
// }
const dataTab = ref([]);
const siteMess = ref(null);
const typeList = ref([]);
const grossAmount = reactive({
  allMoney: 0,
  allWeight: 0,
  allPoint: 0
});

var caijiUserName = ref("");
var qrcodeType = ref(0);
var count = ref(0);
var timeDate = ref("");
var auditType = ref(0);
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
    caijiUserName: caijiUserName.value,
    auditType: auditType.value,
    provinceid: form.provinceId, // 省级
    cityid: form.cityId, // 市级
    areaid: form.areaId, // 县
    streetid: form.streetId, // 街道
    estateid: form.estateId, // 区
    villageid: form.villageId, // 村
    exportQrType: qrcodeType.value // 导出二维码
  };
  getPoisonousOrderDail(data).then(res => {
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

  selectTotalWeight(data).then(eve => {
    if (eve.status === 10001000) {
      let list = [];
      for (let item of eve.data.rubbishNameTotalDtos) {
        if (item.rubbishName) {
          list.push(item);
        }
      }
      typeList.value = list;
      grossAmount.allMoney = eve.data.allMoney;
      grossAmount.allWeight = eve.data.allWeight;
      grossAmount.allPoint = eve.data.allPoint;
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

const formThreeInline = ref({
  user: ""
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

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
      createVNode(orderForm, {
        formInline: data.rowData
      }),
    closeCallBack: ({ options, args }) => {
      formThreeInline.value = cloneDeep(resetFormThreeInline);
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
.reclamationType {
  display: flex;
  font-size: 14px;
  max-width: 100%;
  overflow: auto;

  > .head {
    color: rgb(96, 98, 102);
    background-color: rgb(245, 247, 250);
    font-weight: 600;
    > div {
      padding: 8px 16px;
      border-bottom: 0.8px solid rgb(235, 238, 245);
    }
  }
  > div {
    min-width: 100px;
    > div {
      width: auto;
      padding: 8px 16px;
      border-bottom: 0.8px solid rgb(235, 238, 245);
      text-align: left;
    }
  }
}
</style>
