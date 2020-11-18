<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <list @edit="edit"></list>
    <v-form :info="info" ref="cate"></v-form>
  </div>
</template>

<script>
import list from "./components/list.vue";
import vForm from "./components/form.vue";

export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "商品分类添加"
      }
    };
  },
  components: {
    list,
    vForm
  },
  methods: {
    edit(id) {
      this.info = {
        isShow: true,
        title: "商品分类编辑"
      };
  this.$refs.cate.getOne(id)
    },
    add() {
      this.info = {
        isShow: true,
        title: "商品分类添加"
      };
    }

  }
};
</script>

<style>
</style>