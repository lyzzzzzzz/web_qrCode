<template>
  <div class="container">
    <div class="form">
      <div class="logobar">
        <img src="../assets/login/logo.png" class="logo" />
        <div style="spanBar">
          <span style="fontSize:18px;fontWeight:bold;display:block;">欢迎来到互太纺织</span>
          <span style="color:#B9BBBE;fontSize:14px;display:block;marginTop:10px">员工登入</span>
        </div>
      </div>
      <div style="marginTop:40px">
        <el-input placeholder="请输入互太员工工号" v-model="account">
          <template slot="prepend">账号</template>
        </el-input>
        <el-input placeholder="请输入密码" show-password v-model="password" style="marginTop:20px">
          <template slot="prepend">密码</template>
        </el-input>
      </div>
      <el-button style="width:100%;marginTop:40px" @click="staffLogin">互太员工登录</el-button>
    </div>
  </div>
</template>

<script>
import { encryptedData } from "@/services/encrypted.js";
export default {
  components: {},
  data() {
    return {
      account: "",
      password: ""
    };
  },
  methods: {
    staffLogin() {
      localStorage.removeItem("token");
      if (!this.account) {
        this.$message("请填写账号");
        return;
      }
      if (!this.password) {
        this.$message("请填写密码");
        return;
      }
      let password = encryptedData(this.password);
      let url = "/security/loginStaff/" + this.account;
      this.$post(url, password, { headers: { deviceOS: "web" } })
        .then(res => {
          localStorage.setItem("token", res.data.bearerToken);
          let user = JSON.stringify(res.data.user);
          localStorage.setItem("user", user);
          this.$message.success(res.msg);
          this.$router.replace("/");
        })
        .catch(err => {
          this.$message.error(err);
        });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
.form {
  width: 400px;
  height: 500px;
  background: #ffffff;
  box-shadow: 0px 0px 5px #b9bbbe;
  padding: 20px;
}
.logo {
  width: 70px;
  height: 70px;
  border-radius: 55px;
  margin-right: 10px;
}
.logobar {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.spanBar {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>