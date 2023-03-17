<template>
  <div class="main">
    <div>
    <router-view></router-view>
    </div>
    <van-tabbar v-model="activeName"
     active-color="#0000ff" 
     inactive-color="#00adb5"
      route
      >
      <van-tabbar-item 
      v-for="(item, index) in tabbarData"
       :key="index" 
       :to="item.path" 
       :name="item.name" 
       :icon="item.icon"
        replace>
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeImg : item.inactiveImg" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "Main",
  data() {
    return {
      //激活标签的名称
      activeName: "Home",
      //底部导航栏数据
      tabbarData: [
        {
          title: "首页",
          icon: "home-o",
          // 标签名称
          name: "Home",
          path: "/main/home",
          //选中图片
          activeImg: require("../assets/images/home_active.png"),
          //未选中图片
          inactiveImg: require("../assets/images/home.png"),
        },
        {
          title: "菜单",
          icon: "search",
          // 标签名称
          name: "Menu",
          path: "/main/menu",
          //选中图片
          activeImg: require("../assets/images/menu_active.png"),
          //未选中图片
          inactiveImg: require("../assets/images/menu.png"),
        },
        {
          title: "购物袋",
          icon: "friends-o",
          // 标签名称
          name: "Shopbag",
          path: "/main/shopbag",
          //选中图片
          activeImg: require("../assets/images/shopbag_active.png"),
          //未选中图片
          inactiveImg: require("../assets/images/shopbag.png"),
        },
        {
          title: "我的",
          icon: "setting-o",
          // 标签名称
          name: "My",
          path: "/main/my",
          //选中图片
          activeImg: require("../assets/images/my_active.png"),
          //未选中图片
          inactiveImg: require("../assets/images/my.png"),
        },
      ],
    };
  },
};
</script>
<style lang="less" scope>
.main {
  padding-bottom: 50px;
}
</style>

