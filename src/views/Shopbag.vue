<template>
  <div class="shopbag">
    <van-nav-bar
      title="购物袋"
      left-text="返回"
      right-text="编辑"
      left-arrow
      fixed
      @click-left="back"
    />
    <div v-if="shopbagData.length == 0">
        <van-empty description="购物袋空空如也，去逛一逛！">
            <van-button round class="bottom-button">逛一逛</van-button>
        </van-empty>
    </div>
    <div class="shopbag-box">
      <div class="shopbag-bg" v-if="shopbagData.length !==0"></div>

      <van-list
      v-if="shopbagData.length !==0"
        v-model="loading"
        :finished="finished"
        finished-text="哎呀，没有数据可加载了"
        offset="20"
        @load="loadData"
      >
        <div class="shopbag-product">
          <div
            class="shopbag-item"
            v-for="(item, index) in shopbagData"
            :key="index"
          >
            <div class="cell-item">
              <van-swipe-cell>
                <div class="cell-item-box clearfix">
                  <div class="check-box fl">
                    <van-checkbox
                    v-model="item.isChecked"
                    @change="simpSelect"
                    ></van-checkbox>
                  </div>
                  <div class="pro-info-box fl">
                    <div class="pro-img fl">
                      <img class="auto_img" :src="item.small_img" alt="" />
                    </div>
                    <div class="pro-info fl">
                      <div class="pro-info-text">
                        <div class="names clearfix">
                          <div class="pro-name fl">{{ item.name }}</div>
                          <div class="pro-rule fl">{{ item.rule }}</div>
                        </div>
                        <div class="pro-enname">{{ item.enname }}</div>
                      </div>
                      <div class="pro-count-box ">
                        <div class="pro-price fl">￥{{ item.price }}</div>
                        <div class="step-box fl">
                          <van-stepper
                            theme="round"
                            button-size="20"
                            disable-input
                            v-model="item.count"
                            @change="changeCount(item)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <template #right>
                 <van-button 
                 square
                 type="danger"
                 text="删除"
                 @click="removeOne(index,item.sid)"
                 >
                 </van-button>
                </template>
              </van-swipe-cell>
            </div>
          </div>
        </div>
      </van-list>
      <van-submit-bar
      :price="total"
      button-text="提交订单"
      @submit="commit"
      >
      <van-checkbox
      v-model="isAllchecked"
      @click="allSelect">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>
<script>
//默认导出组件
export default {
  //组件名称
  name: "Shopbag",
  data() {
    return {
      //购物袋数据
      shopbagData: [],
      //所有购物袋数据
      allShopbagData: [],
      //开始截取购物袋数据位置
      startIndex: 0,
      //每次触底加载截取8条数据
      dataCount: 8,
      //触发加载
      loading: true,
      //是否全部加载完成
      finished: false,
      prices: 280.0,
      //全选的初始状态
      isAllchecked: false,
      count: 2,
      //单选的初始状态
      isChecked: false,
      //订单总金额
      total: 0,
    };
  },
  created() {
    this.getShopbagData();
  },
  methods: {
    //返回
    back() {
        this.$router.go(-1);
    },
    //获取购物袋数据
    getShopbagData() {
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
        url: "/findAllShopcart",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 700) {
          //token检验无效，跳转到登录页面
          this.$router.push({ name: "Login" });
        } else if (result.data.code == 5000) {
          result.data.result.map((v) => {
            v.isChecked = false;
          });
          //this.shopbagData = result.data.result[0];
          this.allShopbagData = result.data.result;
          //根据开始截取位置和截取数据设置购物袋显示的数据
          this.shopbagData = this.allShopbagData.slice(
            this.startIndex,
            this.startIndex + this.dataCount
          );
          this.startIndex += this.dataCount;
          this.loading = false;
        }
      });
    },
    //懒加载购物袋数据
    loadData() {
      setTimeout(() => {
        //根据开始截取位置和截取数据数量设置购物袋显示的数据
        let data = this.allShopbagData.slice(
          this.startIndex,
          this.startIndex + this.dataCount
        );
        this.startIndex += this.dataCount;
        this.shopbagData.push(...data);
        this.isAllchecked = false;

        //如果当前截取的数据不足8条，下次不可能截取数据
        if (data.length < this.dataCount) {
          //没有数据可加载时，需要finished修改为true,这样可以不在onload时间
          this.finished = true;
        } else {
          //每次触发onload事件到需要将loading修改为false
          this.loading = false;
        }
      }, 1500);
    },
    //全选
    allSelect() {
      this.shopbagData.map((v) => {
        v.isChecked = this.isAllchecked;
      });
      this.sum();
    },
    //单选
    simpSelect() {
      this.sum();
      for (let i = 0; i < this.shopbagData.length; i++) {
        if (!this.shopbagData[i].isChecked) {
          this.isAllchecked = false;
          return;
        }
      }
      this.isAllchecked = true;
    },
    //计算订单总金额
    sum() {
      this.total = 0;
      this.shopbagData.map((v) => {
        if (v.isChecked) {
          this.total += v.price * v.count;
        }
      });
      this.total *= 100;
    },
    //删除单个商品
    removeOne(index, sid) {
      console.log(index);
      //index: shopbagData数组元素的下标
      //sid:购物袋sid
      //获取token
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }
      //发起请求
      this.axios({
        method: "POST",
        url: "/deleteShopcart",
        data: {
          appkey: this.appkey,
          tokenString,
          sids: JSON.stringify([sid]),
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 700) {
          //token检验无效，跳转到登录页面
          this.$router.push({ name: "Login" });
        } else if (result.data.code == 7000) {
          //如果删除购物车商品成功，则页面移除商品，重新计算总价
          this.shopbagData.splice(index, 1);
          this.sum();
        }
      });
    },
    //是否选择商品
    isSelectProduct(msg){
      for(let i  = 0; i< this.shopbagData.length; i++){
        if ((this,this.shopbagData[i].isChecked)){
          //如果存在勾选商品
          return true;
        }
      }
      return false;
    },
    //修改商品数量
    changeCount(item){
      //sid:购物袋sid
      //count:商品数量

      //获取token
      let tokenString = localStorage.getItem("__tk");
      if (!tokenString) {
        this.$toast("请先登录");
        return this.$router.push({ name: "Login" });
      }
      //发送请求
      this.axios({
        method:"POST",
        url:"/modifyShopcartCount",
        data:{
          appkey:this.appkey,
          tokenString,
          sid:item.sid,
          count:item.count,
        },
      }).then((result) =>{
        if (result.data.code == 700){
          //token检验无效，跳转到登录页面
          this.$router.push({name:"Login"})
        }else if (result.data.code == 6000){
          //重新调用计算金额
          if (item.isChecked){
            this.sum();
          }
        }
      })
    },
    //提交订单，跳转到结算页面
    commit(){
      let isHas = this.isSelectProduct();
      if (!isHas){
        this.$toast("请先选择购买的商品");
        return;
      }
      //sid : 勾选商品的购物袋sid合集
      let sids =[];
      this.shopbagData.map((v) =>{
        if(v.isChecked){
          sids.push(v.sid);
        }
      });
      //跳转到结算页面
      this.$router.push({name:"Pay", query:{sids:sids.join("-")}});
    }
  },
};
</script>
<style lang="less" scoped>
.shopbag {
  padding-top: 46px;

  .shopbag-bg {
    height: 50px;
    background: url("../assets/images/shopbag_bg.png") no-repeat center center;
    background-size: cover;
  }
  .shopbag-product {
    padding: 10px;
    .shopbag-item {
      margin-bottom: 10px;
      .cell-item-box {
        padding: 10px;
        background-color: #fff;
        border-radius: 8px;
        .check-box {
          width: 20px;
          height: 20px;
          margin-top: 30px;
        }
        .pro-info-box {
          width: calc(~"100% - 34px");
          height: 80px;
          margin-left: 10px;
          .pro-img {
            width: 80px;
            height: 80px;
          }
          .pro-info {
            width: calc(~"100% - 90px");
            margin-left: 10px;
            .pro-info-text {
             height: 50px;
              
              .pro-name {
                margin-right: 10px;
                font-size: 14px;
                
              }
              .pro-enname {
                font-size: 12px;
                color: #999;
                margin-top: 5px;
                margin-bottom: 15px;
              }
            }
            .pro-count-box {
              height: 30px;
              .pro-price {
                font-size: 14px;
                color: #0c34ba;
                font-weight: bold;
                line-height: 30px;
              }
              .step-box {
                margin-top: 5px;
                margin-left: 85px;
              }
            }
          }
        }
      }
    }
  }
  .shopbag-box {
    padding-bottom: 50px;
  }
  /deep/.van-submit-bar {
    bottom: 50px;
  }
  .cell-item {
    /deep/.van-button {
      height: 100%  ;
    }
  }
}
</style>