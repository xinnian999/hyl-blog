import ReactECharts from "echarts-for-react";
import { useState } from "react";

export default function Echarts() {
  const [chartType, setChartType] = useState("bar"); // 初始化为柱状图

  const barOption = {
    xAxis: {
      data: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    },
    yAxis: {},
    series: [
      {
        type: "bar",
        data: [5, 2, 4, 9, 8, 6, 1, 10, 3, 7],
        // 将数据按照从大到小排序
        encode: {
          x: "data",
          y: "value",
        },
        seriesLayoutBy: "row",
        itemStyle: {
          color: "#f44336",
        },
        emphasis: {
          itemStyle: {
            color: "#c62828",
          },
        },
      },
    ],
    // 对数据进行排序
    dataset: {
      sort: {
        // 按照第一列数据从大到小排序
        ascend: false,
        dim: 0,
      },
    },
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
