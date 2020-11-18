<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="seck">
        <el-form-item label="活动名称" label-width="150px">
          <el-input v-model="seck.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="150px">
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="150px">
          <el-select v-model="seck.first_cateid" placeholder="请选择" @change="changeCateid">
            <el-option
              v-for="item in CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="150px">
          <el-select v-model="seck.second_cateid" placeholder="请选择" @change="changeSecondid">
            <el-option v-for="item in secondList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
{{goods}}
        <el-form-item label="商品" label-width="150px">
          <el-select v-model="seck.goodsid" placeholder="请选择" multiple>
            <el-option v-for="item in goods" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="seck.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>

        <el-button type="primary" @click="add()" v-if="info.title=='商品管理添加'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqGoodsAdd,
  resCateList,
  reqGoodsDetail,
  reqGoodsUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";

export default {
  computed: {
    ...mapGetters({
      CateList: "cate/list",
      specsList: "specs/list"
    })
  },
  data() {
    return {
      seck: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      },
      value1: "",
      secondList : [],
      goods:[]
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqGoodList: "goods/reqList",
      reqCount: "goods/reqCount"
    }),
    getOne(id) {
      reqGoodsDetail(id).then(res => {
        if (res.data.code === 200) {
          this.goods = res.data.list;
          this.imgUrl = this.$img + res.data.list.img;
          this.atteArr = JSON.parse(res.data.list.specsattr);
          this.atterListArr = JSON.parse(res.data.list.specsattr);
          this.goods.id = id;
        }
      });
    },
    empty() {
      this.seck = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1
      };
      this.value1 = [];
    },
    Alter() {
      this.info.isShow = false;
    },
    add() {
      console.log(this.seck)
    console.log(this.value1)
      reqGoodsAdd(this.p).then(res => {
        if (res.data.code == 200) {
          this.empty();
          this.Alter();
          this.reqGoodList();
          this.reqCount();
        }
      });
    },

    atterList() {
      this.atteArr = this.specsList.find(item => {
        return item.id == this.goods.specsid;
      }).attrs;
    },

    changeCateid() {
      resCateList({ pid: this.seck.first_cateid }).then(res => {
        if (res.data.code === 200) {
          this.secondList = res.data.list;
        }
      });
    },

changeSecondid(){
  // console.log(this.seck.first_cateid,this.seck.second_cateid)
  this.reqGoodList({fid:this.seck.first_cateid,sid:this.seck.second_cateid}).then(res=>{
    if(res.data.code === 200){
      this.goods = res.data.list
    }
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
      this.goods.img = e.raw;
    },

    update() {
      this.p = { ...this.goods };
      this.p.specsattr = JSON.stringify(this.atteArr);
      reqGoodsUpdate(this.goods).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.reqGoodList();
        }
      });
    }
  },
  mounted() {
    this.reqCateList();
    this.reqSpecsList(true);
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