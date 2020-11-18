<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <list :list="list" @init="init" @edit="edit"></list>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="2"
      :total="count"
      @current-change="changePage"
    ></el-pagination>

    <v-form :info="info" @init="init" ref="user"></v-form>
  </div>
</template>

<script>
import list from "./components/list.vue";
import vForm from "./components/form.vue";
import { resUserList, reqUserCount } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "管理员添加"
      },
      p: {
        page: 1,
        size: 2
      },
      count:0,
      list: []
    };
  },
  components: {
    list,
    vForm
  },
  mounted() {
    this.init();
  },
  methods: {
    edit(uid) {
      this.info = {
        isShow: true,
        title: "管理员编辑"
      };
      this.$refs.user.getOne(uid);
    },
    add() {
      this.info = {
        isShow: true,
        title: "管理员添加"
      };
    },
    changePage(page) {
      this.p.page = page;
      
       this.Userlist(this.p)
    },
    init() {
      reqUserCount().then(res => {
        if (res.data.code === 200) {
          this.count = res.data.list[0].total;
        }
      });
      this.Userlist()
    },
    Userlist() {
      resUserList(this.p).then(res => {
        if (res.data.code === 200) {
          this.list = res.data.list ? res.data.list : [];
          if(this.p.page>1&&this.list.length==0){
            this.p.page--
             this.Userlist(this.p)
             console.log(1)
          }
        }
      });
    }
  }
};
</script>

<style>
</style>