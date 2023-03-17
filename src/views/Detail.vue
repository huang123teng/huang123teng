<template>
  <div class="detail">
    <van-nav-bar
      title="商品详细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="showShare = true"
    >
      <template #right>
        <van-icon name="ellipsis" size="20" />
      </template>
    </van-nav-bar>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <div>
      <img class="auto_img" :src="productDetail.large_img" alt="" />
    </div>

    <div class="pro_info_box">
      <div class="pro_info">
        <div class="pro_box clearfix">
          <div class="fl">
            <div class="pro_name">{{ productDetail.name }}</div>
            <div class="pro_enname">{{ productDetail.ennmae }}</div>
          </div>
          <div class="pro_price">￥{{ productDetail.price }}</div>
        </div>
        <div class="rule_box">
          <div
            class="rule_item clearfix"
            v-for="(item, index) in productDetail.rules"
            :key="index"
          >
            <div class="rule_title fl">{{ item.title }}</div>
            <div class="fl">
              <div
                class="r_item fl"
                v-for="(v, i) in item.rule"
                :key="i"
                :class="{ active: item.ruleIndex == i }"
                @click="toggleRule(item, i)"
              >
                {{ v.title }}
              </div>
            </div>
          </div>
        </div>

        <div class="c_box clearfix">
          <div class="select_count fl">选择数量</div>
          <div class="select_box fr">
            <van-stepper theme="round" button-size="22" disable-input />
          </div>
        </div>

        <div class="desc_box">
          <div class="pro_desc">商品描述</div>
          <div class="desc_text">
            <div
              class="text_item"
              v-for="(item, index) in productDetail.desc"
              :key="index"
            >
              {{ index + 1 }}、{{ item }}
            </div>
          </div>
        </div>
      </div>

      <!-- <div> -->
      <van-goods-action>
        <van-goods-action-icon icon="bag" text="购物袋" color="#000" />
        <van-goods-action-icon
          icon="like"
          :text="isLike ? '已收藏' : '未收藏'"
          :color="isLike ? '#0c34ba' : '#000'"
          @click="toggleLikeProduct"
        />
        <van-goods-action-button
          color="#566db8"
          text="加入购物车"
          @click="addShopbag"
        />
        <van-goods-action-button color="#7232dd" text="立即购买" />
      </van-goods-action>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import "../assets/less/detail.less";

export default {
  name: "Detail",
  data() {
    return {
      // 分享面板
      showShare: false,
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
      //商品pid
      pid: "",
      //商品详情数据
      productDetail: {},
      //是否收藏商品
      isLike:false,
      //购物车数量
      bagCount:0,
      //商品数量
      product:{
        count:1,
      }
    };
  },
  created() {
    //截取pid
    this.pid = this.$route.params.pid;
    //商品详情数据
    this.getProductDetail();
    //this.toggleLikeProduct();
  },
  methods: {
    //NavBar导航模块
    onClickLeft() {
      //返回上一级
      this.$router.back(-1);
    },
    onSelect(options) {
      Toast(options.name);
      this.showShare = false;
    },
    //获取商品详情数据
    getProductDetail() {
      //发起请求
      this.axios({
        //请求类型
        method: "GET",
        //请求路径
        url: "/productDetail",
        //请求参数
        params: {
          appkey: this.appkey,
          pid: this.pid,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 600) {
          let data = result.data.result[0];
          data.desc = data.desc.split(/\n/);
          console.log(data.desc);
          let rules = [];
          let ruleData = ["tem", "sugar", "milk", "cream"];
          ruleData.map((v) => {
            let r = {};
            r.title = data[v + "_desc"];
            console.log(r);
            //激活下标
            r.ruleIndex = 0;
            r.rule = [];
            //获取规格字符串
            let ruleString = data[v].split("/");
            ruleString.map((value) => {
              if (value != "") {
                r.rule.push({ title: value });
                console.log(r.rule);
              }
            });
            if (r.rule.length > 0) {
              rules.push(r);
            }
          });
          data.rules = rules;
          this.productDetail = data;
        }
      });
    },
    //切换商品规格
    toggleRule(item, i) {
      item.ruleIndex = i;
    },
//收藏商品
toggleLikeProduct(){
  //获取token
  let tokenString=localStorage.getItem("__tk");
  if (!tokenString){
    //跳回登录页面
    this.$toast("请先登录");
    return this.$router.push({name: "Login"});
  }
  let url = this.isLike ? "/notLike" : "/like";
  this.$toast.loading({
    message:"加载中...",
    forbidClick:true,
    duration:0,
  });
  //发起请求
  this.axios({
    method:"POST",
    url,
    data:{
      appkey:this.appkey,
      pid:this.pid,
      tokenString,
    }
  }).then((result) =>{
    this.$toast.clear();
    console.log(result);
    if (result.data.code ==700){
      //token检验无效，跳转到登录页面
      this.$router.push({name:"Login"});
    }else if(result.data.code ==800){
      //token检验有效，需收藏改商品
      this.isLike = true;
    }
  });
},
//加入购物车
addShopbag(){
  let  tokenString = localStorage.getItem("__tk");
  if (!tokenString){
    this.$toast("请先登录");
    return this.$router.push({name:"Login"});
  }
  //请求参数：
  //获取tokenString
  //获取商品pid
  //获取商品规格rule
  //获取商品数量count
  //获取appkey
  let data ={
    tokenString,
    appkey:this.appkey,
    count:this.product.count,
    pid:this.pid,
  };
  //商品规格
  let rs = [];
  //便历productDetail.rules数组获取选择的商品规格
  this.productDetail.rules.map((v) =>{
    rs.push(v.rule[v.ruleIndex].title);
    console.log(rs);
  });
  data.rule = rs.join("/")
  //发起请求
  this.axios({
    method:"POST",
    url:"/addShopcart",
    data,
  }).then((result)=>{
    console.log(result);
    if (result.data.code ==700){
      //token检验无效，跳转到登录页面
      this.$router.push({name:"Login"});
    }else if (result.data.code == 3000){
      //加入购物袋
      if (result.data.status == 1){
        this.dagCount++;
      }
    }
  })
},
  },
};
</script>


<style>
</style>