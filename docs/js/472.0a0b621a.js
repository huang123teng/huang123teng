"use strict";(self["webpackChunkrx"]=self["webpackChunkrx"]||[]).push([[472],{4472:function(t,e,i){i.r(e),i.d(e,{default:function(){return r}});var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"detail"},[e("van-nav-bar",{attrs:{title:"商品详细","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft,"click-right":function(e){t.showShare=!0}},scopedSlots:t._u([{key:"right",fn:function(){return[e("van-icon",{attrs:{name:"ellipsis",size:"20"}})]},proxy:!0}])}),e("van-share-sheet",{attrs:{title:"立即分享给好友",options:t.options},on:{select:t.onSelect},model:{value:t.showShare,callback:function(e){t.showShare=e},expression:"showShare"}}),e("div",[e("img",{staticClass:"auto_img",attrs:{src:t.productDetail.large_img,alt:""}})]),e("div",{staticClass:"pro_info_box"},[e("div",{staticClass:"pro_info"},[e("div",{staticClass:"pro_box clearfix"},[e("div",{staticClass:"fl"},[e("div",{staticClass:"pro_name"},[t._v(t._s(t.productDetail.name))]),e("div",{staticClass:"pro_enname"},[t._v(t._s(t.productDetail.ennmae))])]),e("div",{staticClass:"pro_price"},[t._v("￥"+t._s(t.productDetail.price))])]),e("div",{staticClass:"rule_box"},t._l(t.productDetail.rules,(function(i,s){return e("div",{key:s,staticClass:"rule_item clearfix"},[e("div",{staticClass:"rule_title fl"},[t._v(t._s(i.title))]),e("div",{staticClass:"fl"},t._l(i.rule,(function(s,a){return e("div",{key:a,staticClass:"r_item fl",class:{active:i.ruleIndex==a},on:{click:function(e){return t.toggleRule(i,a)}}},[t._v(" "+t._s(s.title)+" ")])})),0)])})),0),e("div",{staticClass:"c_box clearfix"},[e("div",{staticClass:"select_count fl"},[t._v("选择数量")]),e("div",{staticClass:"select_box fr"},[e("van-stepper",{attrs:{theme:"round","button-size":"22","disable-input":""}})],1)]),e("div",{staticClass:"desc_box"},[e("div",{staticClass:"pro_desc"},[t._v("商品描述")]),e("div",{staticClass:"desc_text"},t._l(t.productDetail.desc,(function(i,s){return e("div",{key:s,staticClass:"text_item"},[t._v(" "+t._s(s+1)+"、"+t._s(i)+" ")])})),0)])]),e("van-goods-action",[e("van-goods-action-icon",{attrs:{icon:"bag",text:"购物袋",color:"#000"}}),e("van-goods-action-icon",{attrs:{icon:"like",text:t.isLike?"已收藏":"未收藏",color:t.isLike?"#0c34ba":"#000"},on:{click:t.toggleLikeProduct}}),e("van-goods-action-button",{attrs:{color:"#566db8",text:"加入购物车"},on:{click:t.addShopbag}}),e("van-goods-action-button",{attrs:{color:"#7232dd",text:"立即购买"}})],1)],1)],1)},a=[],o={name:"Detail",data(){return{showShare:!1,options:[[{name:"微信",icon:"wechat"},{name:"朋友圈",icon:"wechat-moments"},{name:"微博",icon:"weibo"},{name:"QQ",icon:"qq"}],[{name:"复制链接",icon:"link"},{name:"分享海报",icon:"poster"},{name:"二维码",icon:"qrcode"},{name:"小程序码",icon:"weapp-qrcode"}]],pid:"",productDetail:{},isLike:!1,bagCount:0,product:{count:1}}},created(){this.pid=this.$route.params.pid,this.getProductDetail()},methods:{onClickLeft(){this.$router.back(-1)},onSelect(t){Toast(t.name),this.showShare=!1},getProductDetail(){this.axios({method:"GET",url:"/productDetail",params:{appkey:this.appkey,pid:this.pid}}).then((t=>{if(console.log(t),600==t.data.code){let e=t.data.result[0];e.desc=e.desc.split(/\n/),console.log(e.desc);let i=[],s=["tem","sugar","milk","cream"];s.map((t=>{let s={};s.title=e[t+"_desc"],console.log(s),s.ruleIndex=0,s.rule=[];let a=e[t].split("/");a.map((t=>{""!=t&&(s.rule.push({title:t}),console.log(s.rule))})),s.rule.length>0&&i.push(s)})),e.rules=i,this.productDetail=e}}))},toggleRule(t,e){t.ruleIndex=e},toggleLikeProduct(){let t=localStorage.getItem("__tk");if(!t)return this.$toast("请先登录"),this.$router.push({name:"Login"});let e=this.isLike?"/notLike":"/like";this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0}),this.axios({method:"POST",url:e,data:{appkey:this.appkey,pid:this.pid,tokenString:t}}).then((t=>{this.$toast.clear(),console.log(t),700==t.data.code?this.$router.push({name:"Login"}):800==t.data.code&&(this.isLike=!0)}))},addShopbag(){let t=localStorage.getItem("__tk");if(!t)return this.$toast("请先登录"),this.$router.push({name:"Login"});let e={tokenString:t,appkey:this.appkey,count:this.product.count,pid:this.pid},i=[];this.productDetail.rules.map((t=>{i.push(t.rule[t.ruleIndex].title),console.log(i)})),e.rule=i.join("/"),this.axios({method:"POST",url:"/addShopcart",data:e}).then((t=>{console.log(t),700==t.data.code?this.$router.push({name:"Login"}):3e3==t.data.code&&1==t.data.status&&this.dagCount++}))}}},l=o,n=i(1001),c=(0,n.Z)(l,s,a,!1,null,null,null),r=c.exports}}]);
//# sourceMappingURL=472.0a0b621a.js.map