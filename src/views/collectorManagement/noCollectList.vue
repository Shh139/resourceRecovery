<template>
  <!-- 收集列表 -->
  <el-card>
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
        <el-button type="primary" :icon="Search" @click="getData">{{
          t("buttons.pureSearch")
        }}</el-button>
      </el-col>
    </el-row>
    <el-row style="height: 440px">
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
  </el-card>
</template>

<script setup lang="ts">
import siteForm from "@/components/siteForm/index.vue";
import { Search } from "@element-plus/icons-vue";
import type { Column } from "element-plus";
import { useI18n } from "vue-i18n";
import {
  ref,
  reactive,
  onMounted,
  nextTick,
  h,
  computed,
  createVNode
} from "vue";
import { collectionUserNoCheck, listSun } from "@/api/staff";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
import { ElButton, ElTag } from "element-plus";
import vewMess from "./dialog/noCollect.vue";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "NoCollectList"
});

const timeDate = ref("");
const status = ref(0);
const siteMess = ref(null);
const rubbishType = ref("");
const otherinfoType = ref(1);
const ifExportImg = ref("");
const count = ref(0);
const queryMsg = ref("");
const allWeht = ref(0);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});

const dataTab = ref([]);
const imageSrc1 = computed(() => require("@/assets/qun.png"));
const imageSrc2 = computed(() => require("@/assets/ganbu.png"));
console.log(imageSrc1);

const columns: Column<any>[] = [
  {
    dataKey: "street",
    key: "street",
    title: t("table.townStreet"),
    width: 250
  },
  {
    dataKey: "village",
    key: "village",
    title: t("table.subordinate"),
    width: 250
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.name"),
    width: 250
  },
  {
    dataKey: "tel",
    key: "tel",
    title: t("table.tel"),
    width: 250
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 180,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleView(data)
          },
          { default: () => t("table.check") }
        )
      ]);
    }
  }
];

onMounted(() => {
  nextTick(() => {
    getData();
    getMess();
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

function getMess() {
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
    status: status.value,
    queryMsg: queryMsg.value,
    rubbishType: rubbishType.value,
    otherinfoType: otherinfoType.value,
    ifExportImg: ifExportImg.value,
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  listSun(data).then(res => {
    console.log(res);
    if (
      (res as { status: number; data: any; count: number }).status === 10001000
    ) {
      allWeht.value = (res as { status: number; data: any }).data.allWeight;
      message(t("message.success"), { type: "success" });
    } else {
      message((res as { msg: string }).msg, { type: "error" });
    }
  });
}

function getData() {
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
    status: status.value,
    queryMsg: queryMsg.value,
    rubbishType: rubbishType.value,
    otherinfoType: otherinfoType.value,
    ifExportImg: ifExportImg.value,
    provinceId: form.provinceId, // 省级
    cityId: form.cityId, // 市级
    areaId: form.areaId, // 县
    streetId: form.streetId, // 街道
    estateId: form.estateId, // 区
    villageId: form.villageId // 村
  };
  collectionUserNoCheck(data).then(res => {
    if (res.status === 10001000) {
      dataTab.value = res.data;
      count.value = res.count;
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

const formThreeInline = ref({
  addUserId: 0
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

/** 查看信息 */
function handleView(data) {
  console.log(data.rowData.id);
  const resetFormThreeInline = cloneDeep(data.rowData);
  addDialog({
    title: "可拖拽",
    height: "500px",
    width: "1000px",
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

/** 审核 */
function handleExamine(data) {}

function exportData() {
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
  if (!form.areaId) {
    message(t("message.daochuError"), { type: "error" });
    return;
  }
  const data = {
    startTime,
    endTime,
    status: status.value,
    queryMsg: queryMsg.value,
    otherinfoType: otherinfoType.value,
    rubbishType: rubbishType.value,
    ifExportImg: ifExportImg.value,
    provinceId: form.provinceId,
    cityId: form.cityId,
    areaId: form.areaId,
    streetId: form.streetId,
    villageId: form.villageId,
    estateId: form.villageId
  };
  // exportCollectData(data).then(res => {
  //   console.log(res);
  // });
  const url = `http://www.jinlyun.cn:8084/collectData/exportCollectData?startTime=${data.startTime}&endTime=${data.endTime}&status=${data.status}&queryMsg=${data.queryMsg}&otherinfoType=${data.otherinfoType}&rubbishType=${data.rubbishType}&ifExportImg=${data.ifExportImg}&provinceId=${data.provinceId}&cityId=${data.cityId}&areaId=${data.areaId}&streetId=${data.streetId}&villageId=${data.villageId}`;
  window.location.href = url;
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
