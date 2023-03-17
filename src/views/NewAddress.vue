<template>
    <div class="new-address">
        <van-nav-bar 
        title="新增地址" 
        left-text="返回" 
        left-arrow 
        fixed
         @click-left="back"
         
          />
        <van-address-edit
         show-postal 
         show-delete 
         show-set-default 
         show-search-result 
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :area-list="areaList"
        @save="save" 
         save-button-text="保存地址" />
    </div>
</template>
<script>
import areaList from "../assets/js/area";
export default {
    name: 'NewAddress',
    data() {
        return {
            areaList,
            //地址初始值
            addressInfo: {},
            //地址aid
            aid: "",
        }
    },
    created() { },
    methods: {
        //返回
        back() {
            this.$router.go(-1);
        },
        //保存地址
        save(content) {
            //获取token
            let tokenString = localStorage.getItem("__tk");
            if (!tokenString) {
                this.$toast("请先登录");
                return this.$router.push({ name: "Login" });
            }
            //
            let addressInfo = Object.assign({}, content);
            addressInfo.tokenString = tokenString;
            addressInfo.appkey = this.appkey;
            addressInfo.isDefault = Number(addressInfo.isDefault);
            this.address(addressInfo, "/addAddress");
        },
        
        //新增地址
        address(addressInfo, url) {
            this.axios({
                method: "POST",
                url,
                data: addressInfo,
            }).then((result) => {
                console.log(result);
                if (result.data.code == 700) {
                    //token检验无效，跳转到登录页面
                    this.$router.push({ name: "Login" });
                } else if (result.data.code == 9000) {
                    setTimeout(() => {
                        this.$router.push({ name: 'Address' })
                    }, 800)
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.new-address {
    padding-top: 46px;
}
</style>