<template>
  <!-- 考勤列表 -->
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
      <el-col :span="5">
        <el-form-item :label="t('form.cjytel')">
          <el-input
            v-model="collectUserTel"
            style="width: 100%"
            :placeholder="t('form.cjytel')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item :label="t('form.cjyName')">
          <el-input
            v-model="collectUserName"
            style="width: 100%"
            :placeholder="t('form.cjyName')"
          />
        </el-form-item>
      </el-col>
      <el-col :span="7">
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          t("buttons.pureSearch")
        }}</el-button>
        <el-button :icon="Position">{{ t("buttons.pureDerive") }}</el-button>
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
import siteForm from "@/components/siteForm/index.vue";
import { Search, CirclePlus, Position } from "@element-plus/icons-vue";
import type { Column } from "element-plus";
import { useI18n } from "vue-i18n";
import { ref, reactive, onMounted, nextTick } from "vue";
import { checkList } from "@/api/staff";
import { message } from "@/utils/message";
const { t } = useI18n();
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "AttendanceList"
});
const timeDate = ref("");
const collectUserTel = ref("");
const collectUserName = ref("");
const count = ref(0);
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
    dataKey: "puttime",
    key: "puttime",
    title: t("table.puttime2"),
    width: 140
  },
  {
    dataKey: "address",
    key: "address",
    title: t("table.address2"),
    width: 160
  },
  {
    dataKey: "collectName",
    key: "collectName",
    title: t("table.collectName"),
    width: 150
  },
  {
    dataKey: "collectTel",
    key: "collectTel",
    title: t("table.collectTel"),
    width: 150
  },
  {
    dataKey: "onDutyDays",
    key: "onDutyDays",
    title: t("table.onDutyDays"),
    width: 150
  },
  {
    dataKey: "absentFromWorkDays",
    key: "absentFromWorkDays",
    title: t("table.absentFromWorkDays"),
    width: 150
  },
  {
    dataKey: "collectNumber",
    key: "collectNumber",
    title: t("table.collectNumber"),
    width: 150
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
  let timeDate2 = timeDate.value[1];
  const form = siteMess.value.getSite();
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
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    startTime,
    endTime,
    collectUserTel: collectUserTel.value, // 搜索类型
    collectUserName: collectUserName.value, // 所填写的关键字
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  checkList(data).then(res => {
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
