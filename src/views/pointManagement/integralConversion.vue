<template>
  <!-- 积分兑换统计 -->
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
      <el-col :span="4">
        <el-form-item :label="t('form.fjiaMess')">
          <el-select
            v-model="pointType"
            :placeholder="t('content.select')"
            filterable
          >
            <el-option :value="-1" :label="t('content.lodgingType1')" />
            <el-option :value="0" :label="t('form.pointType1')" />
            <el-option :value="1" :label="t('form.pointType2')" />
            <el-option :value="2" :label="t('form.pointType3')" />
            <el-option :value="3" :label="t('form.pointType4')" />
            <el-option :value="4" :label="t('form.pointType5')" />
            <el-option :value="5" :label="t('form.pointType6')" />
            <el-option :value="6" :label="t('form.pointType7')" />
            <el-option :value="7" :label="t('form.pointType8')" />
            <el-option :value="8" :label="t('form.pointType9')" />
            <el-option :value="9" :label="t('form.pointType10')" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          t("buttons.pureSearch")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row style="height: 410px">
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
import { pointDetailList } from "@/api/points";
import { message } from "@/utils/message";
import { ElButton } from "element-plus";
import handleView from "@/views/components/dialog/handle.vue";
import { cloneDeep } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const siteMess = ref(null);
const { t } = useI18n();
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "integralConversion"
});
const timeDate = ref("");
const pointType = ref(-1);
const count = ref(0);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});
const dataTab = ref([]);

const columns: Column<any>[] = [
  {
    dataKey: "prdName",
    key: "prdName",
    title: t("table.pointExchange1"),
    width: 140
  },
  {
    dataKey: "prdNum",
    key: "prdNum",
    title: t("table.pointExchange2"),
    width: 100
  },
  {
    dataKey: "point",
    key: "point",
    title: t("table.pointExchange3"),
    width: 90
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.pointExchange4"),
    width: 140
  },
  {
    dataKey: "address",
    key: "address",
    title: t("table.pointExchange5"),
    width: 150
  },
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("table.pointExchange6"),
    width: 150
  },
  {
    dataKey: "about",
    key: "about",
    title: t("table.pointExchange7"),
    width: 200
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 140,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleViewiew(data)
          },
          { default: () => t("form.orderProcessing") }
        )
      ]);
    }
  }
];

function msToDate(msec) {
  let datetime = new Date(msec);
  let year = datetime.getFullYear();
  let month = datetime.getMonth();
  let date = datetime.getDate();
  let hour = datetime.getHours();
  let minute = datetime.getMinutes();
  let second = datetime.getSeconds();

  let result1 =
    year +
    "-" +
    (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
    "-" +
    (date + 1 < 10 ? "0" + date : date) +
    " " +
    (hour + 1 < 10 ? "0" + hour : hour) +
    ":" +
    (minute + 1 < 10 ? "0" + minute : minute) +
    ":" +
    (second + 1 < 10 ? "0" + second : second);

  let result2 =
    year +
    "-" +
    (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
    "-" +
    (date + 1 < 10 ? "0" + date : date);

  let result = {
    hasTime: result1,
    withoutTime: result2
  };

  return result;
}

function getDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const da = date.getDate();
  return `${year}-${month}-${da}`;
}

/** 获取数据 */
function getUserList() {
  let timeDate1 = timeDate.value[0];
  let timeDate2 = timeDate.value[0];
  const form = siteMess.value.getSite();
  let startTime = null;
  let endTime = null;
  if (!timeDate1) {
    startTime = getDateTime();
  } else {
    msToDate(timeDate1).withoutTime;
  }
  if (!timeDate2) {
    endTime = getDateTime();
  } else {
    msToDate(timeDate2).withoutTime;
  }
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    startTime,
    endTime,
    pointType: pointType.value,
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  pointDetailList(data).then(res => {
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
const formThreeInline = ref({
  classname: "",
  quantity: "",
  consumptionPoints: "",
  puttime: "",
  exchangecount: "",
  status: 1
});

/** 查看详情 */
function handleViewiew(data) {
  let obj = {
    classname: data.rowData.prdName,
    quantity: data.rowData.prdNum,
    consumptionPoints: data.rowData.point,
    puttime: data.rowData.puttime,
    exchangecount: "",
    status: 1
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
      createVNode(handleView, {
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
