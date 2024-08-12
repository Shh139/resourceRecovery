<script setup lang="ts">
import { type PropType, ref, computed, watch, onMounted } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  /** 时间 */
  timeList: {
    type: Array as PropType<Array<string>>,
    default: () => []
  },
  seriesList: {
    type: Array as PropType<Array<object>>,
    default: () => []
  },
  heightView: {
    type: Number,
    default: 240
  }
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme
});

function updateChart() {
  setOptions({
    container: ".detail",
    legend: {
      type: "plain",
      show: true
    },
    xAxis: {
      type: "category",
      data: props.timeList,
      axisLabel: {
        fontSize: "0.71rem"
      },
      axisPointer: {
        type: "shadow"
      },
      boundaryGap: false
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "15%",
      bottom: "20px"
    },
    yAxis: {
      show: true,
      type: "value",
      axisLabel: {
        fontSize: "0.71rem"
      },
      splitLine: {
        show: false // 去网格线
      }
    },
    series: props.seriesList
  });
}

onMounted(() => {
  updateChart();
});

watch(
  () => props.timeList,
  newData => {
    updateChart();
  },
  { deep: true }
);
</script>

<template>
  <div
    ref="chartRef"
    :style="{ width: '100%', height: props.heightView + 'px' }"
  />
</template>
