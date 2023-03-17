<template>
    <div class="account">
      <van-nav-bar left-text="返回" title="个人资料" left-arrow @click-left=" back"/>
      <BgBox>
        <div class="my-box ">
            <div class="tx clearfix">
                    <span class="fl">头像</span>
                    <img  
                    class="tx_img "
                    src="../assets/images/0001.jpg"/>
                  
                </div>
                <div class="yonhu clearfix">
                    <span class="fl">用户id</span>
                    <span class="fr">{{myuserInfo.userId}}</span>
                </div>
                <div class="name clearfix">
                    <span class="fl">昵称</span>
                    <span class="fr" >{{myuserInfo.nickName }}</span>
                </div>
                <div class="jianjie clearfix">
                    <span class="fl">简介</span>
                    <span class="fr" >这个家伙很懒，什么也没有留下来！</span>
                </div>
                <div class="phone clearfix">
                    <span class="fl">手机号码</span>
                    <span class="fr">{{myuserInfo.phone}}</span>
                </div>

      </div>
    </BgBox>
    </div>
  </template>

<script>
import BgBox from "../components/BgBox.vue";
export default {
  name: "Account",
  data() {
    return {
       
      myuserInfo: {},
    };
  },
  components:{
    BgBox,
  },
  created() {
    this.getMyUserInfo();
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    getMyUserInfo() {
      //验证token
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        //跳回登录页面
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }
      //发起请求
      this.axios({
        method: "GET",
        url: "/findAccountInfo",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 700) {
          //token检验无效，跳转到登录页面
          this.$router.push({ name: "Login" });
        } else if (result.data.code == "B001") {
          this.myuserInfo = result.data.result[0];
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.account{ 
     position: absolute;
width: 100%;
    .my-box {

        .tx,.yonhu,.name,.jianjie,.phone{
       
            height: 50px;
           // background-color: aqua;
            border-bottom:1px solid rgb(194, 194, 194) ;
            .tx_img{
              position: relative;
              margin-left: 80%;
              border-radius :50%;
              height: 40px;
              width: 40px;
            }
            .fl{
               margin-top: 21px;
                font-size: 12px;
                font-weight: bold;
            }
            .fr{

                margin-top: 20px;
                font-size: 12px;

                
            }
        }
    }
}
</style>
