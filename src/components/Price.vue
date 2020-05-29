<template>
  <div>预报价：{{code}}</div>
</template>
<script>
export default {
  name: "Price",
  props: ["code"],
  data() {
    return {
      priceList:[],
      fabricCode:""
    }
  },
  //  watch: {
  //   code: function(val) {
  //     this.priceList = [];
  //     this.fabricCode = val;
  //     let url = `/fabric/info/${val}/price`;
  //     this.$get(url)
  //       .then(res => {
  //         this.priceList = res.data.fabric.IT_PRICE;
  //         console.log("priceList:",  this.priceList);
  //       })
  //       .catch(err => {
  //         this.$message.error(err);
  //       });
  //   }
  // }
};
</script>