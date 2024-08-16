<!-- 红黑榜 -->
<template>
  <div>
    <el-row :gutter="10" justify="space-between" align="top">
      <el-col :span="7">
        <el-card shadow="never">
          <p>{{ t("title.participateIn") }}</p>
          <div>
            <ChartBarAdditional
              :timeData="collectionVolumeData.time"
              :requireData="collectionVolumeData.weight"
              css="#3cc5a3"
            />
          </div>
        </el-card>
        <el-card shadow="never" style="margin-top: 10px">
          <p>{{ t("title.grossDeliveryWeight") }}</p>
          <ChartBarAdditional
            :timeData="collectionVolumeData.time"
            :requireData="collectionVolumeData.weight"
          />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="never">
          <div class="message">
            <div>
              <div class="c" style="color: #e18431">12</div>
              <div>{{ t("title.headcount") }}</div>
            </div>
            <div>
              <div class="c" style="color: #f04e4d">13</div>
              <div>{{ t("title.residentPopulation") }}</div>
            </div>
            <div>
              <div class="c" style="color: #3cc5a3">134</div>
              <div>{{ t("title.foodWasteDisposal") }}</div>
            </div>
            <div>
              <div class="c" style="color: #9b9b9b">41</div>
              <div>{{ t("title.otherPlacement") }}</div>
            </div>
          </div>
        </el-card>
        <div class="messList">
          <div class="table-held">
            <div style="background-color: rgba(240, 78, 77, 0.4)">红榜</div>
            <div style="background-color: rgba(240, 78, 77, 0.4)">正确率</div>
            <div style="background-color: rgba(91, 91, 91, 0.4)">黑榜</div>
            <div style="background-color: rgba(91, 91, 91, 0.4)">正确率</div>
          </div>
          <div class="table-content" style="height: 268px; overflow: hidden">
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
        </div>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never">
          <p>{{ t("title.recentDeliveryRate") }}</p>
          <LineChart
            :timeList="timeList"
            :seriesList="seriesList"
            :heightView="148"
          />
        </el-card>
        <el-card shadow="never" style="margin-top: 10px">
          <p>{{ t("title.recentAccuracyRate") }}</p>
          <LineChart
            :timeList="timeList"
            :seriesList="seriesList"
            :heightView="148"
          />
        </el-card>
      </el-col>
      <!-- <el-col :span="12">
        <el-card shadow="never">
          <p>{{ t("title.dailyGrossWeight") }}</p>
          <div class="round">
            <div>
              <div>
                <div>12</div>
                <div>总重量</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <p>{{ t("title.otherGrossWeight") }}</p>
          <div class="round">
            <div>
              <div>
                <div>12</div>
                <div>总重量</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col> -->
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
import { ChartBarAdditional, LineChart, ChartRound } from "./components/charts";
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
  name: "RedAndBlackList"
});
// defineComponent({
//   components: {
//     Vue3SeamlessScroll
//   }
// });
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
.messList {
  padding: 0px;
  background-color: #fff;
  margin-top: 10px;
}
.label {
  font-size: 15px;
}
.progress {
  font-size: 15px;
}
.table-held {
  display: flex;
  align-items: center;
  div {
    width: 25%;
    text-align: center;
    font-weight: 600;
    padding: 10px;
    color: #fff;
  }
}
.message {
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    .c {
      font-weight: 600;
      font-size: 30px;
    }
  }
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
p {
  font-size: 14px;
}
.round {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 9px;
  div {
    width: 200px;
    height: 90px;
    border: 1px solid #ccc;
    overflow: hidden;
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
