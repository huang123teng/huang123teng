<template>
    <div class="order-item">
        <div class="cell-item-box">
            <div class="pro-info-box">
                <div class="pro-img fl">
                    <img class="auto_img" src="http://www.kangliuyong.com:10002/images/product_large/IMG_0384_02.jpg"
                        alt="">

                </div>
                <div class="pro-info fl">
                    <div class="pro-info-text">
                        <div class="names clearfix">
                            <div class="pro-name fl">{{item.name}}</div>
                            <div class="pro-rule fl">{{item.rule}}</div>
                        </div>
                        <div class="pro-enname">{{item.enname}}</div>
                    </div>
                    <div class="pro-count-box clearfix">
                        <div class="pro-price fl ">￥{{item.price}}</div>
                        <div class="step-box fr"> x {{item.count}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "OrderItem",
    props: {
        item: {
            type: Object,
            default() {
                return {
                    name:'名称',
                    rule:'规格',
                    enname:'英文名称',
                    price:0,
                    count:1,
                }
            }
        }
    }
}
</script>
<style lang="less" scoped>
.order-item{
    .pro-info-box{
        height: 80px;
        margin-bottom: 10px;
        .pro-img{
            width: 80px;
            height: 80px;
            background-color: #ddd;
        }
        .pro-info{
            width: calc(~"100% - 90px");
            margin-left:10px;
            .pro-info-text{
                height: 50px;
                .names{
                    line-height: 16px;
                }
                .pro-enname{
                    font-size: 12px;
                    color: #999;
                    margin-top: 5px;
                }
                .pro-name{
                    font-size: 14px;
                    margin-right: 15px;
                }
                .pro-rule{

                    color: #999;
                    font-size: 12px;
                }
            }
            .pro-count-box{
                height: 30px;
                // position: absolute;
                .pro-price{
                    // position: relative;
                    font-size: 14px;
                    color: #00f;
                    font-weight: bold;
                    line-height: 30px;
                    
                }
                .step-box{
                    
                    // position: relative;
                    line-height: 30px;
                    font-size: 12px;
                    margin-left: 80%;
                
                }
            }
        }
    }
}
</style>