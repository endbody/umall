<template>
  <div>
     <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column
      prop="id"
      label="角色编号"
     >
    </el-table-column>
    <el-table-column
      prop="rolename"
      label="角色名称"
     >
    </el-table-column>

        <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="scope">
        <div>
            <el-button type="primary" v-if="scope.row.status===1" >启用</el-button>
            <el-button type="info" v-else >禁用</el-button>

        </div>
      </template>
    </el-table-column>
        <el-table-column
      label="操作">
        <template slot-scope="scope">
        <div>
            <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
            <del-btn @confirm = "del(scope.row.id)"></del-btn>
        </div>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

import {resRolDel} from "../../../utils/http"
import {successAlert} from "../../../utils/alert"


export default {
props:["list"],
methods:{
  del(id){
  resRolDel(id).then(res=>{
    if(res.data.code===200){
      successAlert(res.data.msg);
      this.$emit("init")
    }
  })
  },
  edit(id){
    this.$emit("edit",id)
  }
}
}
</script>

<style>

</style>