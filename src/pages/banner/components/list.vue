<template>
  <div>
    <el-table
      :data="list?list:[]"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope" v-if="scope.row.img" >
          <img width="80" height="80"  :src="$img+scope.row.img" alt="">
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <del-btn @confirm="del(scope.row.id)"></del-btn>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqBannerDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";

export default {

  computed: {
    ...mapGetters({
      list:"banner/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqList"
    }),
    del(id) {
      reqBannerDel(id).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.reqList();
        }
      });
    },
    edit(id) {
      this.$emit("edit", id);
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style>
</style>