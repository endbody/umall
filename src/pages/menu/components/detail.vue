<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
   <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 23 list遍历 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 15.目录有图标，菜单有地址 -->
        <el-form-item label="菜单图标" v-if="form.type===1" label-width="120px">
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icon" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else label-width="120px">
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 10.遍历routes -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name+'--/'+item.path"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='添加菜单'">确 定</el-button>
        <el-button type="primary" @click="update()" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqMenuAdd,
  reqMenuListAll,
  reqMenuUpdate,
  reqMenuDetail
} from "../../../utils/http";
import { routes } from "../../../router";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      routes,
      icon: [
        "el-icon-setting",
        "el-icon-user-solid",
        "el-icon-star-off",
        "el-icon-question",
        "el-icon-s-help",
        "el-icon-s-promotion"
      ]
    };
  },
  props: ["info", "list"],
  mounted() {},
  methods: {
    add() {
      reqMenuAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.$emit("getMenu");
          this.form = {
            pid: "",
            title: "",
            icon: "",
            type: "",
            url: "",
            status: 1
          };
          this.info.isShow = false;
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    getOne(id) {
      reqMenuDetail(id).then(res => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    update() {
     
      reqMenuUpdate(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert("修改成功");
          this.$emit("getMenu");
          this.form = {
            pid: "",
            title: "",
            icon: "",
            type: "",
            url: "",
            status: 1
          };
          this.info.isShow = false;
        } else {
          errorAlert("修改失败");
        }
      });
    },
    close() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
    }
  }
};
</script>

<style>
</style>