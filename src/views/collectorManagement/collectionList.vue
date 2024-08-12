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
      <el-col :span="4">
        <el-form-item :label="t('content.selectType')">
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
      <el-col :span="5">
        <el-form-item :label="t('form.reclamationType')">
          <el-select v-model="rubbishType">
            <el-option :label="t('form.reclamationType1')" value="" />
            <el-option :label="t('form.reclamationType2')" :value="0" />
            <el-option :label="t('form.reclamationType3')" :value="1" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-form-item :label="t('form.other')">
          <el-select v-model="otherinfoType">
            <el-option :label="t('form.dangType4')" :value="1" />
            <el-option :label="t('form.other1')" :value="2" />
            <el-option :label="t('form.other2')" :value="3" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item :label="t('form.image')">
          <el-select v-model="ifExportImg">
            <el-option :label="t('content.lodgingType1')" value="" />
            <el-option :label="t('form.image1')" :value="0" />
            <el-option :label="t('form.image2')" :value="1" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" :icon="Search" @click="getUserList">{{
          t("buttons.pureSearch")
        }}</el-button>
        <!-- <el-button :icon="Position" @click="exportData">{{
          t("buttons.pureDerive")
        }}</el-button> -->
      </el-col>
      <el-col :span="10"
        >{{ t("title.totalWeight") }}：{{ allWeht }}kg;
        {{ t("title.allNumber") }}：{{ count }} {{ t("title.unit") }}</el-col
      >
    </el-row>
    <el-row style="height: 361px">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :stripe="true"
            :columns="columns"
            :estimated-row-height="60"
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
import { ref, reactive, onMounted, nextTick, h, computed } from "vue";
import { collectionList, listSun, exportCollectData } from "@/api/staff";
import { message } from "@/utils/message";
const { t } = useI18n();
import { ElButton, ElTag } from "element-plus";
import data from "@iconify-icons/ri/fullscreen-fill";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "CollectionList"
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
    dataKey: "username",
    key: "username",
    title: t("table.name"),
    width: 100
  },
  {
    dataKey: "allAddress",
    key: "allAddress",
    title: t("form.address"),
    width: 180
  },
  {
    dataKey: "collectType",
    key: "collectType",
    title: t("table.classificationSituation"),
    width: 100,
    cellRenderer: ({ cellData: collectType }) =>
      h(
        "p",
        collectType == 0
          ? t("table.acceptableCondition3")
          : collectType == 1
            ? t("table.acceptableCondition2")
            : collectType == 2
              ? t("table.acceptableCondition1")
              : collectType == 3
                ? t("table.acceptableCondition4")
                : t("table.acceptableCondition5")
      )
  },
  {
    dataKey: "point",
    key: "point",
    title: t("table.environmentalCredits"),
    width: 80
  },
  {
    dataKey: "weight",
    key: "weight",
    title: t("table.trashWeight"),
    width: 100
  },
  {
    dataKey: "rubbishType",
    key: "rubbishType",
    title: t("table.garbageType"),
    width: 150,
    cellRenderer: ({ cellData: rubbishType }) =>
      h(
        "p",
        rubbishType == 0
          ? t("form.reclamationType2")
          : t("form.reclamationType3")
      )
  },
  {
    dataKey: "collectUserName",
    key: "collectUserName",
    title: t("table.collectName"),
    width: 150
  },
  {
    dataKey: "imgpath",
    key: "imgpath",
    title: t("table.realTimePicture"),
    width: 150,
    cellRenderer: ({ cellData: imgpath }) =>
      h("img", { src: imgpath, alt: t("table.realTimePicture") })
  },
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("table.puttime2"),
    width: 150
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
            onClick: () => handleView(data)
          },
          { default: () => t("table.check") }
        ),
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => handleExamine(data)
          },
          { default: () => t("table.examine") }
        )
      ]);
    }
  }
];

onMounted(() => {
  nextTick(() => {
    getUserList();
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
  collectionList(data).then(res => {
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

/** 切换页面 */
/** 获取相应页面信息 */
function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getUserList();
}

/** 查看详细信息 */
function handleView(data) {}

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
