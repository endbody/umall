<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="vip">
        <el-form-item label="手机号" label-width="150px">
          <el-input v-model="vip.phone" autocomplete="off"></el-input>
        </el-form-item>

          <el-form-item label="昵称" label-width="150px">
          <el-input v-model="vip.nickname" autocomplete="off"></el-input>
        </el-form-item>

        
          <el-form-item label="密码" label-width="150px">
          <el-input v-model="vip.password" autocomplete="off"></el-input>
        </el-form-item>



        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="vip.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="update()">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqMemberUpdate,
  resRolList,
  reqMemberDetail
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";

export default {
  computed: {
    ...mapGetters({
      list: "specs/list"
    })
  },
  data() {
    return {
      vip: {
        nickname: "",
        phone: "",
        password:"",
        status: 1
      },
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqList: "vip/reqList",
    }),
    getOne(uid) {
      reqMemberDetail(uid).then(res => {
        if (res.data.code === 200) {
          this.vip = res.data.list
          this.vip.password = ""
          this.vip.uid = uid;
        }
      });
    },
    empty() {
      this.vip = {
        nickname: "",
        phone: "",
        password:"",
        status: 1
      };
      this.atterArr = [{ value: "" }];
    },
    Alter() {
      this.info.isShow = false;
    },


    update() {
    console.log(this.vip);
      reqMemberUpdate(this.vip).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.reqList();
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
.line {
  display: flex;
  margin-bottom: 10px;
}

.line .el-input {
  flex: 1;
}

.line .el-button {
  width: auto;
}
</style>