<template>
  <div class="menu">
    <div class="menu-nav">
      <!-- 搜索 -->
      <div class="menu-search">
        <van-search placeholder="请输入搜索关键词" @focus="searchFocus" />
      </div>
      <!-- 分类菜单 -->
      <div class="menu-option">
        <div
          class="menu-item"
          v-for="(item, index) in menuOption"
          :key="index"
          @click="toggleMenu(index, item.type)"
        >
          <div class="m-item">
            <!-- 图标 -->
            <div class="m-icon">
              <img
                class="auto_img"
                :src="menuIndex == index ? item.activeIcon : item.inactiveIcon"
              />
            </div>
            <!-- 标题 -->
            <div class="m-text" :class="{ active: menuIndex == index }">
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品信息 -->
    <div class="menu-product ">
     <div class="m-pro-item clearfix" v-for="(item,index) in productData" :key="index">
        <div class="pro-img fl">
          <img class="auto_img" :src="item.smallImg" alt="" />
        </div>
        <div class="text fl">
          <div class="pro-text">
            <div class="pro-name">{{ item.name }}</div>
            <div class="pro-enname">{{ item.enname }}</div>
          </div>
        </div>
        <div class="price fl">￥{{ item.price }}</div>
     </div>
    </div>
  </div>
</template>
<script>
import "../assets/less/menu.less";
//默认导出组件
export default {
  //组件名称
  name: "Menu",

  data() {
    return {
      menuIndex: 0,
      menuOption: [
        {
          title: "推荐",
          inactiveIcon: require("../assets/images/icons_09.gif"),
          activeIcon: require("../assets/images/icons_21.gif"),
        },
        {
          title: "拿铁",
          inactiveIcon: require("../assets/images/icons_05.gif"),
          activeIcon: require("../assets/images/icons_19.gif"),
        },
        {
          title: "咖啡",
          inactiveIcon: require("../assets/images/icons_03.gif"),
          activeIcon: require("../assets/images/icons_18.gif"),
        },
        {
          title: "瑞纳冰",
          inactiveIcon: require("../assets/images/icons_07.gif"),
          activeIcon: require("../assets/images/icons_20.gif"),
        },
      ],
      productData: [],
    };
  },
  created() {
    this.getTypes();
  },
  methods: {
    toggleMenu(index, type) {
      if (this.menuIndex == index) {
        return;
      }
      this.menuIndex = index;
      this.getProductByType(type);
    },
    getTypes() {
      this.axios({
        method: "GET",
        url: "/type",
        params: {
          appkey: this.appkey,
        },
      }).then((result) => {
        console.log(result);
        if (result.data.code == 400) {
          let data = result.data.result;
          console.log(data);
          data.unshift({
            type: "isHot",
            typeDesc: "推荐",
          });
          this.menuOption.map(v => {
            for (let i = 0; i < data.length; i++) {
              if (v.title == data[i].typeDesc) {
                v.type = data[i].type;
                break;
              }
            }
          });
          let type = this.menuOption[this.menuIndex].type;
          this.getProductByType(type);
        }
      });
    },
    getProductByType(type) {
      let params = {
        appkey: this.appkey,
      };
      if (type == "isHot") {
        params.key = "isHot";
        params.value = 1;
      } else {
        params.key = "type";
        params.value = type;
      }
      this.axios({
        method: "GET",
        url: "/typeProducts",
        params,
      }).then((result) => {
        console.log(result.data.result);
        if (result.data.code == 500) {
          this.productData = result.data.result;
        }
      });
    },
    goDetail(pid){
      this.$router.push({name:"Detail",params:{pid}});
    },
    searchFocus(){
      this.$router.push({name:"Search"});
    }
    
  },
};
</script>
<style lang = "less" scoped>
</style>