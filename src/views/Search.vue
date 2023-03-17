<template>
  <div class="search">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft">
      <template #right>
        <div class="home-search">
          <van-search
            class="home-search"
            placeholder="请输入搜索关键词"
            v-model="name"
            ref="search"
            @search="search"
          />
        </div>
        <div class="qx" @click="onClickLeft">取消</div>
      </template>
    </van-nav-bar>
    <BgBox>
      <div class="clearfix">
        <div class="like-item fl"
        v-for="(item,index) in products"
        :key="index"
        >
          <ProductItem :item="item"></ProductItem>
        </div>
      </div>
    </BgBox>
  </div>
</template>

<script >
import BgBox from "../components/BgBox.vue";
import ProductItem from "../components/ProductItem.vue";
export default {
  name: "Search",
  components: {
    BgBox,
    ProductItem,
  },
  data() {
    return {
        name:"",
        products:[],
    };
  },
  created() {
    this.$nextTick(()=>{
       let searchIpt =this.$refs.search.querySelector('[type="search"]');
        searchIpt = focus();
    });
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1);
    },
    search(){
        this.$toast.loading({
            message:"加载中...",
            forbidClick:true,
            duration:0,
        }),
        this.axios({
        menthod: "GET",
        url: "/search",
        params: {
          appkey: this.appkey,
          name:this.name,
        },
      }).then((result)=>{
        this.$toast.clear();
        if(result.data.code =="Q001"){
            this.products = result.data.result;
        }else{
            this.$toast(result.data.msg);
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.search {
  .van-nav-bar_right {
    width: 70%;
  }
  .home-search {
    width: 100%;
  }
  .home-search .van-search {
    padding: 0;
    border-radius: 17px;
    overflow: hidden;
  }
  .like-item {
    width: calc(~"100% /3 -10px + 10px /3");
    margin-right: 10px;
    margin-bottom: 10px;
    &:nth-child(3n) {
      margin-right: 0px;
    }
  }
  .px {
    width: 50px;
  }
}
</style>
