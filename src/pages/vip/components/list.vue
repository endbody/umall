<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>

      <el-table-column prop="phone" label="手机号">
      
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
            <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { reqSpecsDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";

export default {

  computed: {
    ...mapGetters({
      list:"vip/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "vip/reqList",
    }),

    edit(uid) {
      this.$emit("edit", uid);
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style>
</style>