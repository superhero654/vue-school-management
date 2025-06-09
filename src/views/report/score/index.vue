<script setup>
import { onMounted } from 'vue'
import * as echarts from 'echarts'
import { queryScoreRankDataApi, queryStudentAverageDataApi } from '@/api/reportScore'

onMounted(() => {
  loadRankChart() 
  loadAverageChart() 
})

const loadRankChart = async () => {
  let result = await queryScoreRankDataApi();
  let rankList = result.data.rankList;
  let dataList = result.data.dataList;

  initRankChart(rankList, dataList)
}

const loadAverageChart = async () => {
  let result = await queryStudentAverageDataApi();
  let averageList = result.data.averageList;
  let dataList = result.data.dataList;

  initAverageChart(averageList, dataList)
}

function initRankChart(rankList, dataList) {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('container1'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: '学生排名统计',
      subText: '',
      textStyle: {
        fontSize: 20
      },
      left: 'center'
    },
    grid:{
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel:true
    },
    tooltip: {},
    xAxis: {
      data: rankList
    },
    yAxis: {},
    series: [
      {
        name: '人数',
        type: 'bar',
        data: dataList,
        itemStyle:{
          // 设置柱状渐变色
          color:new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#ffbf61'
            },
            {
              offset: 1,
              color: '#dd5f85'
            }
          ])
        }
      }
    ]
  });
}

function initAverageChart(averageList, dataList) {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('container2'));
  // 绘制图表
  myChart.setOption({
    title: {
      text: '课程均分统计',
      subText: '',
      textStyle: {
        fontSize: 20
      },
      left: 'center'
    },
    grid:{
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel:true
    },
    tooltip: {},
    xAxis: {
      data: averageList
    },
    yAxis: {},
    series: [
      {
        name: '分数',
        type: 'bar',
        data: dataList,
        itemStyle:{
          // 设置柱状渐变色
          color:new echarts.graphic.LinearGradient(0, 0, 1, 1, [
            {
              offset: 0,
              color: '#ffbf61'
            },
            {
              offset: 1,
              color: '#dd5f85'
            }
          ])
        }
      }
    ]
  });
}

</script>

<template>
  <div class="report_container" id="container1">
    
  </div>

  <div class="report_container" id="container2">
    
  </div>
</template>

<style scoped>
.report_container {
  width: 49%;
  height: 90%;
  float: left;
  margin-left: 5px;
}

#container1 {
  border-right: 1px dashed #ccc;
}
</style>