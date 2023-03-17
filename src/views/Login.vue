<template>
  <div class="login">
    <van-nav-bar right-text="先逛一逛" @click-right="goState('Home') ">
      <template #left>
        <div class="nav-left">
          <div class="logo">
            <img src="" alt="">
          </div>
          <div class="logo-text">luckin coffee</div>
        </div>
      </template>
    </van-nav-bar>
    <div class="user-box">
      <div class="user-title">
        <div class="welcome">欢迎回来</div>
        <div class="sud-title">Plaese login to your account</div>
      </div>
      <van-form>
        <van-field name="手机号"
        v-model="userInfo.phone"
         label="手机号" 
         placeholder="手机号" 
         autocomplete="off" />
        <van-field 
        v-model="userInfo.password"
        name="密码" 
        label="密码"
         placeholder="输入密码"
          autocomplete="off"
          :type="isRegisterPassword ? 'password' : 'text'" 
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          @click-right-icon="isRegisterPasswordType" />
        <div class="forgot">
          <span>忘记密码?</span>
        </div>
        <div class="commit-btn">
          <van-button round block color="#0C34BA" @click="login">登录</van-button>
        </div>
        <div class="commit-btn">
          <van-button round block type="default" @click="toggleRegisterBox">注册</van-button>
        </div>
      </van-form>
    </div>
    <!-- 注册 -->
    <van-popup 
    class="register-box" 
    v-model="isShow" 
    position="buttom"
     closeable>

      <div class="register-title">注册</div>
      <van-form>
        <van-field 
        v-model="userRegisterInfo.phone" 
        name="手机号" 
        label="手机号" 
        placeholder="手机号" 
        autocomplete="off" />
        <van-field 
        v-model="userRegisterInfo.password"
         name="密码" 
         label="密码" 
         placeholder="输入密码"
          autocomplete="off"
          :type="isRegisterPassword ? 'password' : 'text'" 
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'"
          @click-right-icon="isRegisterPasswordType" />
        <van-field 
        v-model="userRegisterInfo.nickName"
         name="呢称"
          label="呢称" 
          placeholder="输入呢称"
           autocomplete="off" />
        <div class="commit-btn register-btn">
          <van-button round block color="#0C34BA" @click="register">注册</van-button>
        </div>
      </van-form>
    </van-popup>
  </div>
</template>
<script >
import "../assets/less/login.less";
//导入表单验证模块
import { validForm } from "../assets/js/validForm";
export default {
  name:"Login",
  data() {
    return {
      //是否显示注册框
      isShow: false,
      //切换密码框类型
      isRegisterPassword: true,
      //用户注册信息
      userRegisterInfo: {
        phone: "",
        password: "",
        nickName: "",
      },
      //用户登录信息
      userInfo: {
        phone: "",
        password: "",
      }
    };
  },
  methods: {
    //点击注册按钮显示注册框
    toggleRegisterBox() {
      this.isShow = true;
    },
    //点击逛一逛跳转首页
    goState(name) {
      console.log(name);
      this.$router.push({ name});

    },
    //切换密码框类型
    isRegisterPasswordType() {
      this.isRegisterPassword = !this.isRegisterPassword;
    },
    //注册
    register() {
      //console.log(this.usersRegisterInfo.phone);
      //构造表单验证信息
      let o = {
        phone: {
          value: this.userRegisterInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userRegisterInfo.password,
          errorMsg: "密码由字母数字下划线组合（6-16字符）",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
        nickName: {
          value: this.userRegisterInfo.nickName,
          errorMsg: "呢称由字母数字下划线汉字组合（1-10字符）",
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
        }
      };
      let isPass = validForm.valid(o);
      if (isPass) {
        //复制用户注册信息
        let userInfo = Object.assign({}, this.userRegisterInfo);
        userInfo.appkey = this.appkey;
        //启动加载提示
        this.$toast.loading({
          //文本提示
          message: "加载中...",
          //提示时间。0：没有时间限制                        
          duration: 0,
        });
        //发起注册请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "/register",
          //POST请求参数，object
          data: userInfo,
        })
          .then((result) => {
            //关闭加载提示
            this.$toast.clear();
            console.log(result);
            if (result.data.code == 100) {
              this.isShow = false;
            } else {
              //如果注册失败，手机号被注册了
              this.$toast(result.data.msg);
            }
          })
          .catch((err) => {
            //关闭加载提示
            this.$toast.clear();
          });
      }
    },
    //登录
    login() {
      //构造表单验证
      let o = {
        phone: {
          value: this.userInfo.phone,
          errorMsg: "手机号格式不正确",
          reg: /^1[3-9]\d{9}$/,
        },
        password: {
          value: this.userInfo.password,
          errorMsg: "密码由数字字母下划线组合（6-16字符）",
          reg: /^[A-Za-z]\w{5,15}$/,
        },
      };
      let isPass = validForm.valid(o);
      if (isPass) {
        let userInfo = Object.assign({}, this.userInfo);
        userInfo.appkey = this.appkey;
        //启动加载提示
        this.$toast.loading({
          //文本提示
          message: "加载中...",
          //提示时间。0：没有时间限制                        
          duration: 0,
        });
        //发起请求
        this.axios({
          //请求类型
          method: "POST",
          //请求路径
          url: "/login",
          //请求参数
          data: userInfo,
        }) .then((result) => {
            this.$toast.clear();
            console.log(result);
            if (result.data.code == 200) {
              //登录成功
              //保存token, 以便后面验证登录
              localStorage.setItem('__tk',result.data.token);
              //登录成功后跳转到首页
              this.$router.push({name:'Home'})
            } else {
              //登录失败提示
              this.$toast(result.data.msg);
            }
          })
          .catch((err) => {
            //关闭加载提示
            this.$toast.clear();
          });
      }
    },
  },
};
</script>
<style lang ="less" scoped>
.login{
  background-color:#fff !important;
  height: 100vh;
}
/deep/ .van-popup {
  width: 100% !important;
  top: 380px !important;
}
</style>