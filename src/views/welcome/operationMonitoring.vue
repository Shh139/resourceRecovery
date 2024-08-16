<template>
  <div>
    <el-row :gutter="10" justify="space-between" align="top">
      <el-col :span="7">
        <el-card shadow="never">
          <div style="margin-bottom: 6px">{{ t("title.doufType1") }}</div>
          <LineChart
            :timeList="timeList"
            :seriesList="partyRate"
            :heightView="130"
          />
        </el-card>
        <el-card shadow="never" class="cardTop">
          <p>{{ t("title.fwjunk") }}</p>
          <div>
            <ul class="tableTab">
              <li>{{ t("table.type") }}</li>
              <li>{{ t("table.orderForGoods6") }}</li>
              <li>{{ t("table.orderForGoods10") }}</li>
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
                  <div>{{ item.rubbishTypeDesc }}</div>
                  <div>{{ item.weight }}kg</div>
                  <div>
                    <img :src="item.imgPath" />
                  </div>
                  <div>{{ item.putTime }}</div>
                </li>
              </ul>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <mapChart />
      </el-col>
      <el-col :span="7">
        <el-card shadow="never">
          <div>{{ t("title.doufType2") }}</div>
          <LineChart
            :timeList="timeList"
            :seriesList="rightRate"
            :heightView="130"
          />
        </el-card>
        <el-card shadow="never" class="cardTop">
          <p>{{ t("title.qtlj") }}</p>
          <div>
            <ul class="tableTab">
              <li>{{ t("table.type") }}</li>
              <li>{{ t("table.orderForGoods6") }}</li>
              <li>{{ t("table.status") }}</li>
              <li>{{ t("table.orderForGoods10") }}</li>
              <li>{{ t("form.time") }}</li>
            </ul>
          </div>
          <div class="table-content" style="height: 210px; overflow: hidden">
            <vue3-seamless-scroll
              :list="dataLisp2"
              :step="0.5"
              :hoverStop="true"
            >
              <ul>
                <li
                  v-for="(item, index) of dataLisp2"
                  :key="index"
                  style="display: flex; align-items: center; height: 30px"
                >
                  <div>{{ item.rubbishTypeDesc }}</div>
                  <div>{{ item.weight }}kg</div>
                  <div>{{ item.cjTypeDesc }}</div>
                  <div>
                    <img :src="item.imgPath" />
                  </div>
                  <div>{{ item.putTime }}</div>
                </li>
              </ul>
            </vue3-seamless-scroll>
          </div>
        </el-card>
      </el-col>
      <el-col :span="17">
        <el-card shadow="never" class="cardTop">
          <div class="quantity">
            <div>
              {{ t("title.recoveryInformation1") }}：<span>{{
                recoveryInformation.userAllCount
              }}</span
              >；
            </div>
            <div>
              {{ t("title.recoveryInformation2") }}：<span>{{
                recoveryInformation.userIfResCount
              }}</span
              >；
            </div>
            <div>
              {{ t("title.recoveryInformation3") }}：<span>{{
                recoveryInformation.joinCount
              }}</span
              >；
            </div>
            <div>
              {{ t("title.recoveryInformation4") }}：<span>{{
                recoveryInformation.partyRate
              }}</span>
            </div>
          </div>
          <div>
            <div class="detail">
              <div class="messTable">
                <div>
                  <div>{{ recoveryInformation.weight }} kg</div>
                  <div class="frequency" style="color: #41b6ff">
                    {{ t("title.kitchenWaste") }}(kg)
                  </div>
                </div>
                <ChartLine
                  color="#41b6ff"
                  class="!w-1/2"
                  :data="[
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber()
                  ]"
                />
              </div>
              <div class="messTable">
                <div>
                  <div>{{ recoveryInformation.partyRate }} %</div>
                  <div class="frequency" style="color: rgba(233, 59, 73, 0.7)">
                    厨余垃圾实时参与率
                  </div>
                </div>
                <ChartLine
                  color="rgba(233, 59, 73, 0.4)"
                  class="!w-1/2"
                  :data="[
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber()
                  ]"
                />
              </div>
              <div class="messTable">
                <div>
                  <div>{{ recoveryInformation.rightRate }} %</div>
                  <div class="frequency" style="color: rgba(7, 152, 55, 0.7)">
                    厨余垃圾实时正确率
                  </div>
                </div>
                <ChartLine
                  color="rgba(7, 152, 55, 0.4)"
                  class="!w-1/2"
                  :data="[
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber()
                  ]"
                />
              </div>
            </div>
            <div class="detail">
              <div class="messTable">
                <div>
                  <div>{{ recoveryInformation2.weight }} kg</div>
                  <div class="frequency" style="color: rgba(233, 59, 73, 0.7)">
                    其他垃圾重量(kg)
                  </div>
                </div>
                <ChartLine
                  color="rgba(233, 59, 73, 0.4)"
                  class="!w-1/2"
                  :data="[
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber()
                  ]"
                />
              </div>
              <div class="messTable">
                <div>
                  <div>{{ recoveryInformation2.partyRate }} %</div>
                  <div class="frequency" style="color: rgba(175, 177, 5, 0.7)">
                    其他垃圾实时参与率
                  </div>
                </div>
                <ChartLine
                  color="rgb(175, 177, 5)"
                  class="!w-1/2"
                  :data="[
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber()
                  ]"
                />
              </div>
              <div class="messTable">
                <div>
                  <div>{{ recoveryInformation2.rightRate }} %</div>
                  <div class="frequency" style="color: rgba(68, 6, 193, 0.7)">
                    其他垃圾实时正确率
                  </div>
                </div>
                <ChartLine
                  color="rgba(68, 6, 193, 0.4)"
                  class="!w-1/2"
                  :data="[
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber(),
                    getRandomNumber()
                  ]"
                />
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card shadow="never" class="cardTop">
          <p>{{ t("title.integralRanking") }}</p>
          <div>
            <ul class="tableTab">
              <li>{{ t("table.areaInfo") }}</li>
              <li>{{ t("table.community") }}</li>
              <li>{{ t("table.user") }}</li>
              <li>{{ t("table.pointExchange3") }}</li>
              <li>{{ t("table.ranking") }}</li>
            </ul>
          </div>
          <div class="table-content" style="height: 120px; overflow: hidden">
            <vue3-seamless-scroll
              :list="pointRankList"
              :step="0.5"
              :hoverStop="true"
            >
              <ul>
                <li
                  v-for="(item, index) in pointRankList"
                  :key="index"
                  :data-index="index"
                  style="display: flex; align-items: center; height: 30px"
                >
                  <div>{{ item.streetName }}</div>
                  <div>{{ item.villageName }}</div>
                  <div>{{ item.username }}</div>
                  <div>{{ item.point }}</div>
                  <div>{{ index + 1 }}</div>
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
  defineComponent,
  ref,
  onMounted,
  nextTick,
  reactive,
  onBeforeUnmount
} from "vue";
import { LineChart, ChartLine, mapChart } from "./components/charts";
import {
  getStatisOfEveryDay,
  getRightRateByDateType2,
  getRubbishList,
  getPointRankList
} from "@/api/dataAnalysis";
import { useI18n } from "vue-i18n";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
const { t } = useI18n();
defineOptions({
  name: "OperationMonitoring"
});
defineComponent({
  components: {
    Vue3SeamlessScroll
  }
});
var recoveryInformation = reactive({
  joinCount: 0,
  errRate: 0,
  lastDate: "",
  otherRate: "",
  partyRate: 0,
  perishRate: "",
  rightRate: 0,
  userAllCount: 0,
  userIfResCount: 0,
  weight: 0,
  yesterdayWeight: ""
});
var recoveryInformation2 = reactive({
  joinCount: 0,
  errRate: 0,
  lastDate: "",
  otherRate: "",
  partyRate: 0,
  perishRate: "",
  rightRate: 0,
  userAllCount: 0,
  userIfResCount: 0,
  weight: 0,
  yesterdayWeight: ""
});

var [timeList, rightRate, partyRate, dataLisp, dataLisp2, pointRankList] = [
  ref([]),
  ref([]),
  ref([]),
  ref([]),
  ref([]),
  ref([])
];
var timing = ref(null);
onMounted(() => {
  nextTick(() => {
    clearInterval(timing.value);
    deliverList();
    timing.value = setInterval(() => {
      getStatisOfEveryDay({ rubbishType: 0 }).then(res => {
        if (res.code === "200") {
          Object.assign(recoveryInformation, res.result);
        }
      });
      getStatisOfEveryDay({ rubbishType: 1 }).then(res => {
        if (res.code === "200") {
          Object.assign(recoveryInformation2, res.result);
        }
      });
    }, 5000);
  });
});
onBeforeUnmount(() => {
  clearInterval(timing.value);
});

const deliverList = () => {
  const data = {
    dateType: 1
  };
  getRightRateByDateType2(data).then(res => {
    if (res.status === 10001000) {
      const list = res.data.dtoList;
      console.log(list);
      let time = [];
      let partyRateList = [];
      let rightRateList = [];
      for (let item of list) {
        time.push(item.date.slice(-4));
        partyRateList.push(item.partyRate);
        rightRateList.push(item.rightRate);
      }
      partyRate.value = [
        {
          data: partyRateList.reverse(),
          type: "line",
          symbol: "circle",
          smooth: true,
          label: {
            show: true,
            fontFamily: "serig",
            formatter: "{c}%"
          },
          color: "rgba(65, 182, 255, 0.1)",
          areaStyle: {
            opacity: 1,
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: "linear",
              global: false,
              colorStops: [
                {
                  offset: 0,
                  color: `rgba(65, 182, 255, 0.5)`
                },
                {
                  offset: 0.8,
                  color: "rgba(65, 182, 255, 0.1)"
                }
              ]
            },
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          }
        }
      ];
      rightRate.value = [
        {
          data: rightRateList.reverse(),
          type: "line",
          symbol: "circle",
          smooth: true,
          label: {
            show: true,
            fontFamily: "serig",
            formatter: "{c}%"
          },
          color: "rgba(7, 152, 55, 0.1)",
          areaStyle: {
            opacity: 1,
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              type: "linear",
              global: false,
              colorStops: [
                {
                  offset: 0,
                  color: `rgba(7, 152, 55, 0.5)`
                },
                {
                  offset: 0.8,
                  color: "rgba(7, 152, 55, 0.1)"
                }
              ]
            },
            shadowColor: "rgba(0, 0, 0, 0.1)",
            shadowBlur: 10
          }
        }
      ];
      timeList.value = time.reverse();
    } else {
      console.log(res.msg);
    }
  });

  // 获取订单信息
  getRubbishList({ rubbishType: 0 }).then(res => {
    if (res.code === "200") {
      dataLisp.value = res.result;
    }
  });
  getRubbishList({ rubbishType: 1 }).then(res => {
    if (res.code === "200") {
      dataLisp2.value = res.result;
    }
  });
  getPointRankList().then(res => {
    if (res.code === "200") {
      pointRankList.value = res.result;
    }
  });
  getStatisOfEveryDay({ rubbishType: 0 }).then(res => {
    if (res.code === "200") {
      Object.assign(recoveryInformation, res.result);
    }
  });
  getStatisOfEveryDay({ rubbishType: 1 }).then(res => {
    if (res.code === "200") {
      Object.assign(recoveryInformation2, res.result);
    }
  });
};
let getRandomNumber = () => {
  return Math.floor(Math.random() * 1000) + 1;
};
</script>

<style lang="scss" scoped>
::v-deep .el-row {
  width: 100%;
}
::v-deep .el-card__body {
  width: 100%;
}
.cardTop {
  margin-top: 7px;
}
.detail {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.messTable {
  width: 25%;
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
    font-size: 14px;
    color: rgb(34 198 95);
    font-weight: 400;
  }
}
.tableTab {
  display: flex;
  align-items: center;
  > li {
    width: 25%;
    font-size: 14px;
    text-align: center;
  }
}
.table-content {
  height: 240px;
  overflow: hidden;
  li {
    width: 100%;
    font-size: 12px;
    > div {
      width: 25%;
      text-align: center;
      // font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.quantity {
  display: flex;
  align-items: center;
  font-size: 15px;
  span {
    font-weight: 600;
  }
}
</style>
