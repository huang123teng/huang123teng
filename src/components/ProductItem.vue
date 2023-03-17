<template>
  <div class="product-item">
    <div>
      <div>
        <img class="auto_img" :src="item.smallImg" alt />
      </div>
      <div class="pro-name one_text">{{item.name}}</div>
      <div class="pro-enname one_text">{{item.enname}}</div>
      <div>
        <div class="pro-price">￥{{item.price}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:'ProductItem',
    props:{
      item:{
        type:Object,
        default(){
          return{};
        }
      }
    }
}
</script>
<style lang="less" scoped>
.product-item{
    .pro-name{
        margin-top: 10px;
        font-size: 14px;
    }
    .pro-enname{
        margin-top: 5px;
        margin-bottom: 10px;
        font-size: 12px;
        font-weight: bold;
    }
    .pro-price{
         font-size: 14px;
        font-weight: bold;
        color: #13339a;
    }
}
</style>