<template>
    <div class="order">
      <van-nav-bar
        title="我的订单"
        left-text="返回"
        lett-arrow
        fixed
        @click-left="back"
      />
      <BgBox>
        <div v-if="isHas">
          <van-tabs v-model="tabIndex" @change="changeTab">
            <van-tab
              :title="item.title"
              v-for="(item, index) in tabData"
              :key="index"
            >
              <div>
                <div class="oredr-box" v-for="(v, k) in orderData" :key="v.oid">
                  <orderLists
                    :info-title-left="v.oid"
                    :date="v.date| formatDate('yyyy-MM-dd hh:mm:ss')"
                    :count="v.count"
                    :total="v.total"
                    @confirm-receive="confirmReceive(v, k)"
                    :is-receive="v.status == 2"
                    @remove="removeOrder(v.oid, k)"
                  >
                    <OrderItem
                      v-for="(value, idx) in v.data"
                      :key="idx"
                      :item="value"
                    >
                    </OrderItem>
                  </OrderLists>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </BgBox>
    </div>
  </template>
  
  
  
  
  <script>
  import BgBox from "../components/BgBox.vue";
  import OrderLists from "../components/OrderLists.vue";
  import OrderItem from "../components/OrderItem.vue"
  
  export default {
    name: "order",
    data() {
      return {
        //激活tab下标
        tabIndex: 0,
        tabData: [{ title: "全部" }, { title: "进行中" }, { title: "已完成" }],
        //订单商品数据
        orderData: {},
        //没有订单数据
        isHas: true,
      };
    },
    components: {
      BgBox,
      OrderItem,
      OrderLists,
    },
    created() {
      this.getOrderDataByStatu();
    },
    methods: {
      back() {
        //返回上一级
        this.$router.back(-1);
      },
      // 切换订单状态0，1，2
      changeTab(title, name) {
        this.getOrderDataByStatu();
      },
      //根据订单状态获取订单数据
      getOrderDataByStatu() {
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
          url: "/findOrder",
          params: {
            appkey: this.appkey,
            tokenString,
            status: this.tabIndex,
          },
        }).then((result) => {
          console.log(result);
          if (result.data.code == 700) {
            //token检验无效，跳转到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 70000) {
            //如果没有订单数据，则移除tab
            if (this.tabIndex == 0 && result.data.result.length == 0) {
              this.isHas = false;
              return;
            }
            //按照订单oid进行分类
            let orderDatas = [];
            result.data.result.map((v) => {
              for (let i = 0; i < orderDatas.length; i++) {
                if (orderDatas[i].oid == v.oid) {
                  orderDatas[i].data.push(v);
                  orderDatas[i].count += v.count;
                  orderDatas[i].total += v.count * v.price;
                  return;
                }
              }
              //如果找不到当前订单数据，则初始化数据
              let o = {};
              o.oid = v.oid;
              o.count = v.count;
              o.total = v.count * v.price;
              o.status = v.status;
              o.date = v.createdAt;
              o.data = [v];
              orderDatas.push(o);
            });
            this.orderData = orderDatas.reverse();
          }
        });
      },
      //确认收货
      confirmReceive(item, index) {
        //验证token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面
          this.$toast("请先登录");
          return this.$router.push({ name: "Login" });
        }
        //发起请求
        this.axios({
          method: "POST",
          url: "/receive",
          data: {
            appkey: this.appkey,
            tokenString,
            oid: item.oid,
          },
        }).then((result) => {
          console.log(result);
          if (result.data.code == 700) {
            //token检验无效，跳转到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 80000) {
            if (this.tabIndex == 1) {
              this.orderData.splice(index, 1);
            }
            item.status = 2;
          }
        });
      },
      //删除订单
      removeOrder(oid, index) {
        //验证token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面
          this.$toast("请先登录");
          return this.$router.push({ name: "Login" });
        }
        //发起请求
        this.axios({
          method: "POST",
          url: "/removeOrder",
          data: {
            appkey: this.appkey,
            tokenString,
            oid,
          },
        }).then((result) => {
          console.log(result);
          if (result.data.code == 700) {
            //token检验无效，跳转到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 90000) {
            this.orderData.splice(index, 1);
          }
        });
      },
    },
  };
  </script>
  <style lang="less" scoped>
  .order {
    padding-top: 50px;
    .order-box {
      margin: 10px 0 10px 0;
    }
    /deep/ .van-tabs {
      background-color: #fff;
    }
  }
  .bg-content {
    background-color: transparent !important;
    padding: 0 !important;
  }
  </style>