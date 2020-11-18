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
      label="菜单编号"
     >
    </el-table-column>
    <el-table-column
      prop="title"
      label="菜单名称"
     >
    </el-table-column>
    <el-table-column
      prop="icon"
      label="菜单图标">
    </el-table-column>
        <el-table-column
      prop="url"
      label="菜单地址">
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
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</div>
  </div>
</template>

<script>

import {reqMenuDel} from "../../../utils/http"
import {successAlert,errorAlert} from "../../../utils/alert"
import {reqMenuReOne} from "../../../utils/http"


export default {

  mounted(){

  },
data() {
    return {
        
    }
},
props:["list"],
methods:{
  del(id){//删除菜单

this.$confirm('确定删除吗', '删除菜单', {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              reqMenuDel(id).then(res=>{
        if(res.data.code === 200){
          successAlert(res.data.msg);
          this.$emit("getMenu")
        }
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  },
edit(id){
  this.$emit("edit",id)
},



}
}
</script>

<style>

</style>