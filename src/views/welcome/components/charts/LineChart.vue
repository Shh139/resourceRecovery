<script setup lang="ts">
import { type PropType, ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
  data: {
    type: Array as PropType<Array<Array<number>>>,
    default: () => []
  },
  color: {
    type: Array as PropType<Array<string>>,
    default: () => []
  }
});

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme
});

setOptions({
  container: ".detail",
  legend: {
    type: "plain",
    show: true
  },
  xAxis: {
    type: "category",
    data: ["07/18", "07/19", "07/20", "07/21", "07/22", "07/23", "07/24"],
    axisLabel: {
      fontSize: "0.875rem"
    },
    axisPointer: {
      type: "shadow"
    }
  },
  grid: {
    left: "10%",
    top: "10%",
    bottom: "20px"
  },
  yAxis: {
    show: true,
    type: "value",
    axisLabel: {
      fontSize: "0.875rem"
    },
    splitLine: {
      show: false // 去网格线
    }
  },
  series: [
    {
      name: t("tag.telType1"),
      data: props.data[0],
      type: "line",
      symbol: "none",
      smooth: true,
      color: props.color[0]
    },
    {
      name: t("tag.telType2"),
      data: props.data[1],
      type: "line",
      symbol: "none",
      smooth: true,
      color: props.color[1]
    },
    {
      name: t("tag.telType3"),
      data: props.data[2],
      type: "line",
      symbol: "none",
      smooth: true,
      color: props.color[2]
    },
    {
      name: t("tag.telType4"),
      data: props.data[3],
      type: "line",
      symbol: "none",
      smooth: true,
      color: props.color[3]
    },
    {
      name: t("tag.telType5"),
      data: props.data[4],
      type: "line",
      symbol: "none",
      smooth: true,
      color: props.color[4]
    }
  ]
});
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 240px" />
</template>
