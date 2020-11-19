<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="cate">
        <el-form-item label="上级分类" label-width="150px">
          <el-select v-model="cate.pid" placeholder="请选择">
            <el-option :value="0" label="顶级菜单"></el-option>

            <el-option :value="item.id" v-for="item in list" :key="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="150px">
          <el-input v-model="cate.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="150px" v-if="cate.pid !== 0">
          <el-upload class="avatar-uploader" action="#" :on-change="Upload" v-if="info.isShow">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="cate.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-model="cate.status" @click="info.isShow = false">取 消</el-button>

        <el-button type="primary" @click="add()" v-if="info.title=='商品分类添加'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqCateAdd,
  resCateUpdate,
  resRolList,
  resCateDetail
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";

export default {
  computed: {
    ...mapGetters({
      list: "cate/list"
    })
  },
  data() {
    return {
      cate: {
        pid: "",
        catename: "",
        img: "",
        status: 1
      },
      imgUrl: null,
      UserList: []
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    }),
    getOne(id) {
      resCateDetail(id).then(res => {
        if (res.data.code === 200) {
          this.cate = res.data.list;
          this.imgUrl = this.$img + res.data.list.img;
          this.cate.id = id;
        }
      });
    },
    close() {
      this.empty();
    },
    empty() {
      this.cate = {
        pid: "",
        catename: "",
        img: "",
        status: 1
      };
      this.imgUrl = null;
      this.UserList = []
    },
    Alter() {
      this.info.isShow = false;
    },
            //验证
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.cate.pid === "") {
          errorAlert("上级分类不能为空");
          return;
        }
        if (this.cate.catename === "") {
          errorAlert("分类名称不能为空");
          return;
        }

        if (this.imgUrl == null && this.cate.pid !== 0) {
          errorAlert("图片为空");
          return;
        }

        resolve();
        
      });
      
    },
    add() {
      this.check().then(()=>{
      reqCateAdd(this.cate).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.reqList();
        }
      });
      })

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
      this.cate.img = e.raw;
    },

    update() {
      this.check().then(()=>{
      resCateUpdate(this.cate).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.reqList();
        }
      });
      })
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