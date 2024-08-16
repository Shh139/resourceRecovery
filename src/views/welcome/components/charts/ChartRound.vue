<script setup lang="ts">
import { ref, computed } from "vue";
import { useDark, useECharts } from "@pureadmin/utils";

const { isDark } = useDark();

const theme = computed(() => (isDark.value ? "dark" : "light"));

const chartRef = ref();
const { setOptions } = useECharts(chartRef, {
  theme
});

setOptions({
  legend: {
    show: false
  },
  xAxis: [
    {
      show: false
    }
  ],
  yAxis: [
    // 横向 进度条 顶部数字
    {
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false, // 隐藏
        color: "#ffffff",
        fontSize: "16"
      },
      data: ["5"]
    }
  ],
  // 圆形进度条 标题
  title: {
    text: 50 + "%",
    left: "16%",
    top: "29%",
    itemGap: 0,
    textStyle: {
      color: "#000",
      fontSize: "20",
      fontWeight: 600
    }
  },
  angleAxis: {
    max: 100,
    // 隐藏刻度线
    show: false,
    startAngle: 90
  },
  radiusAxis: {
    type: "category",
    show: true,
    axisLabel: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  },
  polar: {
    // radius: '120%', //图形大小
    radius: ["50%", "60%"], // 大小
    center: ["30%", "40%"] // 位置
  },
  series: [
    {
      type: "bar",
      data: [50],
      showBackground: true,
      roundCap: true,
      // 圆环 进度条背景颜色
      backgroundStyle: {
        color: "rgb(213,217,219,0.4)"
      },
      coordinateSystem: "polar",
      barWidth: 20,
      itemStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#bc7bf8" // 渐变起始颜色
            },
            {
              offset: 1,
              color: "#bc7bf8" // 渐变结束颜色
            }
          ],
          global: false
        },
        shadowBlur: 2,
        shadowColor: "#7846e5",
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
    }
  ]
});
</script>
<template>
  <div ref="chartRef" style="width: 100%; height: 120px" />
</template>
