<template>
  <!-- 抓拍识别列表 -->
  <el-card shadow="never">
    <el-row>
      <el-col :span="8">
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
      </el-col>
    </el-row>
    <el-row style="height: 360px">
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
import { ref, reactive, onMounted, nextTick, h } from "vue";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import { detectDiscardList } from "@/api/ai";
import { message } from "@/utils/message";
import { ElButton } from "element-plus";
const { t } = useI18n();
const count = ref(0);
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "CaptureRecognitionList"
});

var table = reactive({
  pageNum: 1,
  pageSize: 15
});

const dataTab = ref([]);

const columns: Column<any>[] = [
  {
    dataKey: "machMac",
    key: "machMac",
    title: t("table.snapshotReport1"),
    width: 246
  },
  {
    dataKey: "imgPath",
    key: "imgPath",
    title: t("table.snapshotReport2"),
    width: 246,
    cellRenderer: ({ cellData: imgpath }) =>
      h("img", {
        src: imgpath,
        alt: t("table.realTimePicture"),
        style: { height: "100px" }
      })
  },
  {
    dataKey: "faceFlag",
    key: "faceFlag",
    title: t("table.snapshotReport3"),
    width: 246,
    cellRenderer: ({ cellData: faceFlag }) =>
      h("img", {
        src: faceFlag,
        alt: t("table.realTimePicture"),
        style: { height: "100px" }
      })
  },
  {
    dataKey: "collectUserName",
    key: "collectUserName",
    title: t("table.snapshotReport4"),
    width: 246
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("table.snapshotReport5"),
    width: 246
  }
];

const timeDate = ref("");

onMounted(() => {
  nextTick(() => {
    getUserList();
  });
});

function getUserList() {
  let timeDate1 = timeDate.value[0];
  let timeDate2 = timeDate.value[0];
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
    startTime,
    endTime,
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize // 每页显示数
  };
  detectDiscardList(data).then(res => {
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
