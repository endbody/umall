<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <list :list="list" @init="init" @edit="edit"></list>
    <v-form :info="info" @init="init" ref="user"></v-form>
  </div>
</template>

<script>
import list from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqMenuListAll, resRolList } from "../../utils/http";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "角色修改"
      },
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
    edit(id) {
      this.info = {
        isShow: true,
        title: "角色编辑"
      };
      this.$refs.user.getOne(id);
    },
  add(){
    this.info = {
      isShow: true,
        title: "角色添加"
    };


  },
  init(){
    resRolList().then(res=>{
      if (res.data.code === 200) {
          this.list = res.data.list?res.data.list:[];
        }
    })
  }
  }
};
</script>

<style>
</style>