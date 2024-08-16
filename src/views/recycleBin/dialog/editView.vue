<script setup lang="ts">
import siteForm from "@/components/siteForm/index.vue";
import { BMap, BZoom, BCityList, BMarker } from "vue3-baidu-map-gl";
import { ref, defineProps, reactive, watch, nextTick } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 声明 props 类型
export interface FormProps {
  formInline: {
    siteType: number;
    siteName: string;
    siteDesc: string;
    lng: string;
    lat: string;
    provinceId: number;
    cityId: number;
    areaId: number;
    streetId: number;
    estateId: number;
    villageId: number;
  };
}

// 声明 props 默认值
// 推荐阅读：https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    siteType: 1,
    siteName: "",
    siteDesc: "",
    lng: "",
    lat: "",
    provinceId: 0,
    cityId: 0,
    areaId: 0,
    streetId: 0,
    estateId: 0,
    villageId: 0
  })
});

const newFormInline = ref(props.formInline);
const marKer = reactive({
  lat: Number(newFormInline.value.lat),
  lng: Number(newFormInline.value.lng)
});

const siteMess = ref(null);

const mapClick = res => {
  console.log(res);
  marKer.lat = res.latlng.lat;
  marKer.lng = res.latlng.lng;
  newFormInline.value.lng = marKer.lng.toString();
  newFormInline.value.lat = marKer.lng.toString();
};

watch(
  () => props.formInline,
  newData => {
    console.log(newData);
    nextTick(() => {
      siteMess.value.setSite({
        provinceId: newData.provinceId,
        cityId: newData.cityId,
        areaId: newData.areaId,
        streetId: newData.streetId,
        estateId: newData.estateId,
        villageId: newData.villageId
      });
    });
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <site-form ref="siteMess" :pattern="false" />
  <el-row>
    <el-col>
      <el-form-item :label="t('content.selectType')">
        <el-select
          v-model="newFormInline.siteType"
          :placeholder="t('content.select')"
          filterable
          style="width: 90%"
        >
          <el-option :value="-1" :label="t('content.lodgingType1')" />
          <el-option :value="1" :label="t('content.site1')" />
          <el-option :value="2" :label="t('content.site2')" />
          <el-option :value="3" :label="t('content.site3')" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item :label="t('table.recycleName')">
        <el-input
          v-model="newFormInline.siteName"
          style="width: 100%"
          :placeholder="t('table.recycleName')"
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-form-item :label="t('table.description')">
        <el-input
          v-model="newFormInline.siteDesc"
          style="width: 100%"
          :placeholder="t('content.inputMess')"
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="10">
      <el-form-item :label="t('table.longitude')">
        <el-input
          v-model="newFormInline.lng"
          style="width: 100%"
          :placeholder="t('content.inputMess')"
        />
      </el-form-item>
    </el-col>
    <el-col :span="10">
      <el-form-item :label="t('table.latitude')">
        <el-input
          v-model="newFormInline.lat"
          style="width: 100%"
          :placeholder="t('content.inputMess')"
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-rwo>
    <div>
      <BMap
        ak="e0ZcoNlUbEsRe1PZxb7OckeKqSubV05L"
        mapType="BMAP_NORMAL_MAP"
        :plugins="['TrackAnimation']"
        :enableScrollWheelZoom="true"
        :center="marKer"
        @click="mapClick"
      >
        <BCityList />
        <BMarker :position="marKer" icon="simple_red" />
        <BZoom />
      </BMap>
    </div>
  </el-rwo>
</template>

<style lang="scss" scoped>
.el-col {
  margin-right: 10px;
}
.label {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
::v-deep .el-form-item__label {
  color: #000 !important;
  font-weight: 300 !important;
}
::v-deep .el-row {
  width: 100%;
  margin-bottom: 10px;
}
::v-deep .el-input {
  width: 90% !important;
}
::v-deep .el-dialog__body {
  height: 500px !important;
  overflow: auto;
}
::v-deep .anchorBL {
  display: none;
}
::v-deep .baidu-map-container {
  height: 380px !important;
  margin-bottom: 10px;
}
.BMap {
  position: relative;
}
</style>
