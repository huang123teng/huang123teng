<template>
  <div class="like">
    <van-nav-bar title="我的收藏" left-text="返回" left-arrow fixed @click-left="back" />
    <BgBox>
      <div class="clearfix">
        <div class="fl like-item" v-for="(item,index) in likeProduct" :key="index">
          <ProductItem :item="item"></ProductItem>
        </div>
      </div>
    </BgBox>
  </div>
</template>
<script>
import BgBox from "../components/BgBox.vue";
import ProductItem from "../components/ProductItem.vue";
export default {
  name: "Like",
  //注册
  components: {
    BgBox,
    ProductItem,
  },
  data() {
    return {
      //获取收藏商品数据
      likeProduct: [],
    };
  },
  created() {
    //获取收藏商品
    this.getLikeProduct();
  },
  methods: {
    //返回
    back() {
      this.$router.go(-1);
    },
    //获取收藏商品数据
    getLikeProduct() {
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
        url: "/findAllLike",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 700) {
          //token检验无效，跳转登录页面
          this.$router.push({ name: "Login" });
        } else if (result.data.code == 2000) {
          this.likeProduct = result.data.result;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.like {
  padding-top: 46px;
}

.like-item {
  width: calc(~"100% / 3 - 10px + 10px /3");
  margin-right: 10px;
  margin-bottom: 10px;

  &:nth-child(3n) {
    margin-right: 0px;
  }
}
</style>

  