import ReactECharts from "echarts-for-react";
import { useState } from "react";

export default function Echarts() {
  const [chartType, setChartType] = useState("bar"); // 初始化为柱状图

  const barOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["用量", "余量"],
    },
    xAxis: [
      {
        type: "category",
        data: ["CPU", "CPU超分"],
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "核",
      },
    ],
    series: [
      {
        name: "余量",
        type: "bar",
        stack: "CPU",
        barWidth: 100,
        label: {
          show: true,
        },
        data: [95000, 87000],
      },
      {
        name: "用量",
        type: "bar",
        stack: "CPU",
        barWidth: 100,
        itemStyle: {
          normal: {
            color: "rgba(180, 180, 180, 0.8)",
          },
        },
        label: {
          show: false,
        },
        data: [24000, 20000],
      },
      {
        name: "总量",
        type: "custom",
        renderItem() {
          return {
            type: "rect",
          };
        },
        data: [100000, 90000],
      },
    ],
  };

  const pieOption = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: 10,
      data: ["直达", "营销广告", "搜索引擎"],
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 335, name: "直达" },
          { value: 310, name: "营销广告" },
          { value: 234, name: "搜索引擎" },
        ],
      },
    ],
  };

  const handleChartClick = (params) => {
    console.log(params);

    if (chartType === "bar") {
      setChartType("pie");
    } else {
      setChartType("bar");
    }
  };

  const currentOption = chartType === "bar" ? barOption : pieOption; // 动态选择当前显示的选项

  return (
    <ReactECharts
      option={currentOption}
      style={{ height: "400px" }}
      onEvents={{
        click: handleChartClick, // 绑定click事件
      }}
    />
  );
}
