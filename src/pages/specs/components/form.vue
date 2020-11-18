<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="specs">
        <el-form-item label="规格名称" label-width="150px">
          <el-input v-model="specs.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item,index) in atterArr"
          :key="index"
          label="规格属性"
          label-width="150px"
        >
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index === 0" @click="Addatter">新增规格属性</el-button>
            <el-button type="danger" v-else @click="delAtter(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="150px">
          <el-switch v-model="specs.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>

        <el-button type="primary" @click="add()" v-if="info.title=='商品规格添加'">添 加</el-button>
        <el-button type="primary" @click="update()" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqSpecsAdd,
  resSpecsUpdate,
  resRolList,
  resSpecsDetail
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
      specs: {
        specsname: "",
        attrs: "",
        status: 1
      },
      atterArr: [{ value: "" }]
    };
  },
  props: ["info"],
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount"
    }),
    getOne(id) {
      resSpecsDetail(id).then(res => {
        if (res.data.code === 200) {
          this.specs = res.data.list[0];
          this.specs.id = id;
          this.atterArr = JSON.parse(res.data.list[0].attrs).map(item => {
            return { value: item };
          });
        }
      });
    },
    empty() {
      this.specs = {
        specsname: "",
        attrs: "",
        status: 1
      };
      this.atterArr = [{ value: "" }];
    },
    Alter() {
      this.info.isShow = false;
    },
    add() {
      this.specs.attrs = JSON.stringify(
        this.atterArr.map(item => {
          return item.value;
        })
      );
      reqSpecsAdd(this.specs).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.Alter();
          this.reqList();
          this.reqCount()
        }
      });
    },

    Addatter() {
      this.atterArr.push({
        value: ""
      });
    },

    delAtter(index) {
      this.atterArr.splice(index, 1);
    },

    update() {
      this.specs.attrs = JSON.stringify(
        this.atterArr.map(item => {
          return item.value;
        })
      );
      resSpecsUpdate(this.specs).then(res => {
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