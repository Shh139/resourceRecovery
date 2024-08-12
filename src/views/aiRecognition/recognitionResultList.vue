<template>
  <!-- 智能识别结果列表 -->
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
        <el-form-item :label="t('form.fjiaMess')">
          <el-select v-model="rubbishType">
            <el-option :label="t('content.lodgingType1')" value="" />
            <el-option :label="t('form.reclamationType2')" :value="0" />
            <el-option :label="t('form.reclamationType3')" :value="1" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-select v-model="dateType">
          <el-option :label="t('form.fjiaMess1')" :value="0" />
          <el-option :label="t('form.fjiaMess2')" :value="2" />
          <el-option :label="t('form.fjiaMess3')" :value="3" />
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="regionType">
          <el-option :label="t('form.regionType1')" :value="0" />
          <el-option :label="t('form.regionType2')" :value="1" />
          <el-option :label="t('form.regionType3')" :value="2" />
          <el-option :label="t('form.regionType4')" :value="4" />
        </el-select>
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
import siteForm from "@/components/siteForm/index.vue";
import { ref, reactive, onMounted, nextTick, h } from "vue";
import { useI18n } from "vue-i18n";
import type { Column } from "element-plus";
import { imgAiReportList } from "@/api/ai";
import { message } from "@/utils/message";
import { ElButton } from "element-plus";
const { t } = useI18n();
const siteMess = ref(null);
const count = ref(0);
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "RecognitionResultList"
});
var table = reactive({
  pageNum: 1,
  pageSize: 15
});
const dataTab = ref([]);
const timeDate = ref("");
const dateType = ref(0);
const rubbishType = ref("");
const regionType = ref(0);

const columns: Column<any>[] = [
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("form.identificationResult1"),
    width: 140
  },
  {
    dataKey: "address",
    key: "address",
    title: t("form.identificationResult2"),
    width: 160
  },
  {
    dataKey: "collectName",
    key: "collectName",
    title: t("form.identificationResult3"),
    width: 150
  },
  {
    dataKey: "collectTel",
    key: "collectTel",
    title: t("form.identificationResult4"),
    width: 150
  },
  {
    dataKey: "collectHouseNumber",
    key: "collectHouseNumber",
    title: t("form.identificationResult5"),
    width: 150
  },
  {
    dataKey: "collectFrequency",
    key: "collectFrequency",
    title: t("form.identificationResult6"),
    width: 150
  },
  {
    dataKey: "trashWeight",
    key: "trashWeight",
    title: t("form.identificationResult7"),
    width: 150
  },
  {
    dataKey: "emptyBucketFrequency",
    key: "emptyBucketFrequency",
    title: t("form.identificationResult8"),
    width: 150
  },
  {
    dataKey: "unqualifiedFrequency",
    key: "unqualifiedFrequency",
    title: t("form.identificationResult9"),
    width: 150
  },
  {
    dataKey: "qualifiedFrequency",
    key: "qualifiedFrequency",
    title: t("form.identificationResult10"),
    width: 150
  },
  {
    dataKey: "qualifiedFrequency",
    key: "qualifiedFrequency",
    title: t("form.identificationResult11"),
    width: 150
  },
  {
    dataKey: "qualifiedFrequency",
    key: "qualifiedFrequency",
    title: t("form.identificationResult12"),
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

onMounted(() => {
  nextTick(() => {
    getUserList();
  });
});

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
    rubbishType: rubbishType.value,
    dateType: dateType.value,
    regionType: regionType.value,
    startTime,
    endTime,
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  imgAiReportList(data).then(res => {
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
