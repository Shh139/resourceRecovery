<!-- 回收类型管理 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <site-form ref="siteMess" />
      <el-row justify="space-between">
        <el-col :span="4">
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
        <el-col :span="4">
          <el-form-item :label="t('form.deviceStatus')">
            <el-select
              v-model="eqactive"
              :placeholder="t('content.select')"
              filterable
            >
              <el-option :value="0" :label="t('content.lodgingType1')" />
              <el-option :value="1" :label="t('tag.deviceStatus1')" />
              <el-option :value="2" :label="t('tag.deviceStatus2')" />
              <el-option :value="3" :label="t('tag.deviceStatus3')" />
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
        <el-col :span="4">
          <el-form-item :label="t('form.licensePlate')">
            <el-input
              v-model="licensePlateNumber"
              style="width: 100%"
              :placeholder="t('form.licensePlate')"
            />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" :icon="Search" @click="getData">{{
            t("buttons.pureSearch")
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
import siteForm from "@/components/siteForm/index.vue";
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
import { equipList } from "@/api/equipment";
const { t } = useI18n();

const dataTab = ref([]);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "ReclamationType"
});

const columns: Column<any>[] = [
  {
    dataKey: "equipType",
    key: "equipType",
    title: t("table.equipmentTable1"),
    width: 120,
    cellRenderer: ({ cellData: equipType }) => h("div", getEquipType(equipType))
  },
  {
    dataKey: "orderId",
    key: "orderId",
    title: t("table.equipmentTable2"),
    width: 180
  },
  {
    dataKey: "macaddress",
    key: "macaddress",
    title: t("table.equipmentTable3"),
    width: 180
  },
  {
    dataKey: "areaInfo",
    key: "areaInfo",
    title: t("table.equipmentTable4"),
    width: 200
  },
  {
    dataKey: "fullname",
    key: "fullname",
    title: t("table.equipmentTable5"),
    width: 160
  },
  {
    dataKey: "updatetime",
    key: "updatetime",
    title: t("table.equipmentTable6"),
    width: 180
  },
  {
    dataKey: "licensePlateNumber",
    key: "licensePlateNumber",
    title: t("table.equipmentTable7"),
    width: 150
  }
];

var equipType = ref(0);
var eqactive = ref(0);
var macaddress = ref("");
var licensePlateNumber = ref("");
const siteMess = ref(null);
var count = ref(0);
var siteName = ref("");
var table = reactive({
  pageNum: 1,
  pageSize: 15
});

onMounted(() => {
  nextTick(() => {
    getData();
  });
});

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
    equipType: equipType.value, // 搜索类型
    eqactive: eqactive.value,
    macaddress: macaddress.value, // 所填写的关键字
    licensePlateNumber: licensePlateNumber.value,
    provinceid: form.provinceId,
    cityid: form.cityId,
    areaid: form.areaId,
    streetid: form.streetId,
    estateid: form.estateId,
    villageid: form.villageId
  };
  equipList(data).then(res => {
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

/** 用户编辑 redactMess */
function handleEdit(data) {
  // const resetFormThreeInline = cloneDeep(data.rowData);
  // const formThreeInline = data.rowData;
  // formThreeInline.iconImgSrc = data.rowData.iconImg;
  // addDialog({
  //   title: "可拖拽",
  //   height: "500px",
  //   draggable: false,
  //   headerRenderer: ({ close, titleId, titleClass }) =>
  //     h("div", t("title.editMess")),
  //   contentRenderer: () =>
  //     createVNode(editReclamationType, {
  //       formInline: data.rowData
  //     }),
  //   closeCallBack: ({ options, args }) => {
  //     if (args?.command === "cancel") {
  //       // 您点击了取消按钮
  //       // 重置表单数据
  //       formThreeInline.value = cloneDeep(resetFormThreeInline);
  //     } else if (args?.command === "sure") {
  //       updateHuiPrdYC({
  //         recyType: 1,
  //         id: formThreeInline.id,
  //         title: formThreeInline.title,
  //         price: formThreeInline.price,
  //         units: formThreeInline.units,
  //         iconImg: formThreeInline.iconImgSrc,
  //         fullname: formThreeInline.fullname
  //       }).then(res => {
  //         console.log(res);
  //         if ((res as { status: number }).status !== 10001000) {
  //           message(`${(res as { msg: string }).msg}`);
  //         }
  //         getUserList();
  //         // 重置表单数据
  //         formThreeInline.value = cloneDeep(resetFormThreeInline);
  //       });
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
