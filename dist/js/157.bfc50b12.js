"use strict";(self["webpackChunkrx"]=self["webpackChunkrx"]||[]).push([[157],{1918:function(t,e,a){a.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg-box"},[e("div",{staticClass:"bg"},[e("div",{staticClass:"bg-content"},[t._t("default")],2)])])},s=[],r={name:"BgBox"},o=r,n=a(1001),l=(0,n.Z)(o,i,s,!1,null,"16e5c8b8",null),c=l.exports},7273:function(t,e,a){a.d(e,{Z:function(){return c}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"order-item"},[e("div",{staticClass:"cell-item-box"},[e("div",{staticClass:"pro-info-box"},[t._m(0),e("div",{staticClass:"pro-info fl"},[e("div",{staticClass:"pro-info-text"},[e("div",{staticClass:"names clearfix"},[e("div",{staticClass:"pro-name fl"},[t._v(t._s(t.item.name))]),e("div",{staticClass:"pro-rule fl"},[t._v(t._s(t.item.rule))])]),e("div",{staticClass:"pro-enname"},[t._v(t._s(t.item.enname))])]),e("div",{staticClass:"pro-count-box clearfix"},[e("div",{staticClass:"pro-price fl"},[t._v("￥"+t._s(t.item.price))]),e("div",{staticClass:"step-box fr"},[t._v(" x "+t._s(t.item.count))])])])])])])},s=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"pro-img fl"},[e("img",{staticClass:"auto_img",attrs:{src:"http://www.kangliuyong.com:10002/images/product_large/IMG_0384_02.jpg",alt:""}})])}],r={name:"OrderItem",props:{item:{type:Object,default(){return{name:"名称",rule:"规格",enname:"英文名称",price:0,count:1}}}}},o=r,n=a(1001),l=(0,n.Z)(o,i,s,!1,null,"3bde32bf",null),c=l.exports},2157:function(t,e,a){a.r(e),a.d(e,{default:function(){return _}});var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"order"},[e("van-nav-bar",{attrs:{title:"我的订单","left-text":"返回","lett-arrow":"",fixed:""},on:{"click-left":t.back}}),e("BgBox",[t.isHas?e("div",[e("van-tabs",{on:{change:t.changeTab},model:{value:t.tabIndex,callback:function(e){t.tabIndex=e},expression:"tabIndex"}},t._l(t.tabData,(function(a,i){return e("van-tab",{key:i,attrs:{title:a.title}},[e("div",t._l(t.orderData,(function(a,i){return e("div",{key:a.oid,staticClass:"oredr-box"},[e("orderLists",{attrs:{"info-title-left":a.oid,date:t._f("formatDate")(a.date,"yyyy-MM-dd hh:mm:ss"),count:a.count,total:a.total,"is-receive":2==a.status},on:{"confirm-receive":function(e){return t.confirmReceive(a,i)},remove:function(e){return t.removeOrder(a.oid,i)}}},t._l(a.data,(function(t,a){return e("OrderItem",{key:a,attrs:{item:t}})})),1)],1)})),0)])})),1)],1):t._e()])],1)},s=[],r=a(1918),o=function(){var t=this,e=t._self._c;return e("div",{staticClass:"order-lists"},[e("div",{staticClass:"pro-box"},[e("div",{staticClass:"info-boxs clearfix"},[e("div",{staticClass:"info-title fl"},[t._v(t._s(t.infoTitleLeft))]),e("div",{staticClass:"re-info fl"},[t.isReceive?e("div",{staticClass:"clearfix"},[e("div",{staticClass:"fl"},[t._v("已完成")]),e("div",{staticClass:"fl delet",on:{click:t.remove}},[e("van-icon",{attrs:{size:"19",name:"delete"}})],1)]):e("div",{staticClass:"qrsh",on:{click:t.confirmReceive}},[t._v("确认收货")])])]),e("div",[e("div",{staticClass:"cell-list"},[t._t("default")],2),e("div",{staticClass:"bottom-info"},[e("div",{staticClass:"date"},[t._v(t._s(t.date))]),e("div",{staticClass:"clearfix"},[e("div",{staticClass:"fl"},[t._v("共计："+t._s(t.count)+"件")]),e("div",{staticClass:"fr"},[t._v("合计："+t._s(t.total))])])])])])])},n=[],l={name:"OrderLists",props:{infoTitleLeft:{type:String,default:"左边标题"},isRight:{type:Boolean,default:!1},date:{type:String,default:"1970-01-01 00:00:00"},count:{type:Number,default:0},total:{type:[Number,String],default:0},isReceive:{type:Boolean,default:!1}},data(){return{}},created(){},methods:{confirmReceive(){this.$emit("confirm-receive")},remove(){this.$emit("remove")}}},c=l,d=a(1001),u=(0,d.Z)(c,o,n,!1,null,"24ce69e8",null),f=u.exports,v=a(7273),m={name:"order",data(){return{tabIndex:0,tabData:[{title:"全部"},{title:"进行中"},{title:"已完成"}],orderData:{},isHas:!0}},components:{BgBox:r.Z,OrderItem:v.Z,OrderLists:f},created(){this.getOrderDataByStatu()},methods:{back(){this.$router.back(-1)},changeTab(t,e){this.getOrderDataByStatu()},getOrderDataByStatu(){let t=localStorage.getItem("__tk");if(!t)return this.$toast("请先登录"),this.$router.push({name:"Login"});this.axios({method:"GET",url:"/findOrder",params:{appkey:this.appkey,tokenString:t,status:this.tabIndex}}).then((t=>{if(console.log(t),700==t.data.code)this.$router.push({name:"Login"});else if(7e4==t.data.code){if(0==this.tabIndex&&0==t.data.result.length)return void(this.isHas=!1);let e=[];t.data.result.map((t=>{for(let i=0;i<e.length;i++)if(e[i].oid==t.oid)return e[i].data.push(t),e[i].count+=t.count,void(e[i].total+=t.count*t.price);let a={};a.oid=t.oid,a.count=t.count,a.total=t.count*t.price,a.status=t.status,a.date=t.createdAt,a.data=[t],e.push(a)})),this.orderData=e.reverse()}}))},confirmReceive(t,e){let a=localStorage.getItem("__tk");if(!a)return this.$toast("请先登录"),this.$router.push({name:"Login"});this.axios({method:"POST",url:"/receive",data:{appkey:this.appkey,tokenString:a,oid:t.oid}}).then((a=>{console.log(a),700==a.data.code?this.$router.push({name:"Login"}):8e4==a.data.code&&(1==this.tabIndex&&this.orderData.splice(e,1),t.status=2)}))},removeOrder(t,e){let a=localStorage.getItem("__tk");if(!a)return this.$toast("请先登录"),this.$router.push({name:"Login"});this.axios({method:"POST",url:"/removeOrder",data:{appkey:this.appkey,tokenString:a,oid:t}}).then((t=>{console.log(t),700==t.data.code?this.$router.push({name:"Login"}):9e4==t.data.code&&this.orderData.splice(e,1)}))}}},p=m,h=(0,d.Z)(p,i,s,!1,null,"23845fff",null),_=h.exports}}]);
//# sourceMappingURL=157.bfc50b12.js.map