<template>
  <div>
    <el-button type="primary" @click="add()">添加</el-button>
    <list @edit="edit"></list>
    <el-pagination background layout="prev, pager, next" :total="count" :page-size="size" @current-change="changPage" ></el-pagination>

    <v-form :info="info" ref="cate"></v-form>
  </div>
</template>

<script>
import list from "./components/list.vue";
import vForm from "./components/form.vue";
import {mapActions,mapGetters} from "vuex"

export default {
  computed:{
    ...mapGetters({
      count:"specs/count",
      size:"specs/size"
    })
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "商品规格添加"
      }
    };
  },
  components: {
    list,
    vForm
  },
  methods: {
    ...mapActions({
      reqCount:"specs/reqCount",
      changPage:"specs/changPages"
    }),
    edit(id) {
      this.info = {
        isShow: true,
        title: "商品规格编辑"
      };
      this.$refs.cate.getOne(id);
    },
    add() {
      this.info = {
        isShow: true,
        title: "商品规格添加"
      };
    }
  },
  mounted(){
    this.reqCount()
  }
};
</script>

<style>
</style>