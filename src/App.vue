<template>
  <div id="app">
    <router-view/>


  </div>

</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
}

.auto_img{
  width: 100%;
  display: block;
  height: 100%;
}
.fl{
  float: left;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
}
.fr{
 
 float: right;
}
</style>
