<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="open" @closed="close">
      <el-form :model="goods">
        <el-form-item label="一级分类" label-width="150px">
          <el-select
            v-model="goods.first_cateid"
            prop="first_cateid"
            placeholder="请选择"
            @change="changeCateid"
          >
            <el-option
              v-for="item in CateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="150px">
          <el-select v-model="goods.second_cateid" placeholder="请选择">
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="150px">
          <el-input v-model="goods.goodsname" prop="goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="价格" label-width="150px">
          <el-input v-model="goods.price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="市场价格" label-width="150px">
          <el-input v-model="goods.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="150px">
          <el-upload class="avatar-uploader" action="#" :on-change="Upload" v-if="info.isShow">
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="商品规格" label-width="150px">
          <el-select v-model="goods.specsid" placeholder="请选择" @change="atterList">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="150px">
          <el-select v-model="atterListArr" placeholder="请选择" multiple>
            <el-option v-for="item in atteArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="150px">
          <el-radio v-model="goods.isnew" :label="1">是</el-radio>
          <el-radio v-model="goods.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" label-width="150px">
          <el-radio v-model="goods.ishot" :label="1">是</el-radio>
          <el-radio v-model="goods.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        <el-form-item label="商品描述" label-width="150px">
          <!-- <textarea v-model="goods.description" cols="30" rows="10"></textarea> -->
          <div id="div1" v-if="info.isShow"></div>
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
import E from "wangeditor";

export default {
  computed: {
    ...mapGetters({
      CateList: "cate/list",
      specsList: "specs/list"
    })
  },
  data() {
    return {
      goods: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      },
      imgUrl: null,
      secondList: [],
      atteArr: [],
      atterListArr: []
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

                //给编辑器赋值
        if (this.editor) {
          console.log(this.goods.description);
          this.editor.txt.html(this.goods.description);
        }

          resCateList({ pid: this.goods.first_cateid }).then(res => {
            if (res.data.code === 200) {
              this.secondList = res.data.list;
            }
          });
        }
      });
    },
    close() {
      this.empty();
    },
    open() {
      this.editor = new E("#div1");
      this.editor.create();
      this.editor.txt.html(this.goods.description)
    },
    empty() {
      this.goods = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1
      };
      this.imgUrl = null;
      this.secondList = [];
      this.atteArr = [];
      this.atterListArr = [];
    },
    Alter() {
      this.info.isShow = false;
    },
       //验证
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.goods.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.goods.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.goods.goodsname === "") {
          errorAlert("商品名称为空");
          return;
        }
        if (this.goods.price === "") {
          errorAlert("商品价格为空");
          return;
        }
        if (this.goods.market_price === "") {
          errorAlert("商品市场价格为空");
          return;
        }
        if (!this.goods.img) {
          errorAlert("请选择图片");
          return;
        }
        if (this.goods.specsid === "") {
          errorAlert("请选择商品规格");
          return;
        }
        if (this.atterListArr.length === 0) {
          errorAlert("请选择商品属性");
          return;
        }
        if (this.editor.txt.html() === "") {
          errorAlert("请输入商品描述");
          return;
        }
        resolve();

      });

    },
    add() {
      this.check().then(() => {
        this.goods.description = this.editor.txt.html();
        this.p = { ...this.goods };
        this.p.specsattr = JSON.stringify(this.atteArr);
        this.p.specsattr = JSON.stringify(this.atteArr);
        
        reqGoodsAdd(this.p).then(res => {
          if (res.data.code == 200) {
            this.empty();
            this.Alter();
            this.reqGoodList();
            this.reqCount();
          }
        });
      });
    },

    atterList() {
      this.atteArr = this.specsList.find(item => {
        return item.id == this.goods.specsid;
      }).attrs;
    },

    changeCateid() {
      this.goods.second_cateid = "";
      resCateList({ pid: this.goods.first_cateid }).then(res => {
        if (res.data.code === 200) {
          this.secondList = res.data.list;
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
      this.goods.img = e.raw;
    },

    update() {
      this.check().then(()=>{
      this.goods.description = this.editor.txt.html();
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
      })
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