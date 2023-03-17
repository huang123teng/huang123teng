<template>
    <div class="address">
        <van-nav-bar title="地址列表"
         left-text="返回"
         left-arrow fixed 
         @click-left="back" />
         <BgBox>
         <div>
            <van-address-list 
            default-tag-text="默认"
             :switchable="false" 
             :list="list" @add="add"/>
         </div>
        </BgBox>
    </div>

</template>
<script>
import BgBox from '../components/BgBox.vue'
export default {
    name: 'Address',
    data() {
        return {
            list: [],
        }
    },
    components: {
        BgBox,
    },
    created() {
        this.getAddressData()
    },
    methods: {
        //返回
        back() {
            this.$router.go(-1);
        },
        //；获取列表数据
        getAddressData() {
            //获取token
            let tokenString = localStorage.getItem("__tk");
            if (!tokenString) {
                //跳回登录页面
                this.$toast("请先登录");
                return this.$router.push({ name: "Login" });
            }
            //发送请求
            //发起请求
            this.axios({
                method: 'GET',
                url:'/findAddress',
                params: {
                    appkey: this.appkey,
                    tokenString,
                }
            }).then((result) => {
                console.log(result);
                if(result.data.code == 700){
                    //验证token无效，跳转到登录页面
                    this.$router.push({name:"Login"});
                }else if(result.data.code ==20000){
                    result.data.result.map(v =>{
                        v.isDefault = Boolean(v.isDefault);
                        v.id = v.aid;
                        v.address = `${v.province}${v.city}${v.county}${v.addressDetail}`
                       
                    })
                    this.list = result.data.result;
                }

            })
        },
        //
        add(){
            this.$router.push({name:"NewAddress"})
        }
    }
}
</script>
<style lang="less" scoped>
.address{
    /deep/.van-address-item{
        border-bottom: 1px solid #cccccc;
    }
}
</style>