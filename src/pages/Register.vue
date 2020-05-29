<template>
  <div class="container">
    <h2>注册页面</h2>
    
  </div>
</template>

<script>
export default {
 components:{
  },
  data() {
    return {
      msg:""
    }
  },
  methods: {
    logMsg(){
      console.log(this.msg);
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
}
</style>