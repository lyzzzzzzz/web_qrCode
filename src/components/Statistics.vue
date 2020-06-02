<template>
  <div class="containe">
    <div class="bar">
      <div class="topBar">
        <div>
          <span style="color:white;fontSize:14px">活跃度：</span>
          <el-select v-model="activeVal" placeholder="请选择" class="select" @change="activeChange">
            <el-option
              v-for="item in activeOption"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <span style="color:white;fontSize:14px">选择时间:</span>
          <el-select v-model="timeVal" placeholder="请选择" class="select" @change="timeSelectChange">
            <el-option
              v-for="item in timeOption"
              :key="item.id"
              :label="item.text"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="bottomBar">
        <div>
          <el-date-picker v-model="startDate" type="date" placeholder="选择日期" class="date"></el-date-picker>
        </div>
        <div>
          <img src="../assets/statistics/date_arrows.png" class="img" />
        </div>
        <div>
          <el-date-picker v-model="endDate" type="date" placeholder="选择日期" class="date"></el-date-picker>
        </div>
      </div>
    </div>
    <div ref="main" class="chart"></div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="staticList.length"
      :page-size="1"
      @next-click="pageChange"
      @prev-click="pageChange"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  name: "Statistics",
  data() {
    const monthFirstDay = new Date();
    monthFirstDay.setDate(1);
    let startDate = monthFirstDay.format("YYYY-MM-dd");
    const today = new Date();
    today.setDate(today.getDate());
    let endDate = today.format("YYYY-MM-dd");
    return {
      activeVal: "搜索次數",
      activeOption: [
        {
          id: 1,
          value: "搜索次數"
        },
        {
          id: 2,
          value: "查詢時長"
        }
      ],
      timeOption: [
        {
          id: 1,
          text: "近一周"
        },
        {
          id: 2,
          text: "近一月"
        },
        {
          id: 3,
          text: "近一年"
        }
      ],
      timeVal: "",
      startDate: startDate,
      endDate: endDate,
      selectActiveId: 1,
      selectTimeId: 1,
      staticList: [],
      staticIndex: 0,
      legend: ["搜索次數", "查詢時長(分鐘)"]
    };
  },
  methods: {
    pageChange(currentPage) {
      this.staticIndex = currentPage - 1;
      this.setChart();
    },
    getDataList() {
      let url =
        "/statistic/list/" +
        this.selectActiveId +
        "/" +
        this.startDate +
        "/" +
        this.endDate;
      this.$get(url)
        .then(res => {
          let list = res.data.list;
          if (list.length > 0) {
            let codeList = [];
            let num = Math.ceil(list.length / 10);
            for (let i = 0; i < num; i++) {
              codeList.push(list.slice(i * 10, i * 10 + 10));
            } //每十條數據一組
            // this.codeList = codeList
            let tempList = [];
            for (let i = 0; i < codeList.length; i++) {
              let yAxis = [];
              let times = [];
              let duration = [];
              let obj = new Object();
              for (let y = 0; y < codeList[i].length; y++) {
                yAxis.push(codeList[i][y].fabricCode);
                times.push(codeList[i][y].times);
                duration.push(codeList[i][y].duration);
              }
              obj.yAxis = yAxis.reverse();
              obj.times = times.reverse();
              obj.duration = duration.reverse();
              tempList.push(obj);
            }
            this.staticList = tempList;
            this.setChart();
          }
        })
        .catch({});
    },
    activeChange(val) {
      this.selectActiveId = val;
    },
    timeSelectChange(val) {
      this.selectTimeId = val;
    },
    setChart() {
      const echarts = require("echarts");
      let myChart = echarts.init(this.$refs.main);
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          show: false
        },
        legend: {
          data: this.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "8%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: "category",
          data: this.staticList[this.staticIndex].yAxis
        },
        series: [
          {
            name: this.legend[0],
            type: "bar",
            data: this.staticList[this.staticIndex].times,
            label: {
              normal: {
                show: true
              }
            }
          },
          {
            name: this.legend[1],
            type: "bar",
            data: this.staticList[this.staticIndex].duration,
            label: {
              normal: {
                show: true
              }
            }
          }
        ]
      });
    }
  },
  created() {
    this.getDataList();
  }
};
</script>
<style scoped>
.containe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.chart {
  width: 100%;
  height: 650px;
  margin-top: 30px;
}
.topBar {
  width: 100%;
  height: 50%;
  background: #2d3e83;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px 0px 50px;
  box-sizing: border-box;
}
.bottomBar {
  width: 100%;
  height: 50%;
  background: white;
  border-radius: 0px 0px 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 50px 0px 50px;
  box-sizing: border-box;
}
.bar {
  width: 100%;
  height: 90px;
  box-shadow: 0px 0px 5px #b9babc;
  border-radius: 10px;
}
.img {
  width: 40px;
  height: 40px;
}
</style>
<style >
.select .el-input__inner {
  border: 0px;
  background: none;
  width: 100px;
  color: #ffffff;
}
.select .el-input__inner::-webkit-input-placeholder {
  color: #ffffff;
}
.select .el-input .el-select__caret {
  color: #ffffff;
}
</style>