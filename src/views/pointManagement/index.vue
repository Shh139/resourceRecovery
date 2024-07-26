<template>
  <!-- 积分明细汇总 -->
  <el-card shadow="never">
    <el-alert
      :title="t('title.ViewIntegral')"
      type="warning"
      show-icon
      style="margin-bottom: 10px"
    />
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
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-form-item :label="t('form.fjiaMess')">
          <el-select
            v-model="status"
            :placeholder="t('content.select')"
            filterable
          >
            <el-option :value="0" :label="t('form.own')">{{
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
import { ref, reactive, onMounted, nextTick, h } from "vue";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import { pointCount } from "@/api/points";
import { message } from "@/utils/message";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "IntegralDetail"
});
const { t } = useI18n();
const timeDate = ref("");
const status = ref(0);
const queryMsg = ref("");
const pointType = ref(-1);
const dataTab = ref([]);
const count = ref(0);
const siteMess = ref(null);

var table = reactive({
  pageNum: 1,
  pageSize: 15
});

const columns: Column<any>[] = [
  {
    dataKey: "village",
    key: "village",
    title: t("table.integralDetail1"),
    width: 300
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.integralDetail2"),
    width: 300
  },
  {
    dataKey: "address",
    key: "address",
    title: t("table.integralDetail3"),
    width: 300
  },
  {
    dataKey: "point",
    key: "point",
    title: t("table.integralDetail4"),
    width: 300
  }
];

onMounted(() => {
  nextTick(() => {
    getUserList();
  });
});

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

/** 获取今日时间 */
function getDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const da = date.getDate();
  return `${year}-${month}-${da}`;
}

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
    status: status.value,
    queryMsg: queryMsg.value,
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  pointCount(data).then(res => {
    if (
      (res as { status: number; data: any; count: number }).status === 10001000
    ) {
      dataTab.value = formatData((res as { status: number; data: any }).data);
      count.value = (res as { count: number }).count;
      message(t("message.success"), { type: "success" });
    } else {
      message((res as { msg: string }).msg, { type: "error" });
    }
  });
}

function formatData(data) {
  let dataList = [];
  for (let item of data) {
    let obj = item;
    obj.point = item.point ? item.point : 0;
    dataList.push(obj);
  }
  return dataList;
}

/** 切换页面 */
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
