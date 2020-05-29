<template>
  <div class="content">
    <el-row class="tac">
      <el-col class="elcol">
        <el-menu
          :default-active="menuList[0].id"
          class="el-menu-vertical-demo"
          @select="clickItem"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <div v-for="item in menuList" :key="item.id">
            <el-menu-item :index="item.id">
              <i class="el-icon-setting"></i>
              <span slot="title">{{item.id}}:</span>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "my-menu",
  props: ["menuList"],
  methods: {
    clickItem(index, indexPath) {
      this.$emit("clickItem", index, indexPath);
      //  console.log(index, indexPath);
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

.el-menu-vertical-demo,
.tac,
.elcol,
.content {
  height: 100%;
}

.elcol {
  width: 200px;
}
</style>