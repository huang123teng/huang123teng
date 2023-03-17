<template>
    <div class="my">
        <div class="my-bg">
            <img :src="userInfo.userBg" alt="">
        </div>
        <div class="my-info">
            <div class="clearfix">
                <div class="my-img fl ">
                    <img src="../assets/images/0001.jpg" alt="">
                </div>
                <div class="my-info-box fl ">
                    <div class="user-name">{{userInfo.nickName}}</div>
                    <div class="user-desc">这个家伙很懒，什么都没有留下</div>
                </div>
            </div>
            <div class="list-box">
                <van-cell v-for="(item,index) in listData" :key="index" :title="item.title" is-link
                    @click="goPage(item.name)" />
            </div>
        </div>
    </div>
</template>
<script>
//默认导出组件
export default {
    //组件名称
    name: "My",
    data() {
        return {
            listData: [
                {
                    title: "个人资料",
                    name: "Account",
                },
                {
                    title: "我的订单",
                    name: "Order",
                },
                {
                    title: "我的收藏",
                    name: "Like",
                },
                {
                    title: "地址管理",
                    name: "Address",
                },
            ],
            //用户信息
            userInfo: {}
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        //获取用户信息
        getUserInfo() {
            //获取token
            let tokenString = localStorage.getItem("__tk");
            if (!tokenString) {
                this.$toast("请先登录");
                return this.$router.push({ name: "Login" });
            }
            //发起请求
            this.axios({
                method:"GET",
                url:"/findMy",
                params:{
                    appkey:this.appkey,
                    tokenString,
                },
            }).then((result) =>{
                console.log(result);
                if(result.data.code == 700){
                    //token验证无效，跳转到登录页面
                    this.$route.push({name:"Login"});
                }else if (result.data.code =="A001"){
                    this.userInfo = result.data.result[0]
                }
            });
        },
        //页面跳转
        goPage(name){
            this.$router.push({name})
        }
    }
}
</script>
<style lang="less" scoped>
.my{
    .my-bg{
        width: 100%;
        height: 180px;
        background-color: #fff;
        overflow: hidden;
        .img{
            width: 100%;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
    }
    .my-info{
        margin: 0 10px;
        background-color: #ffffffd0;
        position: relative;
        height: 300px;
        top: -50px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 10px 10px 0  10px;
        .my-img{
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;
            background-color: #fff;
        }
        .my-info-box{
            width: calc(~"100% - 90px");
            height: 70px;
            .user-name{
                height: 30px;
                font-weight: bold;
                font-size: 18px;
                line-height: 30px;
            }
            .user-desc{
                font-size: 14px;
                height: 40px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                line-height: 40px;
            }
        }
        .list-box{
            margin-top: 50px;
            /deep/.van-cell{
                border-bottom: 1px solid #f5f5f5;
                padding: 15px 0;
                &:last-child{
                    border-bottom: none;
                }
                span{
                    font-size: 16px;
                    color: #000;
                }
            }
        }
    }
}
</style>