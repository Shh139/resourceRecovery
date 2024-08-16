<!-- 公司绑定设备列表 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <h3>{{ t("menus.companyEquipmentList") }}</h3>
      <site-form ref="siteMess" />
      <el-row>
        <el-col :span="5">
          <el-form-item :label="t('form.deviceType')">
            <el-select
              v-model="equipType"
              :placeholder="t('content.select')"
              filterable
            >
              <el-option :value="0" :label="t('content.lodgingType1')" />
              <el-option :value="1" :label="t('tag.telType8')" />
              <el-option :value="2" :label="t('tag.telType9')" />
              <el-option :value="3" :label="t('tag.telType10')" />
              <el-option :value="4" :label="t('tag.telType11')" />
              <el-option :value="5" :label="t('tag.telType12')" />
              <el-option :value="6" :label="t('tag.telType13')" />
              <el-option :value="7" :label="t('tag.telType14')" />
              <el-option :value="8" :label="t('tag.telType15')" />
              <el-option :value="9" :label="t('tag.telType16')" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="t('form.macSite')">
            <el-input
              v-model="macaddress"
              style="width: 100%"
              :placeholder="t('form.macSite')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" :icon="Search" @click="getData">{{
            t("buttons.pureSearch")
          }}</el-button>
          <el-button type="primary" @click="previousPage">{{
            t("buttons.return")
          }}</el-button>
        </el-col>
      </el-row>
      <el-row style="height: 390px">
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
import { delCorporationBind, getCorporationBindEquip } from "@/api/user";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();
defineOptions({
  name: "EquipmentList"
});
const { initToDetail, getParameter } = useDetail();
initToDetail();
const columns: Column<any>[] = [
  {
    dataKey: "equipType",
    key: "equipType",
    title: t("table.pointExchange1"),
    width: 100,
    cellRenderer: ({ cellData: equipType }) => h("div", getEquipType(equipType))
  },
  {
    dataKey: "macaddress",
    key: "macaddress",
    title: t("table.equipmentTable3"),
    width: 200
  },
  {
    dataKey: "areaInfo",
    key: "areaInfo",
    title: t("table.areaInfo"),
    width: 180
  },
  {
    dataKey: "fullname",
    key: "fullname",
    title: t("table.collectName"),
    width: 150
  },
  {
    dataKey: "licensePlateNumber",
    key: "licensePlateNumber",
    title: t("table.equipmentTable7"),
    width: 200
  },
  {
    dataKey: "updatetime",
    key: "updatetime",
    title: t("table.puttime"),
    width: 200
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 100,
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
const equipType = ref(0);

var macaddress = ref("");
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
function getEquipType(eve) {
  switch (eve) {
    case 1:
      return t("tag.telType8");
      break;
    case 2:
      return t("tag.telType9");
      break;
    case 3:
      return t("tag.telType10");
      break;
    case 3:
      return t("tag.telType11");
      break;
    case 3:
      return t("tag.telType12");
      break;
    case 3:
      return t("tag.telType13");
      break;
    case 3:
      return t("tag.telType14");
      break;
    case 3:
      return t("tag.telType15");
      break;
    case 3:
      return t("tag.telType16");
      break;
  }
}
function previousPage() {
  router.push({ name: "CorporationList" });
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
    id: getParameter.id,
    equipType: equipType.value,
    macaddress: macaddress.value
  };
  getCorporationBindEquip(data).then(res => {
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
