<template>
  <div class="contianer">
    <div class="content" v-if="clothList.length>0">
      <p v-for="item in clothList[currentPage-1]" :key="item.key" class="p">
        <span style="color:#B9BABC">{{item.name}}</span>
        ：{{item.value}}
      </p>
    </div>
    <div v-else>暂无数据</div>
    <div class="pagination" v-if="clothList.length>0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="clothList.length"
        :page-size="1"
        style="paddingRight:0px"
        :current-page="currentPage"
        @next-click="pageChange"
        @prev-click="pageChange"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import {addReadRecord} from "../common/addReadRecord.js"
export default {
  name: "Cloth",
  props: ["code"],
  data() {
    return {
      fabricCode: this.code,
      clothList: [],
      currentPage: 1
    };
  },
  watch: {
    code: function(val) {
      this.clothList = [];
      this.fabricCode = val;
      this.getDataList();
    }
  },
  methods: {
    getDataList() {
      let url = `/fabric/info/${this.fabricCode}/sem`;
      this.$get(url)
        .then(res => {
          this.clothList = res.data.fabric.IT_SEMPRODUCTSTOCK;
           if (this.clothList.length > 0) {
             addReadRecord(this.fabricCode)
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    pageChange(currentPage) {
      this.currentPage = currentPage;
    }
  },
  created() {
    if (this.fabricCode) {
      this.getDataList();
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
.pagination {
  margin: 20px auto 0 auto;
  width: 95%;
  text-align: right;
}
</style>