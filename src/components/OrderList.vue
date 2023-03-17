<template>
    <div class="order-list">
        <div class="pro-box">
            <div class="info-boxs clearfix">
                <div class="info-title fl">{{ infoTitleLeft }}</div>
                <div class="re-info fl">
                    <div class="clearfix " >
                        
                    </div>
                </div>
            </div>
            <div>
                <div class="cell-list">
                    <!-- 商品信息 -->
                    <slot></slot>
                </div>
                <div class="bottom-info">
                    <div class="circle clearfix">
                        <div class="circle-box circle-left "></div>
                        <div class="circle-box circle-right " ></div>
                    </div>
                    <div class="date">{{ date }}</div>
                    <div class="clearfix">
                        <div class="fl">共计{{ count }}件</div>
                        <div class="fr" >合计 ￥ {{ total }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "OrderLists",
    props: {
        //左边标题
        infoTitleLeft: {
            type: String,
            default: "订单信息",
        },
        //是否显示右边信息
        isRight: {
            type: Boolean,
            default: false,
        },
        //时间
        date: {
            type: String,
            default: '1970-01-01 00:00:00',
        },
        //数量
        count: {
            type: Number,
            default: 0,
        },
        //订单总金额
        total: {
            type: [Number, String],
            default: 0,
        },
        
    },
    data() {
        return {};

    },
    created() { },
    methods: {
        //确认收货
      confirmReceive() {
        this.$emit("confirm-receive");
      },
       
    },
} 
</script>
<style lang="less" scoped>
.order-list {
    margin-top: 10px;

    .pro-box {
        background-color: #fff;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 10px;
        margin-bottom: 10px;
        // border-bottom: 5px solid #d2d2d2;
        .info-title {
            font-size: 14px;
            height: 30px;
        }
        .cell-list {
            padding-bottom: 20px;
            border-bottom: 1px dashed #ddd;
        }

        .bottom-info {
            padding-top: 20px;
            font-size: 14px;
            position: relative;

            .circle {
                position: absolute;
                top: -10px;
                width: 100%;
                height: 20px;

                .circle-box {
                    width: 20px;
                    height: 20px;
                    background-color: #f7f7f7;
                    border-radius: 50%;
                }

                .circle-left {
                    position: relative;
                    left: -20px;
                }

                .circle-right {
                    position: relative;
                  right: -100%;
                  top: -20px;
                }
            }

            .date {
                margin-bottom: 10px;
                font-size: 12px;
            }
.fr{
    margin-left: 76%;
    font-size: 13px;
    font-weight: bold;
}





        }

        .delete {
            width: 19px;
            height: 19px;
            margin-left: 10px;

            /deep/.van-icon {
                color: #bbbbbb;
            }
        }
    }
}
</style>