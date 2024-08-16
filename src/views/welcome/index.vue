<template>
  <div>
    <el-row :gutter="10" justify="space-between" align="top">
      <template v-for="(item, index) of dataMess" :key="index">
        <el-col
          v-if="index !== 4"
          class="mb-[18px]"
          :lg="6"
          :md="6"
          :sm="6"
          :xs="12"
        >
          <el-card shadow="never">
            <div class="menu">
              <span class="label">{{ item.typeName }}</span>
              <div>
                <metal v-if="index == 0" />
                <mess v-else-if="index == 1" />
                <plastic v-else-if="index == 2" />
                <textileFabric v-else-if="index == 3" />
                <other v-else />
              </div>
            </div>
            <div class="messTable">
              <div>
                <div>{{ item.weight }} kg</div>
                <div class="frequency">+{{ item.collectCount }}</div>
              </div>
              <ChartLine
                v-if="index == 0"
                color="rgb(175, 177, 5)"
                class="!w-1/2"
                :data="[2101, 5288, 4239, 4962, 6752, 5208, 7450]"
              />
              <ChartLine
                v-else-if="index == 1"
                color="#41b6ff"
                class="!w-1/2"
                :data="[0, 1535, 4851, 3258, 4519, 9845, 9876]"
              />
              <ChartLine
                v-else-if="index == 2"
                color="rgba(233, 59, 73, 0.4)"
                class="!w-1/2"
                :data="[4561, 1432, 1465, 2487, 7458, 8120, 9647]"
              />
              <ChartLine
                v-else-if="index == 3"
                color="rgba(7, 152, 55, 0.4)"
                class="!w-1/2"
                :data="[1623, 4156, 2415, 3415, 8456, 8712, 9647]"
              />
            </div>
          </el-card>
        </el-col>
      </template>
      <el-col
        id="aggregateProfile"
        class="mb-[18px] aggregateProfile"
        :lg="18"
        :md="18"
        :sm="12"
        :xs="24"
      >
        <el-card shadow="never">
          <p style="font-size: 16px">{{ t("tag.telType6") }}</p>
          <div style="height: 322px">
            <ChartBar
              :timeData="collectionVolumeData.time"
              :requireData="collectionVolumeData.weight"
            />
          </div>
        </el-card>
      </el-col>
      <el-col class="mb-[18px]" :lg="6" :md="6" :sm="12" :xs="24">
        <el-card shadow="never">
          <div class="glass">
            <span class="label">{{
              dataMess.length > 0 ? dataMess[4].typeName : ""
            }}</span>
            <div>
              <glass />
            </div>
          </div>
          <div class="messTable">
            <div>
              <div>{{ dataMess.length > 0 ? dataMess[4].weight : 0 }}kg</div>
              <div class="frequency">
                +{{ dataMess.length > 0 ? dataMess[4].collectCount : 0 }}
              </div>
            </div>
            <ChartLine
              :color="'rgba(68, 6, 193, 0.4)'"
              class="!w-1/2"
              :data="[3842, 4815, 9452, 3415, 2145, 7482, 9845]"
            />
          </div>
        </el-card>
        <el-card shadow="never" style="margin-top: 10px">
          <p style="margin-bottom: 10px; font-size: 14px">
            {{ t("tag.telType7") }}
          </p>
          <div class="progress">
            <div
              v-for="(item, index) of dataMess"
              :key="index"
              class="progressList"
            >
              <el-progress
                :text-inside="true"
                :stroke-width="17"
                :percentage="item.weightRate"
                :color="item.css"
              />
              <span>{{ item.typeName }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col class="mb-[18px] detail" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card shadow="never">
          <p>{{ t("title.chartTitle") }}</p>
          <LineChart :timeList="timeList" :seriesList="seriesList" />
        </el-card>
      </el-col>
      <el-col class="mb-[18px]" :lg="12" :md="12" :sm="24" :xs="24">
        <el-card shadow="never">
          <p>{{ t("title.deliver") }}</p>
          <div>
            <ul class="tableTab">
              <li>{{ t("content.userMess4") }}</li>
              <li>{{ t("table.name") }}</li>
              <li>{{ t("table.type") }}</li>
              <li>{{ t("title.weight") }}</li>
              <li>{{ t("form.officeType3") }}</li>
              <li>{{ t("form.time") }}</li>
            </ul>
          </div>
          <div class="table-content" style="height: 210px; overflow: hidden">
            <vue3-seamless-scroll
              :list="dataLisp"
              :step="0.5"
              :hoverStop="true"
            >
              <ul>
                <li
                  v-for="(item, index) of dataLisp"
                  :key="index"
                  style="display: flex; align-items: center; height: 30px"
                >
                  <div>{{ item.address }}</div>
                  <div>{{ item.fullName }}</div>
                  <div>{{ item.prdName }}</div>
                  <div>{{ item.weight }}</div>
                  <div>{{ item.unitName }}</div>
                  <div>{{ item.createTime }}</div>
                </li>
              </ul>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import {
  onBeforeUnmount,
  ref,
  onMounted,
  nextTick,
  reactive,
  defineComponent
} from "vue";
import metal from "@/assets/svg/metal.svg?component";
import mess from "@/assets/svg/mess.svg?component";
import plastic from "@/assets/svg/plastic.svg?component";
import textileFabric from "@/assets/svg/textileFabric.svg?component";
import glass from "@/assets/svg/glass.svg?component";
import other from "@/assets/svg/other.svg?component";
import { ChartBar, ChartLine, LineChart } from "./components/charts";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import {
  getRecList,
  getLastWeekRecWeight,
  getStatisticByDate,
  getLastWeekRecDetailByType,
  type messSon
} from "@/api/dataAnalysis";
import { useI18n } from "vue-i18n";

type gatherKMess = {
  carbonReduction: number;
  collectCount: number;
  typeName: string;
  weight: number;
  weightRate: string;
};

const { t } = useI18n();
defineOptions({
  name: "Welcome"
});
defineComponent({
  components: {
    Vue3SeamlessScroll
  }
});
const dataLisp = ref([]);
const collectionVolumeData = reactive({
  time: [],
  weight: []
});
const [dataMess, timeList] = [ref([]), ref([])];
const dataCss = ref([
  "rgba(220, 218, 89, 0.71)",
  "#41b6ff",
  "rgba(233, 59, 73, 0.9)",
  "rgba(7, 152, 55, 0.9)",
  "rgba(68, 6, 193, 0.81)"
]);
const seriesList = ref([]);
const timing = ref(null);
onMounted(() => {
  nextTick(() => {
    clearInterval(timing.value);
    deliverList();
    collectionVolume();
    getMonthlyCollection();
    timing.value = setInterval(() => {
      deliverList();
    }, 5000);
  });
});
onBeforeUnmount(() => {
  clearInterval(timing.value);
});

function deliverList() {
  getRecList().then(res => {
    if (res.status === 10001000) {
      dataLisp.value = res.data;
    }
  });
}

/** 获取近7日内收集总量【The total amount collected on 7 days】 */
function collectionVolume() {
  getLastWeekRecWeight().then(res => {
    if (res.status === 10001000) {
      dataFormat(res.data);
    }
  });
}
function dataFormat(data) {
  let obj = {
    time: [],
    weight: []
  };
  for (let item of data) {
    obj.time.push(item.date);
    obj.weight.push(item.rubbishWeight);
  }
  collectionVolumeData.time = obj.time;
  collectionVolumeData.weight = obj.weight;
}

/** 月内各类收集总量【Total amount of all types collected in a month】 */
function getMonthlyCollection() {
  getStatisticByDate({ dateType: 1 }).then(res => {
    if (res.status === 10001000) {
      let list = res.data.list;
      for (let index in dataCss.value) {
        (list[index] as { css: string }).css = dataCss.value[index];
      }
      dataMess.value = list;
      collectionDetails();
    }
  });
}

/** 获取近日收集明细 【Recent collection details】 */
function collectionDetails() {
  getLastWeekRecDetailByType().then(res => {
    let list = res.data;
    let dataList = [];
    let dateList = [];
    for (let index in list) {
      dateList.push(list[index].date);
      let obj = {};
      try {
        obj = {
          name: dataMess.value[index].typeName,
          data: getData(dataMess.value[index].typeName, list),
          type: "line",
          symbol: "none",
          smooth: true,
          color: dataCss.value[index]
        };
        dataList.push(obj);
      } catch (error) {}
    }
    seriesList.value = dataList;
    timeList.value = dateList;
  });
}

function getWeight(name: string, array: gatherKMess[]) {
  for (let item of array) {
    if (item.typeName === name) {
      return item;
    }
  }
}

function getData(name: string, array) {
  let listWeight = [];
  let obj = {
    time: "",
    typeName: "",
    data: []
  };
  for (let item of array) {
    let list = getWeight(name, item.list);
    listWeight.push(list.weight);
  }
  return listWeight;
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
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
::v-deep .el-col {
  margin: 0;
  margin-bottom: 10px;
}
::v-deep .el-progress {
  width: 68%;
}
.label {
  font-size: 15px;
}
.progress {
  font-size: 15px;
}
.progressList {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.menu {
  display: flex;
  justify-content: space-between;
  > div {
    background-color: rgba(220, 218, 89, 0.201);
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgb(175, 177, 5);
  }
}
.wastePaper {
  display: flex;
  justify-content: space-between;
  > div {
    background-color: rgb(88 152 219 / 44%);
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgb(255, 255, 255);
  }
}
.plastic {
  display: flex;
  justify-content: space-between;
  > div {
    background-color: rgba(233, 59, 73, 0.31);
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgb(255, 255, 255);
  }
}
.textileFabric {
  display: flex;
  justify-content: space-between;
  > div {
    background-color: rgba(7, 152, 55, 0.31);
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgb(255, 255, 255);
  }
}
.glass {
  display: flex;
  justify-content: space-between;
  > div {
    background-color: rgba(68, 6, 193, 0.31);
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    color: rgb(255, 255, 255);
  }
}
.messTable {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  > div {
    width: 100%;
    font-size: 21px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .frequency {
    font-size: 15px;
    color: rgb(34 198 95);
    font-weight: 400;
  }
}
.tableTab {
  display: flex;
  align-items: center;
  > li {
    width: 25%;
    text-align: center;
  }
}
.table-content {
  height: 240px;
  overflow: hidden;
  li {
    width: 100%;
    > div {
      width: 25%;
      text-align: center;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
