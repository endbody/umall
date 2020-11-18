<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <list :list="list" @getMenu="getMenu()" @edit="edit($event)"></list>
    <detail :info="info" @getMenu="getMenu()" ref="form" :list="list" ></detail>
  </div>
</template>

<script>
import list from "./components/list.vue";
import detail from "./components/detail.vue";
import { reqMenuListAll } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "添加菜单",
      },
      form: {
        name: ""
      },
      list: []
    };
  },
  components: {
    list,
    detail
  },
  mounted() {
    this.getMenuData();
  },
  methods: {
    add() {
      this.info.isShow = true;
      this.info.title = "添加菜单";
      this.getMenu()
    },
    getMenuData() {
      reqMenuListAll().then(res => {
        if(res.data.list){
        this.list = res.data.list;
        }else{
          this.list = [];
        }
      });
    },
    getMenu(){
      console.log(this.list)
      this.getMenuData()
    },
    edit(id){
      this.info.title = "编辑菜单"
      this.info.isShow = true;
      this.$refs.form.getOne(id)
    }
  }
};
</script>

<style>
</style>