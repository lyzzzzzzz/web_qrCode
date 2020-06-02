<template>
  <div class="contianer">
    <div class="content" v-if="priceList.length>0">
      <p v-for="item in priceList[0]" :key="item.key" class="p">
        <span v-if="item.key!='SD028'">
          <span style="color:#B9BABC">{{item.name}}</span>
          ：{{item.value}}
        </span>
      </p>
      <div class="table">
        <div style="marginRight:10px">工艺号</div>
        <div>工艺描述</div>
      </div>
      <div v-for="(list,index) in priceList[1]" :key="index" class="rowLi">
        <span style="paddingRight:20px">{{list[0].value}}</span>
        <span>{{list[1].value}}</span>
      </div>
    </div>
    <div v-else>暂无数据</div>
  </div>
</template>
<script>
import { addReadRecord } from "../common/addReadRecord.js";
export default {
  name: "Price",
  props: ["code"],
  data() {
    return {
      priceList: [],
      fabricCode: this.code
    };
  },
  watch: {
    code: function(val) {
      this.getDataList(val);
    }
  },
  created() {
    if (this.fabricCode) {
      this.getDataList(this.fabricCode);
    }
  },
  methods: {
    getDataList(fabricCode) {
      this.priceList = [];
      this.fabricCode = fabricCode;
      let url = `/fabric/info/${fabricCode}/price`;
      this.$get(url)
        .then(res => {
          let priceList = res.data.fabric.IT_PRICE;
          priceList[0].forEach(item => {
            if (item.key == "SD028") {
              priceList.push(item.value);
            }
          });
          this.priceList = priceList;
          if (this.priceList.length > 0) {
            addReadRecord(this.fabricCode);
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>
<style scoped>
.contianer {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  box-sizing: border-box;
}
.table {
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}
.rowLi {
  color: #b9babc;
  font-size: 14px;
  margin-top: 5px;
}
.content {
  width: 95%;
  height: 700px;
  background: #ffffff;
  box-shadow: 0px 0px 5px #dbdcde;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  margin: 20px auto 0 auto;
  box-sizing: border-box;
}
.p {
  word-break: break-all;
  word-wrap: break-word;
  width: 200px;
  margin: 0px;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>