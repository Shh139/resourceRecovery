<template>
  <el-form-item :label="t('content.siteName')" style="width: 90%">
    <el-row v-if="patternIs">
      <el-col :span="3">
        <el-select
          v-model="form.provinceId"
          :placeholder="t('content.select')"
          filterable
          @change="provinceChange"
        >
          <template v-if="provinceList.length > 0">
            <el-option
              v-for="item in provinceList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="form.cityId"
          :placeholder="t('content.select')"
          filterable
          @change="updateArea"
        >
          <el-option label="请选择" :value="0" />
          <template v-if="cityList.length > 0">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="form.areaId"
          :placeholder="t('content.select')"
          filterable
          @change="updateStreet"
        >
          <el-option label="请选择" :value="0" />
          <template v-if="areaList.length > 0">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="form.streetId"
          :placeholder="t('content.select')"
          filterable
          @change="updateVillageList"
        >
          <el-option label="请选择" :value="0" />
          <template v-if="streetList.length > 0">
            <el-option
              v-for="item in streetList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="form.villageId"
          :placeholder="t('content.select')"
          filterable
          @change="updateEstateList"
        >
          <el-option label="请选择" :value="0" />
          <template v-if="villageList.length > 0">
            <el-option
              v-for="item in villageList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select
          v-model="form.estateId"
          :placeholder="t('content.select')"
          filterable
        >
          <template v-if="estateList.length > 0">
            <el-option label="请选择" :value="0" />
            <el-option
              v-for="item in estateList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-row>
        <el-col :span="7">
          <el-select
            v-model="form.provinceId"
            :placeholder="t('content.select')"
            filterable
            @change="provinceChange"
          >
            <template v-if="provinceList.length > 0">
              <el-option
                v-for="item in provinceList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </template>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="form.cityId"
            :placeholder="t('content.select')"
            filterable
            @change="updateArea"
          >
            <el-option label="请选择" :value="0" />
            <template v-if="cityList.length > 0">
              <el-option
                v-for="item in cityList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </template>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="form.areaId"
            :placeholder="t('content.select')"
            filterable
            @change="updateStreet"
          >
            <el-option label="请选择" :value="0" />
            <template v-if="areaList.length > 0">
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </template>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-select
            v-model="form.streetId"
            :placeholder="t('content.select')"
            filterable
            @change="updateVillageList"
          >
            <el-option label="请选择" :value="0" />
            <template v-if="streetList.length > 0">
              <el-option
                v-for="item in streetList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </template>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="form.villageId"
            :placeholder="t('content.select')"
            filterable
            @change="updateEstateList"
          >
            <el-option label="请选择" :value="0" />
            <template v-if="villageList.length > 0">
              <el-option
                v-for="item in villageList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </template>
          </el-select>
        </el-col>
        <el-col :span="7">
          <el-select
            v-model="form.estateId"
            :placeholder="t('content.select')"
            filterable
          >
            <template v-if="estateList.length > 0">
              <el-option label="请选择" :value="0" />
              <el-option
                v-for="item in estateList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </template>
          </el-select>
        </el-col>
      </el-row>
    </el-row>
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, defineProps } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { message } from "@/utils/message";
import { getcity } from "@/api/user";
import Cookies from "js-cookie";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const form = reactive({
  provinceId: "",
  cityId: "",
  areaId: "",
  streetId: "",
  estateId: "",
  villageId: ""
});

const transmitIS = ref(false);

var provinceList = ref([]);
var cityList = ref([]);
var areaList = ref([]);
var streetList = ref([]);
var estateList = ref([]);
var villageList = ref([]);
var props = defineProps({
  defaultIs: {
    type: Boolean,
    default: true
  },
  pattern: {
    type: Boolean,
    default: true
  },
  defaultData: {
    type: Object,
    default: () => {
      return {};
    }
  }
});

var patternIs = ref(true);

onMounted(() => {
  nextTick(async () => {
    patternIs.value = props.pattern;
    if (props.defaultIs) {
      transmitIS.value = false;
      await init();
    } else {
      // 有默认值
      const site = JSON.parse(Cookies.get("siteMessage")).regionDto;
      provinceList.value = site.provinceList;
      form.provinceId = props.defaultData.provinceId;
      provinceChange(props.defaultData.provinceId);
      // form.cityId = props.defaultData.cityId;
      // updateArea(props.defaultData.cityId);
      // form.areaId = props.defaultData.areaId;
      // updateStreet(props.defaultData.areaId);
      // form.streetId = props.defaultData.streetId;
      // updateEstateList(props.defaultData.streetId);
      // form.estateId = props.defaultData.estateId;
      // updateVillageList(props.defaultData.estateId);
      // form.villageId = props.defaultData.villageId;
    }
  });
});

function init() {
  const site = JSON.parse(Cookies.get("siteMessage")).regionDto;
  provinceList.value = site.provinceList;
  cityList.value = site.cityList;
  areaList.value = site.areaList;
  streetList.value = site.streetList;
  estateList.value = site.estateList;
  villageList.value = site.villageList;
  // console.log(provinceList);
}

function provinceChange(newValue: number) {
  if (!newValue) {
    return;
  }
  // this.$emit("refresh");
  if (!transmitIS.value) {
    form.cityId = "";
    form.areaId = "";
    form.streetId = "";
    form.estateId = "";
    form.villageId = "";
  }
  cityList.value = [];
  areaList.value = [];
  streetList.value = [];
  estateList.value = [];
  villageList.value = [];
  getcity(newValue).then(res => {
    if ((res as { status: number }).status !== 10001000) {
      message(`${(res as { msg: string }).msg}`);
    } else {
      const data = (res as { status: number; msg: string; data: any }).data;
      cityList.value = data;
      if (!transmitIS.value) {
        if (props.defaultIs) {
          form.cityId = data.length === 1 ? data[0].id : "";
        } else {
          form.cityId = props.defaultData.cityId;
        }
      }
      if (form.provinceId) {
        updateArea(form.cityId);
      }
    }
  });
}

/** 更新县城 */
function updateArea(newValue) {
  if (!newValue) {
    return;
  }
  if (!transmitIS.value) {
    form.streetId = "";
    form.estateId = "";
    form.villageId = "";
  }

  streetList.value = [];
  estateList.value = [];
  villageList.value = [];
  getcity(newValue).then(res => {
    if ((res as { status: number }).status !== 10001000) {
      message(`${(res as { msg: string }).msg}`);
    } else {
      const data = (res as { status: number; msg: string; data: any }).data;
      areaList.value = data;
      if (!transmitIS.value) {
        if (props.defaultIs) {
          form.areaId = data.length === 1 ? data[0].id : "";
        } else {
          form.areaId = props.defaultData.areaId;
        }
      }

      if (form.provinceId) {
        updateStreet(form.areaId);
      }
    }
  });
}

/** 更新街道 */
function updateStreet(newValue) {
  // this.$emit("refresh");
  if (!newValue) {
    return;
  }
  if (!transmitIS.value) {
    form.streetId = "";
    form.estateId = "";
    form.villageId = "";
  }

  streetList.value = [];
  estateList.value = [];
  villageList.value = [];
  getcity(newValue).then(res => {
    if ((res as { status: number }).status !== 10001000) {
      message(`${(res as { msg: string }).msg}`);
    } else {
      const data = (res as { status: number; msg: string; data: any }).data;
      streetList.value = data;
      if (!transmitIS.value) {
        if (props.defaultIs) {
          form.streetId = data.length === 1 ? data[0].id : "";
        } else {
          form.streetId = props.defaultData.streetId;
        }
      }

      if (form.provinceId) {
        updateVillageList(form.streetId);
      }
    }
  });
}
// 更新地区
function updateEstateList(newValue) {
  if (!newValue || newValue === 0) {
    return;
  }
  // this.$emit("refresh");
  if (!transmitIS.value) {
    form.estateId = "";
  }
  estateList.value = [];
  getcity(newValue).then(res => {
    if ((res as { status: number }).status !== 10001000) {
      message(`${(res as { msg: string }).msg}`);
    } else {
      const data = (res as { status: number; msg: string; data: any }).data;
      estateList.value = data;
      if (!transmitIS.value) {
        if (props.defaultIs) {
          form.estateId = data.length === 1 ? data[0].id : "";
        } else {
          form.estateId = props.defaultData.estateId;
        }
      }
      // if (form.provinceId) {
      //   updateEstateList(form.estateId);
      // }
    }
  });
}
// 更新社区
function updateVillageList(newValue) {
  // this.$emit('refresh')
  if (!newValue || newValue === 0) {
    return;
  }
  if (!transmitIS.value) {
    form.estateId = "";
    form.villageId = "";
  }
  villageList.value = [];
  estateList.value = [];

  getcity(newValue).then(res => {
    if ((res as { status: number }).status !== 10001000) {
      message(`${(res as { msg: string }).msg}`);
    } else {
      const data = (res as { status: number; msg: string; data: any }).data;
      villageList.value = data;
      if (!transmitIS.value) {
        form.villageId = data.length === 1 ? data[0].id : "";
        if (props.defaultIs) {
          form.villageId = data.length === 1 ? data[0].id : "";
        } else {
          form.villageId = props.defaultData.villageId;
        }
      }
      updateEstateList(form.villageId);
      // if (form.provinceId) {
      //   updateEstateList(form.estateId);
      // }
    }
  });
}

/** 返回所选地址 */
function getSite() {
  return form;
}
/** 设置地址 */
function setSite(eve) {
  Object.assign(form, eve);
  console.log(form.cityId);
  nextTick(() => {
    setTimeout(() => {
      if (form.provinceId) {
        transmitIS.value = true;
        provinceChange(Number(form.provinceId));
      }
    }, 1000);
  });
}
defineExpose({ getSite, setSite });
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
</style>
