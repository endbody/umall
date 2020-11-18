<template>
  <div class="loginBox">
    <div class="login">
      <h3>登陆</h3>
      <div class="line">
        <el-input v-model="user.username" placeholder="请输入账号"></el-input>
      </div>
      <div class="line">
        <el-input placeholder="请输入密码" v-model="user.password" show-password></el-input>
      </div>
      <el-button type="primary" @click="login">登陆</el-button>
    </div>
  </div>
</template>

<script>
import { reqUserLogin } from "../../utils/http";
import { successAlert } from "../../utils/alert";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser"
    }),

    login() {
      reqUserLogin(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.changeUser(res.data.list)
          this.$router.push("/");
          this.user = {
            username: "",
            password: ""
          };
        }
      });
    }
  }
};
</script>

<style scoped>
.loginBox {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right, #553544, #413b54, #2f3d60);
}

.login {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 500px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
}

.login h3 {
  font-weight: bold;
  font-size: 30px;
}

.line {
  margin-bottom: 20px;
}

.el-button {
  display: block;
  width: 100%;
}
</style>