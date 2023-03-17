<template>
    <div class="pay">
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
      <div class="pay-box">
        <div class="select-address">
          <div>
            <span @click="showSelectAddressList"> 选择地址</span>
            <van-icon class="arrow" name="arrow" />
          </div>
          <div class="user-box">
            <div class="user-info">
              <div class="user-name">{{ currentAddress.name }}</div>
              <div class="user-phone">{{ currentAddress.tel }}</div>
              <div class="default-address" v-if="currentAddress.isDefault">
                默认
              </div>
            </div>
            <div class="detail-address">{{ currentAddress.addressDetail }}</div>
          </div>
        </div>
        <!-- 订单信息 -->
        <div class="order-info">
          <OrderList
            info-title-left="订单信息"
            :count="productInfo.count"
            :total="productInfo.total"
            :date="productInfo.date | formatDate('yyyy-MM-dd hh:mm:ss')"
          >
            <OrderItem
              v-for="(item, index) in products"
              :key="index"
              :item="item"
            ></OrderItem>
          </OrderList>
        </div>
      </div>
      <!-- 结算按钮 -->
      <div class="btn-box">
        <van-button type="primary" block round color="#00f" @click="payBox"
          >立即结算</van-button
        >
      </div>
      <van-popup position="bottom" is-link closeable v-model="isOpen">
        <div class="address-title">选择地址</div>
        <van-address-list
          default-tag-text="默认"
          @add="NewAddress"
          :list="list"
          @select="selectAddress"
        />
      </van-popup>
    </div>
  </template>
  <script>
  import OrderList from "../components/OrderList.vue";
  import OrderItem from "../components/OrderItem.vue";
  
  export default {
    name: "Pay",
    components: {
      OrderItem,
      OrderList,
    },
    data() {
      return {
        isOpen: false,
        //购物袋sid
        sids: [],
        products: [],
        productInfo: {
          count: 0,
          total: 0,
        },
        chosenAddressId: "",
        list: [],
        currentAddress: {},
      };
    },
    created() {
      //截取查询参数
      this.sids = this.$route.query.sids.split("-");
      this.getShopbagBySids();
      this.getAddressData();
    },
    methods: {
      //展示选择的地址列表
      showSelectAddressList() {
        this.isOpen = true;
      },
      //选择地址
      selectAddress(item, index) {
        this.isOpen = false;
        this.currentAddress = item;
        console.log(item);
      },
      onClickLeft() {
        //返回上一级
        this.$router.back(-1);
      },
      getShopbagBySids() {
        //验证token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面
          this.$toast("请先登录");
          return this.$router.push({ name: "Login" });
        }
        //发起请求
        this.axios({
          methods: "GET",
          url: "/commitShopcart",
          params: {
            appkey: this.appkey,
            tokenString,
            sids: JSON.stringify(this.sids),
          },
        }).then((result) => {
          console.log(result);
          if (result.data.code == 700) {
            //token检验无效，跳转到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 50000) {
            //如果没有商品可购买，则跳转到首页页面
            if (result.data.result.length == 0) {
              return this.$router.push({ name: "Home" });
            }
            result.data.result.map((v) => {
              this.productInfo.count += v.count;
              this.productInfo.total += v.count * v.price;
              this.productInfo.date = v.updated_at;
            });
            this.products = result.data.result;
          } else {
            this.$toast(result.data.mag);
          }
        });
      },
      //获取地址列表
      getAddressData() {
        //验证token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面
          this.$toast("请先登录");
          return this.$router.push({ name: "Login" });
        }
        this.axios({
          methods: "GET",
          url: "/findAddress",
          params: {
            appkey: this.appkey,
            tokenString,
          },
        }).then((result) => {
          console.log(result);
          if (result.data.code == 700) {
            //token检验无效，跳转到登录页面
            this.$router.push({ name: "Login" });
          } else if (result.data.code == 20000) {
            result.data.result.map((v) => {
              v.isDefault == Boolean(v.isDefault);
              v.id == v.aid;
              v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`;
              if (v.isDefault) {
                this.chosenAddressId = v.aid;
                this.currentAddress = v;
              }
            });
            this.list = result.data.result;
          }
        });
      },
      //新增地址
      NewAddress() {
        this.$router.push({ name: "NewAddress" });
      },
      pay() {
        //验证token
        let tokenString = localStorage.getItem("__tk");
        if (!tokenString) {
          //跳回登录页面
          this.$toast("请先登录");
          return this.$router.push({ name: "Login" });
        }
  
        this.axios({
          method: "POST",
          url: "/pay",
          data: {
            appkey: this.appkey,
            tokenString,
            sids: JSON.stringify(this.sids),
            phone: this.currentAddress.tel,
            address: this.currentAddress.address,
            receiver: this.currentAddress.name,
          },
        }).then((result) => {
          console.log(result);
          if (result.data.code == 700) {
            //token检验无效，跳转到登录页面
            this.$router.push({ name: "Login" });
          } else {
            this.$toast(result.data.msg);
            setTimeout(() => {
              this.$router.push({name:"Order"})
            });
          }
        });
      },
      payBox() {
        //判断是否填写收到地址
        if (!this.chosenAddressId) {
          this.$toast("请选择地址");
          return;
        }
        this.$dialog.confirm({
            title: "确认订单",
            message: "是否立即结算?",
          }).then(() => {
            this.pay();
          });
      },
  
    },
  };
  </script>
  <style lang="less" scoped>
  .pay {
    padding-top: 46px;

    .pay-box {
        padding: 10px;

        .select-address {
            background-color: #fff;
            padding: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            font-size: 14px;

            .user-box {
                margin-top: 20px;

                .user-info {
                    display: flex;
                    line-height: 19px;

                    .user-name {
                        margin: right 20px;
                        font-weight: bold;
                        margin-right: 20px;
                    }

                    .defanlt-address {
                        font-size: 12px;
                        background-color: #00f;
                        color: #fff;
                        width: 40px;
                        height: 20px;
                        text-align: center;
                        line-height: 21px;
                        border-radius: 10px;
                        margin-left: 20px;
                    }
                }

                .detail-address {
                    margin-top: 10px;
                    color: #999;
                }
            }

        }
    }

    .address-title {
        padding-top: 20px;
        padding-left: 20px;
    }

    .btn-box {
        position: fixed;
        left: 0;
        bottom: 0;
        padding: 10px;
        width: calc(~"100% - 20px");
    }

    /deep/.van-address-list__bottom {
        background-color: #ffffff00;
        margin-bottom: 10px;
    }
}
  </style>