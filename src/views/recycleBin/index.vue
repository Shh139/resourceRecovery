<!-- 回收类型管理 -->
<template>
  <el-form size="default">
    <el-card shadow="never">
      <site-form ref="siteMess" />
      <el-row>
        <el-col :span="4">
          <el-form-item :label="t('content.selectType')">
            <el-select
              v-model="siteType"
              :placeholder="t('content.select')"
              filterable
            >
              <el-option :value="-1" :label="t('content.lodgingType1')" />
              <el-option :value="1" :label="t('content.site1')" />
              <el-option :value="2" :label="t('content.site2')" />
              <el-option :value="3" :label="t('content.site3')" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-input
            v-model="siteName"
            style="width: 100%"
            :placeholder="t('content.inputMess')"
          />
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
import siteForm from "@/components/siteForm/index.vue";
import { Search, CirclePlus } from "@element-plus/icons-vue";
import { h, ref, reactive, onMounted, nextTick, createVNode } from "vue";
import { useI18n } from "vue-i18n";
import { ElButton } from "element-plus";
import type { Column } from "element-plus";
import {
  getRubbishSiteList,
  addRubbishSite,
  delRubbishSite,
  updateRubbishSite
} from "@/api/recycleBin";
import { message } from "@/utils/message";
import { cloneDeep } from "@pureadmin/utils";
import { addDialog } from "@/components/ReDialog";
import addView from "./dialog/addView.vue";
import editView from "./dialog/editView.vue";
const { t } = useI18n();

const dataTab = ref([]);

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "ReclamationType"
});

const columns: Column<any>[] = [
  {
    dataKey: "areaInfo",
    key: "areaInfo",
    title: t("content.userMess4"),
    width: 150
  },
  {
    dataKey: "street",
    key: "street",
    title: t("table.pointExchange1"),
    width: 110,
    cellRenderer: ({ cellData: street }) =>
      h(
        "div",
        street == 1
          ? t("content.site1")
          : street == 2
            ? t("content.site2")
            : t("content.site3")
      )
  },
  {
    dataKey: "siteName",
    key: "siteName",
    title: t("table.name3"),
    width: 150
  },
  {
    dataKey: "lng",
    key: "lng",
    title: t("table.longitude"),
    width: 130
  },
  {
    dataKey: "lat",
    key: "lat",
    title: t("table.latitude"),
    width: 130
  },
  {
    dataKey: "siteDesc",
    key: "siteDesc",
    title: t("table.description"),
    width: 150
  },
  {
    dataKey: "createTime",
    key: "createTime",
    title: t("form.checkInScore2"),
    width: 150
  },
  {
    dataKey: "operation",
    key: "operation",
    title: t("table.operation"),
    width: 190,
    cellRenderer: data => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => handleEdit(data)
          },
          { default: () => t("table.amend") }
        ),
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => handleDelete(data)
          },
          { default: () => t("table.delete") }
        )
      ]);
    }
  }
];

var siteType = ref(-1);
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
    siteType: siteType.value, // 搜索类型
    siteName: siteName.value, // 所填写的关键字
    provinceid: form.provinceId,
    cityid: form.cityId,
    areaid: form.areaId,
    streetid: form.streetId,
    estateid: form.estateId,
    villageid: form.villageId
  };
  getRubbishSiteList(data).then(res => {
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

/** 添加站点 */
function handleAdd() {
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.addMess")),
    contentRenderer: () =>
      createVNode(addView, {
        formInline: formThreeInline.value
      }),
    closeCallBack: ({ options, args }) => {
      let mess = formThreeInline.value;
      if (args?.command === "cancel") {
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        console.log(mess);
        addRubbishSite(mess).then(res => {
          if (res.status === 10001000) {
            message(`${(res as { msg: string }).msg}`);
            getData();
          }
          // 重置表单数据
          formThreeInline.value = cloneDeep(resetFormThreeInline);
        });
      } else {
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      }
    }
  });
}

/** 站点编辑 redactMess */
function handleEdit(data) {
  const resetFormThreeInline = cloneDeep(data.rowData);
  const formThreeInline = data.rowData;
  formThreeInline.iconImgSrc = data.rowData.iconImg;
  addDialog({
    title: "可拖拽",
    height: "500px",
    draggable: false,
    headerRenderer: ({ close, titleId, titleClass }) =>
      h("div", t("title.editMess")),
    contentRenderer: () =>
      createVNode(editView, {
        formInline: formThreeInline
      }),
    closeCallBack: ({ options, args }) => {
      if (args?.command === "cancel") {
        // 您点击了取消按钮
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      } else if (args?.command === "sure") {
        console.log(formThreeInline);
        updateRubbishSite(formThreeInline).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            message(`${(res as { msg: string }).msg}`);
          }
          getData();
          // 重置表单数据
          formThreeInline.value = cloneDeep(resetFormThreeInline);
        });
      } else {
        // 重置表单数据
        formThreeInline.value = cloneDeep(resetFormThreeInline);
      }
    }
  });
}

/** 站点删除 */
function handleDelete(data) {
  console.log(data);
  addDialog({
    width: "20%",
    height: "20px",
    title: t("form.tips"),
    popconfirm: { title: t("form.tips") },
    contentRenderer: () => h("p", t("form.deleteMsg2")),
    closeCallBack: ({ options, args }) => {
      if (args?.command === "sure") {
        delRubbishSite({ id: data.rowData.id }).then(res => {
          if ((res as { status: number }).status !== 10001000) {
            // message(`${(res as { msg: string }).msg}`);
            getData();
          } else {
            message(`${(res as { msg: string }).msg}`);
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
</style>
