<template>
    <div class="order-lists">
      <div class="pro-box">
        <div class="info-boxs clearfix">
          <div class="info-title fl">{{ infoTitleLeft }}</div>
          <div class="re-info fl">
            <div class="qrsh" v-if="!isReceive" @click="confirmReceive">确认收货</div>
            <div class="clearfix" v-else>
              <div class="fl">已完成</div>
              <div class="fl delet" @click="remove">
                <van-icon size="19" name="delete" />
              </div>
            </div>
          </div>
        </div>
  
        <div>
          <div class="cell-list">
            <slot></slot>
          </div>
          <div class="bottom-info">
            <div class="date">{{ date }}</div>
            <div class="clearfix">
              <div class="fl">共计：{{ count }}件</div>
              <div class="fr">合计：{{ total }}</div>
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
      //左标题
      infoTitleLeft: {
        type: String,
        default: "左边标题",
      },
      //是否显示右边信息
      isRight: {
        type: Boolean,
        default: false,
      },
      date: {
        type: String,
        default: "1970-01-01 00:00:00",
      },
      count: {
        type: Number,
        default: 0,
      },
      total: {
        type: [Number, String],
        default: 0,
      },
      //确认收货
      isReceive: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    created() {},
    methods: {
      //确认收货
      confirmReceive() {
        this.$emit("confirm-receive");
      },
      remove() {
        this.$emit("remove");
      },
    },
  };
  </script>
    <style lang="less" scoped>
  .order-lists {
    margin-top: 10px;
    .pro-box {
      background-color: #fff;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      padding: 10px;
      margin-bottom: 10px;
      .info-boxs{
        line-height: 30px;
        
        font-size: 14px;
        .info-title {
        font-size: 12px;
        line-height: 30px;
        width: 85%;
      }
   .qrsh{
                margin-top: 0px;
                line-height: 30px;
                float: right;
                font-size: 12px;
            }
           
        
      }
      
      .cell-list {
        padding-bottom: 20px;
        border-bottom: 1px dashed rgb(227, 203, 203);
      }
      .bottom-info {
        padding-top: 20px;
        font-size: 14px;
        position: relative;
       
        .date {
          margin-bottom: 10px;
          font-size: 12px;
        }
        .fl {
          font-size: 14px;
          margin-bottom: 50px;
        }
        .fr {
          margin-bottom: 50px;
          font-size: 15px;
          
        }
      }
      .delete {
        width: 19px;
        height: 19px;
        margin-left: 10px;
        /deep/ .van-icon {
          color: #bbbbbb;
        }
      }
    }
    
  }
  </style>
    <style lang="less" scoped>
  </style>