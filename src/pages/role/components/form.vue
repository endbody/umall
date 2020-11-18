<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="150px">
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="150px">
          <el-tree
            :data="MenuList"
            show-checkbox
            node-key="id"
            :props="{children: 'children',label: 'title'}"
            ref="tree"
          ></el-tree>
        </el-form-item>

        <el-form-item label="角色权限" label-width="150px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-model="user.status" @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="update()" v-if="info.title=='角色编辑'">编 辑</el-button>
        <el-button type="primary" @click="add()" v-else>确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  resRolAdd,
  reqRolDetail,
  reqMenuListAll,
  reqRolEdit
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1
      },
      MenuList: []
    };
  },
  props: ["info"],
  methods: {
    getOne(id) {
      reqRolDetail(id).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
          this.user.id = id;
        }
      });
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    Alter() {
      this.info.isShow = false;
    },
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      resRolAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.$emit("init");
        }
      });
    },

    closed(){
      console.log(1)
      if(this.info.title === "角色编辑"){
        this.empty()
      }
    },

    update() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());

      reqRolEdit(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.$emit("init")
        }
      });
    },

    init() {
      reqMenuListAll().then(res => {
        if (res.data.code === 200) {
          this.MenuList = res.data.list;
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>