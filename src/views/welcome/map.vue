<!-- 设备发布地图 -->
<template>
  <div class="content">
    <el-card class="mapCard">
      <div class="map">
        <BMap
          v-if="equipmentList.length > 0"
          ak="e0ZcoNlUbEsRe1PZxb7OckeKqSubV05L"
          mapType="BMAP_NORMAL_MAP"
          :tilt="73"
          :plugins="['TrackAnimation']"
          :enableScrollWheelZoom="true"
          :center="{ lng: equipmentList[0].lng, lat: equipmentList[0].lat }"
        >
          <BMarker
            v-for="item of equipmentList"
            :key="item.id"
            :position="{ lat: item.lat, lng: item.lng }"
            icon="simple_red"
          />
          <BZoom />
        </BMap>
      </div>
      <div class="formMess">
        <el-row :gutter="10">
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
            <el-form-item :label="t('form.equipment')">
              <el-select
                v-model="equipmentid"
                :placeholder="t('content.select')"
                filterable
              >
                <el-option
                  v-for="item of equipmentList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.macaddress"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="t('form.macSite')">
              <el-input
                v-model="macaddress"
                style="width: 100%"
                :placeholder="t('form.macSite')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="t('table.equipmentTable7')">
              <el-input
                v-model="licensePlateNumber"
                style="width: 100%"
                :placeholder="t('table.equipmentTable7')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" :icon="Search" @click="getData">{{
              t("buttons.pureSearch")
            }}</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import Cookies from "js-cookie";
import { Search } from "@element-plus/icons-vue";
import { BMap, BZoom, BMarker, BCityList } from "vue3-baidu-map-gl";
import { useI18n } from "vue-i18n";
import { getEquipment } from "@/api/equipment";
const { t } = useI18n();
defineOptions({
  name: "mapView"
});
let equipmentid = ref("");
let equipmentList = ref([]);
let equipType = ref(0);
let macaddress = ref("");
let licensePlateNumber = ref("");
onMounted(() => {
  nextTick(() => {
    getData();
  });
});

const resetCenter = () => {
  console.log("中心");
};

const getData = () => {
  const site = getSite();
  let data = {
    ...site,
    equipmentid: equipmentid.value,
    equipType: equipType.value,
    macaddress: macaddress.value,
    licensePlateNumber: licensePlateNumber.value
  };
  getEquipment(data).then(res => {
    if (res.status == 10001000) {
      equipmentList.value = res.data;
      console.log(res.data);
    }
  });
};

const getSite = () => {
  let obj = {
    provinceId: 0
  };
  const site = JSON.parse(Cookies.get("siteMessage")).regionDto;
  if (site.provinceList.length == 1) {
    obj.provinceId = 0;
  }
  if (site.cityList.length == 1) {
    obj["cityId"] = site.cityList[0].id;
  }
  if (site.areaList.length == 1) {
    obj["areaId"] = site.areaList[0].id;
  }
  if (site.streetList.length == 1) {
    obj["streetId"] = site.streetList[0].id;
  }
  if (site.villageList.length == 1) {
    obj["villageId"] = site.villageList[0].id;
  }
  if (site.estateList.length == 1) {
    obj["estateId"] = site.estateList[0].id;
  }
  return obj;
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  .mapCard {
    > ::v-deep .el-card__body {
      padding: 0;
      height: 81.4vh;
    }
  }
  .formMess {
    position: absolute;
    z-index: 99;
    top: 20px;
    right: 20px;
    height: auto;
    display: flex;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0px 2px 10px #ccc;
    ::v-deep .el-card__body {
      width: 98%;
      padding: 0;
    }
    ::v-deep .el-row {
      margin-top: 5px;
      padding-left: 10px;
      padding-top: 10px;
    }
  }
}
.map {
  width: 100%;
  height: 100%;
}
::v-deep .baidu-map-container {
  height: 100% !important;
}
::v-deep .anchorBL {
  display: none;
}
</style>
