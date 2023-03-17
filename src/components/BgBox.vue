<template>
  <div class="bg-box">
    <div class="bg">
      <div class= "bg-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script >
export default {
  name: "BgBox",
};
</script>
<style lang = "less" scoped>
.bg-box {
  .bg {
    height:100px;
    background-color: rgb(17, 3, 224);
  }
  .bg-content {
    margin: 0 10px;
    padding: 10px;
    position: relative;
    top: 60px;
    background-color: rgb(173, 152, 141);
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
}
</style>