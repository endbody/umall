<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="user">
     
        <el-form-item label="所属角色" label-width="150px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option  
            :value="item.id"
             v-for="item in UserList"
             :key="item.id"
             :label="item.rolename"
            ></el-option>
          </el-select>
        </el-form-item>

           <el-form-item label="用户名" label-width="150px">
          <el-input v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>

               <el-form-item label="密码" label-width="150px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-model="user.status" @click="info.isShow = false">取 消</el-button>

        <el-button type="primary" @click="add()" v-if="info.title=='管理员添加'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>修 改</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqUserAdd,
  resUserUpdate,
  resRolList,
  resUserDetail,
  
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password:"",
        status: 1
      },
      UserList: []
    };
  },
  props: ["info"],
  methods: {
    getOne(uid) {
      resUserDetail(uid).then(res => {
        if (res.data.code === 200) {
          this.user = res.data.list;
          this.user.password = ""
          this.user.uid = uid
        }
      });
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password:"",
        status: 1
      };

    },
    Alter() {
      this.info.isShow = false;
    },
    add() {
      reqUserAdd(this.user).then(res => {
        console.log(this.user)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.$emit("init");
        }
      });
    },

    update() {
      resUserUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.$emit("init");
        }
      });
    },

    init() {
      resRolList().then(res => {
        if (res.data.code === 200) {
          this.UserList = res.data.list;
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