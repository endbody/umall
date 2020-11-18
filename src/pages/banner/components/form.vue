<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="banner">
        <el-form-item label="标题" label-width="150px">
          <el-input v-model="banner.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="150px">
          <el-upload class="avatar-uploader" action="#" :on-change="Upload" v-if="info.isShow">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="banner.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>

        <el-button type="primary" @click="add()" v-if="info.title=='轮播图添加'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqBannerAdd,
  reqBannerDetail,
  resRolList,
  reqBannerUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";

export default {
  computed: {
    ...mapGetters({
      list: "banner/list"
    })
  },
  data() {
    return {
      banner: {
        title: "",
        img: null,
        status: 1
      },
      imgUrl: null
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqList: "banner/reqList"
    }),
    getOne(id) {
      reqBannerDetail(id).then(res => {
        if (res.data.code === 200) {
          this.banner = res.data.list;
          this.imgUrl = this.$img + res.data.list.img;
          this.banner.id = id;
        }
      });
    },
    close() {
      this.empty();
    },
    empty() {
      this.banner = {
        title: "",
        img: null,
        status: 1
      };
      this.imgUrl = "";
    },
    Alter() {
      this.info.isShow = false;
    },
    add() {
      console.log(this.banner);
      reqBannerAdd(this.banner).then(res => {
        if (res.data.code == 200) {
          this.empty();
          this.Alter();
          this.reqList();
        }
      });
    },

    Upload(e) {
      let extname = path.extname(e.raw.name);
      let extArr = [".jpg", ".jpeg", ".png", ".jif"];
      if (!extArr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      if (e.size > 2 * 1024 * 1024) {
        console.log(e.size);
        errorAlert("图片大小不能超过2M");
        return;
      }
      this.imgUrl = URL.createObjectURL(e.raw);
      this.banner.img = e.raw;
    },

    update() {
      reqBannerUpdate(this.banner).then(res => {
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>