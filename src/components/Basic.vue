<template>
  <div class="contianer">
    <div class="content" v-if="basicList.length>0">
      <p v-for="item in basicList[0]" :key="item.key" class="p">
        <span style="color:#B9BABC">{{item.name}}</span>
        ：{{item.value}}
      </p>
    </div>
    <div v-else>暂无数据</div>
  </div>
</template>
<script>
export default {
  name: "Basic",
  props: ["code"],
  data() {
    return {
      fabricCode: this.code,
      basicList: []
    };
  },
  watch: {
    code: function(val) {
      this.basicList = [];
      this.fabricCode = val;
      this.getDataList();
    }
  },
  created() {
    if (this.fabricCode) {
      this.getDataList();
    }
  },
  methods: {
    getDataList() {
      let url = `/fabric/info/${this.fabricCode}/basic`;
      this.$get(url)
        .then(res => {
          this.basicList = res.data.fabric.IT_BASIC;
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