<script setup lang="ts">
import { ref, reactive, defineProps, watch } from "vue";
import type { Column } from "element-plus";
import { useI18n } from "vue-i18n";
import { Search } from "@element-plus/icons-vue";
import { collectionUserCheckDetail } from "@/api/staff";
import { message } from "@/utils/message";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    addUserId: number;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    addUserId: 0
  })
});

watch(
  () => props.formInline,
  newData => {
    getData();
  },
  { deep: true }
);

const timeDate = ref("");
const count = ref(0);
const totalDays = ref(0);
const clockingIn = ref(0);
const absenceFromDuty = ref(0);
const dataTab = ref([]);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});
const columns: Column<any>[] = [
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("form.time"),
    width: 150
  },
  {
    dataKey: "address",
    key: "address",
    title: t("table.areaInfo"),
    width: 150
  },
  {
    dataKey: "collectName",
    key: "collectName",
    title: t("table.collectName"),
    width: 150
  },
  {
    dataKey: "goToWorkTime",
    key: "goToWorkTime",
    title: t("table.time1"),
    width: 150
  },
  {
    dataKey: "offWorkTime",
    key: "offWorkTime",
    title: t("table.time2"),
    width: 150
  },
  {
    dataKey: "operatingHours",
    key: "operatingHours",
    title: t("table.duration"),
    width: 100
  },
  {
    dataKey: "collectHouseNumber",
    key: "collectHouseNumber",
    title: t("table.collectHouseNumber"),
    width: 100
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

function daysBetweenDates(date1, date2) {
  const timeDiff = Math.abs(
    new Date(date2).getTime() - new Date(date1).getTime()
  );
  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return dayDiff + 1;
}

/** 获取今日时间 */
function getDateTime() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const da = date.getDate();
  return `${year}-${month}-${da}`;
}

function getTotalDays() {
  let timeDate1 = timeDate.value[0];
  let timeDate2 = timeDate.value[1];
  let startTime = null;
  let endTime = null;
  if (!timeDate1) {
    startTime = getDateTime();
  } else {
    startTime = msToDate(timeDate1).withoutTime;
  }
  if (!timeDate2) {
    endTime = getDateTime();
  } else {
    endTime = msToDate(timeDate2).withoutTime;
  }
  totalDays.value = daysBetweenDates(endTime, startTime);
}

function getData() {
  getTotalDays();
  let timeDate1 = timeDate.value[0];
  let timeDate2 = timeDate.value[1];
  let startTime = null;
  let endTime = null;
  if (!timeDate1) {
    startTime = getDateTime();
  } else {
    startTime = msToDate(timeDate1).withoutTime;
  }
  if (!timeDate2) {
    endTime = getDateTime();
  } else {
    endTime = msToDate(timeDate2).withoutTime;
  }
  const data = {
    pageNum: table.pageNum,
    pageSize: table.pageSize,
    startTime,
    endTime
  };
  collectionUserCheckDetail(data).then(res => {
    if (res.status === 10001000) {
      dataTab.value = res.data;
      count.value = res.count;
      clockingIn.value = res.count;
      message(t("message.success"), { type: "success" });
    } else {
      message((res as { msg: string }).msg, { type: "error" });
    }
  });
}

/** 切换页面 */
/** 获取相应页面信息 */
function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getData();
}
</script>

<template>
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
      <el-button type="primary" :icon="Search" @click="getData">{{
        t("buttons.pureSearch")
      }}</el-button>
    </el-col>
  </el-row>
  <el-row>
    {{ t("search.totalDays") }}：{{ totalDays }} {{ t("search.days") }}
    {{ t("search.clockingIn") }}：{{ clockingIn }}{{ t("search.days") }}
    {{ t("search.absenceFromDuty") }}：{{ totalDays - clockingIn
    }}{{ t("search.days") }}
  </el-row>
  <el-row style="height: 400px">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :stripe="true"
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
</template>

<style lang="scss" scoped>
.el-col {
  margin-right: 10px;
}
.label {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
::v-deep .el-form-item__label {
  color: #000 !important;
  font-weight: 300 !important;
}
::v-deep .el-row {
  width: 100%;
  margin-bottom: 10px;
}
::v-deep .el-input {
  width: 90% !important;
}
::v-deep .el-dialog__body {
  height: 500px !important;
  overflow: auto;
}
</style>
