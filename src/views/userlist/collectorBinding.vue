<!-- 采集员绑定列表 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <h3>{{ getParameter.corporationName }}</h3>
      <site-form ref="siteMess" />
      <el-row>
        <el-col :span="3">
          <el-button type="primary" :icon="Search" @click="getData">{{
            t("buttons.pureSearch")
          }}</el-button>
        </el-col>
      </el-row>
      <el-row style="height: 510px">
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
import siteForm from "@/components/siteForm/index.vue";
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import { useDetail } from "./hooks";
import { getCorporationBindCaijiUser, delCorporationBind } from "@/api/user";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
const { t } = useI18n();
defineOptions({
  name: "CollectorBinding"
});
const { initToDetail, getParameter } = useDetail();
initToDetail();
const columns: Column<any>[] = [
  {
    dataKey: "userName",
    key: "userName",
    title: t("table.userName"),
    width: 200
  },
  {
    dataKey: "fullName",
    key: "fullName",
    title: t("table.driver"),
    width: 200
  },
  {
    dataKey: "street",
    key: "street",
    title: t("table.areaInfo"),
    width: 200
  },
  {
    dataKey: "village",
    key: "village",
    title: t("table.address"),
    width: 200
  },
  {
    dataKey: "puttime",
    key: "puttime",
    title: t("table.addDate"),
    width: 200
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 500,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => deleteMess(data)
          },
          { default: () => t("table.delete") }
        )
      ]);
    }
  }
];
const dataTab = ref([]);
const siteMess = ref(null);

var qrcodeType = ref(0);
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
  const form = siteMess.value.getSite();
  const data = {
    // 当前页
    pageNum: table.pageNum,
    pageSize: table.pageSize, // 每页显示数
    provinceid: form.provinceId, // 省级
    cityid: form.cityId, // 市级
    areaid: form.areaId, // 县
    streetid: form.streetId, // 街道
    estateid: form.estateId, // 区
    villageid: form.villageId,
    id: getParameter.id
  };
  getCorporationBindCaijiUser(data).then(res => {
    if (res.status === 10001000) {
      dataTab.value = res.data;
      count.value = res.count;
      message(t("message.success"), { type: "success" });
    } else {
      message(t("message.error"), { type: "error" });
    }
  });
}

function deleteMess({ rowData }) {
  console.log(rowData);
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.deleteMsg2")),
    closeCallBack: ({ options, args }) => {
      const form = siteMess.value.getSite();
      if (args?.command === "sure") {
        delCorporationBind({ id: rowData.id }).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
          } else {
            message(`${(res as { msg: string }).msg}`);
            getData();
          }
        });
      }
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
h3 {
  margin-bottom: 10px;
}
</style>
