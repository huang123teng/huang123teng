<template>
  <div class="home">
    <div>
      <van-nav-bar left-arrow>
        <template #left>
      <div class="home-nav">
        <div class="t1">{{Greetings}}</div>
         <div class="t2 one_text">Till</div>
           </div>
        </template>
       
        <template #right>
      <div class="home-search">
        <van-search class="home-search" placeholder="请输入搜索关键词" @click="searchFocus" />
           </div>
        </template>
</van-nav-bar>
      <div class="home-content">
        <van-swipe class="banner-box" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in bannerData" :key="index">
            <img :src="item.bannerImg" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="product-box">
      <div class="pro-title-box">
        <span class="pro-title">热卖推荐</span>
      </div>

      <div class="product clearfix">
        <div
          class="pro-item fl"
          v-for="(item, index) in hotproduct"
          :key="index"
          @click="goDetail(item.pid)"
        >
          <div class="img-box">
            <img class="auto_img" :src="item.smallImg" alt />
            <div class="hot">hot</div>
          </div>
          <div class="pro-info">
            <div class="pro-name">{{ item.name }}</div>
            <div class="pro-enname">{{ item.enname }}</div>
            <div class="pro-price">￥{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import "../assets/less/home.less";
export default {
  name: "Home",
  data() {
    return {
      bannerData: [],
      hotproduct:[],
      Greetings:"",
    };
  },
  created() {
    this.getBannerData();
    this.getHotproduct();
    this.getDate()
  },
  methods: {
getDate(){

let hour = new Date() .getHours();
console. log(hour);
if(hour < 6){
this. Greetings="嘿，凌晨好！"
}else if(hour < 9){
this.Greetings =
"嘿，早上好！"
}else if(hour < 12){
this.Greetings=
"嘿，上午好！"
}else if(hour < 14){
this. Greetings="嘿，中午好！"
}else if(hour < 18){
this. Greetings="嘿 下午好！"
}else if(hour < 23){
this.Greetings =
"嘿 睌上好！"
}
},


    getBannerData() {
      this.axios({
        method: "GET",
        url: "/banner",
        params: {
          appkey: this.appkey,
        },
      }).then((result) => {
        if (result.data.code == 300) {
          this.bannerData = result.data.result;
        }
      });
    },
    getHotproduct() {
     // this.$toast.loading({
       // message: "加载中...",
        // duration: 0,
    // });
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      }).then((result) => {
        console.log( result.data.result);
        // if (result.data.code == 500) {
          this.hotproduct = result.data.result;
        // }
      });
    },
    goDetail(pid){
      this.$router.push({name:"Detail", params:{pid}})
    },
    searchFocus(){
      this.$router.push({name:"Search"});
    }
    
  },
};
</script>

<style lang="less" scope>


</style>


