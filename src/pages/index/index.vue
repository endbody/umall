<template>
  <div>
    <el-container class="box">
      <el-aside width="200px">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/vip">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->



<!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>






        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="user">
           欢迎您， <i style="color:red">{{userInfo.username}}</i>
           <el-button type="primary" @click="outLogin">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb separator="/" v-if="$route.path !== '/'">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userInfo:"userInfo"
    })
  },
  methods: {
    ...mapActions({
     changeUser:"changeUser"
    }),
    outLogin(){
this.changeUser({})
this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.box {
  width: 100vw;
  height: 100vh;
}

.el-aside {
  background-color: #20222a;
}

.el-header {
  background-color: #b3c0d1;
}

.main {
  padding: 20px;
}

.user{
  float: right;
  line-height: 60px;
}


</style>
