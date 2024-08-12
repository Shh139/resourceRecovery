<!-- 省市管理 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <el-row>
        <el-col :span="5">
          <el-form-item :label="t('form.parentAddress')">
            <el-input
              v-model="lastRegionName"
              style="width: 100%"
              :placeholder="t('form.parentAddress')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="t('form.currentArea')">
            <el-input
              v-model="regionName"
              style="width: 100%"
              :placeholder="t('form.currentArea')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Search" @click="getData">{{
            t("buttons.pureSearch")
          }}</el-button>
          <el-button type="primary" :icon="CirclePlus" @click="handleAdd">{{
            t("buttons.pureAppend")
          }}</el-button>
        </el-col>
      </el-row>
      <el-row style="height: 430px">
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
  </el-form>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import { siteList } from "@/api/systemManagement";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();

const dataTab = ref([]);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "SystemManagement"
});

const columns: Column<any>[] = [
  {
    dataKey: "lastRegionName",
    key: "lastRegionName",
    title: t("table.superiorDistrict"),
    width: 200
  },
  {
    dataKey: "regionName",
    key: "regionName",
    title: t("table.districtName"),
    width: 200
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("form.checkInScore2"),
    width: 200
  },
  {
    dataKey: "updateTime",
    key: "updateTime",
    title: t("form.checkInScore3"),
    width: 200
  }
];

var lastRegionName = ref("");
var regionName = ref("");
var count = ref(0);
var table = reactive({
  pageNum: 1,
  pageSize: 15
});

onMounted(() => {
  nextTick(() => {
    getData();
  });
});

function changeFun(currentPage: number, pageSize: number) {
  table = {
    pageNum: currentPage,
    pageSize: pageSize
  };
  getData();
}

function getData() {
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    lastRegionName: lastRegionName.value, // 搜索类型
    regionName: regionName.value // 所填写的关键字
  };
  siteList(data).then(res => {
    if (res.status === 10001000) {
      dataTab.value = (res as { status: number; data: any }).data;
      count.value = (res as { count: number }).count;
      message(t("message.success"), { type: "success" });
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

const formThreeInline = ref({
  siteType: 1,
  siteName: "",
  siteDesc: "",
  lng: "",
  lat: "",
  provinceId: "",
  cityId: "",
  areaId: "",
  streetId: "",
  estateId: "",
  villageId: ""
});
const resetFormThreeInline = cloneDeep(formThreeInline.value);

/** 添加回收类型 */
function handleAdd() {
  // addDialog({
  //   title: "可拖拽",
  //   height: "500px",
  //   draggable: false,
  //   headerRenderer: ({ close, titleId, titleClass }) =>
  //     h("div", t("title.addMess")),
  //   contentRenderer: () =>
  //     createVNode(addView, {
  //       formInline: formThreeInline.value
  //     }),
  //   closeCallBack: ({ options, args }) => {
  //     let mess = formThreeInline.value;
  //     console.log(mess);
  //     if (args?.command === "cancel") {
  //       formThreeInline.value = cloneDeep(resetFormThreeInline);
  //     } else if (args?.command === "sure") {
  //       // addHuiPrd2(mess).then(res => {
  //       //   if ((res as { status: number }).status !== 10001000) {
  //       //     message(`${(res as { msg: string }).msg}`);
  //       //   }
  //       //   getUserList();
  //       //   // 重置表单数据
  //       //   formThreeInline.value = cloneDeep(resetFormThreeInline);
  //       // });
  //     } else {
  //       // 重置表单数据
  //       formThreeInline.value = cloneDeep(resetFormThreeInline);
  //     }
  //   }
  // });
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
