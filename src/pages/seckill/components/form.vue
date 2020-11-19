<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="seck">
        <el-form-item label="活动名称" label-width="150px">
          <el-input v-model="seck.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="150px">
          <!-- <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
          ></el-date-picker> -->

           <el-date-picker
     v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      align="right">
    </el-date-picker>
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
            <el-option
              v-for="item in secondList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="150px">
          <el-select v-model="seck.goodsid" placeholder="请选择">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
  reqSecksAdd,
  resCateList,
  reqSecksDetail,
  reqSecksUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";

export default {
  computed: {
    ...mapGetters({
      CateList: "cate/list",
      specsList: "specs/list",
      goodsList: "goods/list"
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
      value1: [],
      secondList: [],
      arr: []
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqGoodList: "goods/reqList",
      reqList: "seckill/reqList"
    }),
    getOne(id) {
      this.value1 = [];
      reqSecksDetail(id).then(res => {
        if (res.data.code === 200) {
          this.seck = res.data.list;
          this.seck.id = id;
          this.value1.push(this.seck.begintime, this.seck.endtime);

          resCateList({ pid: this.seck.first_cateid }).then(res => {
            if (res.data.code === 200) {
              this.secondList = res.data.list;
            }
          });

          this.reqGoodList({
            fid: this.seck.first_cateid,
            sid: this.seck.second_cateid
          });
        }
      });
    },

            //验证
    check() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.seck.title === "") {
          errorAlert("活动名称不能为空");
          return;
        }
        if (this.value1.length === 0) {
          errorAlert("活动期限不能为空");
          return;
        }

        if (this.seck.first_cateid === "") {
          errorAlert("一级分类为空");
          return;
        }

          if (this.seck.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }

        if (this.seck.goodsid === "") {
          errorAlert("商品为空");
          return;
        }

        resolve();
        
      });
      
    },

        close() {
      this.empty();
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
      (this.secondList = []), (this.arr = []);
    },
    Alter() {
      this.info.isShow = false;
    },

    
    add() {
      this.check().then(()=>{
      this.seck.begintime = this.value1[0];
      this.seck.endtime = this.value1[1];
      reqSecksAdd(this.seck);
      this.reqList();
      this.Alter();
      this.empty();
      })

    },

    changeCateid() {
      this.seck.second_cateid = "";
      this.seck.goodsid = "";
      resCateList({ pid: this.seck.first_cateid }).then(res => {
        if (res.data.code === 200) {
          this.secondList = res.data.list;
        }
      });
    },

    changeSecondid() {
      this.seck.goodsid = "";
      this.reqGoodList({
        fid: this.seck.first_cateid,
        sid: this.seck.second_cateid
      });
    },

    update() {
      this.check().then(()=>{
      this.seck.begintime = this.value1[0];
      this.seck.endtime = this.value1[1];
      reqSecksUpdate(this.seck).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.reqList();
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