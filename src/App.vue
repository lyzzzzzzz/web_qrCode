<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    test() {
      if (this.text == "注册") {
        this.$router.push("/register");
      } else {
        this.$router.push("/login");
      }
    }
  },
  created() {
    let user = localStorage.getItem("user");
    if (!user) {
      this.$message("请登录")
      this.$router.push("/login");
    } 
  }
};
</script>

<style>
html,
body {
  height: 100%;
  box-sizing: border-box;
  width: 100%;
  padding: 0px;
  margin: 0px;
}
#app {
  height: 100%;
}
</style>
