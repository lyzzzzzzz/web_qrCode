<template>
  <div class="container">
    <div class="menu">
      <my-menu @clickItem="clickItem" :menuList="menuList"></my-menu>
    </div>

    <div class="contnent">
      <div class="topBar">
        <div style="width:20%;"></div>
        <div class="middle">
          <i class="el-icon-user-solid"></i>
          <i class="el-icon-download"></i>
          <el-select
            v-model="fabricCode"
            filterable
            remote
            placeholder="请输入布号"
            :remote-method="remoteMethod"
            :loading="loading"
            style="width:200px"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.fabricCode"
              :value="item.fabricCode"
            ></el-option>
          </el-select>
          <!-- <el-button @click="getCodeMsg">搜索</el-button> -->
        </div>

        <div v-if="user" class="config">
          <div>
            <el-badge :value="call" class="item" type="primary">
              <span>{{name}}</span>
            </el-badge>
            <div>
              <span>{{accout}}</span>
            </div>
          </div>
          <div>
            <i class="el-icon-s-operation"></i>
          </div>
        </div>
      </div>
      <div class="componentStyle">
        <keep-alive>
          <component :is="componentItem" :code="fabricCode" style="height:100%"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import myMenu from "../components/Menu";
import Basic from "../components/Basic";
import Price from "../components/Price";
import Prodution from "../components/Prodution";
import Cloth from "../components/Cloth";
export default {
  components: {
    myMenu,
    Basic,
    Price,
    Prodution,
    Cloth
  },
  data() {
    return {
      options: [],
      fabricCode: "",
      loading: false,
      call: "",
      accout: "",
      componentItem: "Basic",
      menuList: [
        {
          id: "1",
          title: "基本",
          text: "Basic"
        },
        {
          id: "2",
          title: "预报价",
          text: "Price"
        },
        {
          id: "3",
          title: "成品库存",
          text: "Prodution"
        },
        {
          id: "4",
          title: "胚布库存",
          text: "Cloth"
        }
      ],
      name: "",
      user: null,
      basicList: []
    };
  },
  methods: {
    clickItem(index) {
      if (!this.fabricCode) {
        this.$message("请选择布号");
      }
      this.componentItem = this.menuList[index - 1].text;
    },
    remoteMethod(value) {
      if (value) {
        let url = "/fabric/search/" + value;
        this.loading = true;
        this.$get(url)
          .then(res => {
            this.options = res.data.list;
            this.loading = false;
          })
          .catch(err => {
            this.$message.error(err);
            this.loading = false;
          });
      }
    }
  },
  created() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.user = user;
      if (user.staffId) {
        this.call = "互太员工";
        this.accout = user.openId;
      } else {
        this.call = "访客";
        this.accout = user.email;
      }
      this.name = user.name;
    }
  }
};
</script>
<style scoped>
body,
html {
  height: 100%;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.config {
  width: 20%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
}
.middle {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.container {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
}
.menu {
  height: 100%;
}
.contnent {
  flex: 1;
  height: 100%;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input {
  width: 30%;
  margin-right: 20px;
}
.topBar {
  width: 100%;
  height: 80px;
  background: burlywood;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.componentStyle {
  flex: 1;
  /* background: #e9eef3; */
  width: 100%;
  margin-top: 5px;
}
.el-icon-user-solid,
.el-icon-download,
.el-icon-s-operation {
  font-size: 30px;
  color: #ffffff;
  margin-right: 100px;
}
.el-icon-s-operation {
  margin-right: 10px;
  margin-left: 30px;
}
</style>