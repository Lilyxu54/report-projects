<template>
  <div id="app">
    <div class="header">
      <el-row :gutter="21">
        <el-col :span="4" style="background: #0E90FE !important;">
          <div class="grid-content bg-purple title">瑞蒙特后台管理系统</div>
        </el-col>
        <el-col :span="20" style="background: #FFFFFF;">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>
    <div class="leftnav">
      <el-row :gutter="25">
        <el-col :span="4" class="leftnavleft">
          <div class="grid-content bg-purple">
            <el-row class="tac">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
              >
                <router-link to="/">
                  <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">报告管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/airQuality">
                  <el-menu-item index="2">
                    <i class="el-icon-document"></i>
                    <span slot="title">空气质量报送管理</span>
                  </el-menu-item>
                </router-link>
                <router-link to="/WorkNews">
                  <el-menu-item index="3">
                    <i class="el-icon-setting"></i>
                    <span slot="title">工作指导信息管理</span>
                  </el-menu-item>
                </router-link>
              </el-menu>
            </el-row>
          </div>
        </el-col>
        <el-col :span="20" style="height: 100%;">
          <div class="grid-content bg-purple" style>
            <router-view />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getreport } from "@/request/api";
import { citylist } from "@/request/api";
export default {
  data() {
    return {
      namess:'111'
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    //   async  getComments() {
    //   let data = await getreport();
    //   console.log(data);
    //   console.log(this.namess)
    // }
  },
  created() {
    // this.getComments();
 
  }
};
</script>

<style lang="less">
a {
  text-decoration: none;
}
.el-row {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
.el-col-4 {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.el-row:last-child,
.el-col-4,
.grid-content,
.el-col-15 {
  height: 100%;
}
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #f1f3f4;
}

.el-menu-item * {
  color: #ffffff;
}

.header .title {
  color: #fff;
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}

.leftnav {
  height: 90%;
}

.tac,
.el-menu {
  height: 100%;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
