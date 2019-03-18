<template>
<div class="my-msg-view">
    <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
            right-text=""   title="我的钱包"  >
               <van-icon name="arrow-left" slot="left" style="color:#292726"/>
    </van-nav-bar>


  <div class="content">

    <div class="aui-content aui-margin-b-15 ">

     <ul class="aui-list aui-media-list msg-list" v-for="l in list">

          <li class="aui-list-item aui-list-item-middle ">
              <div class="aui-media-list-item-inner">
                  <div class="aui-list-item-media" style="width: 3rem;">
                 
                    <img :src="src+l.lucky_img" class="aui-img-round aui-list-img-sm img-head">                  </div>
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-text">
                          <div class="aui-list-item-title aui-font-size-14 msg-title">红包</div>
                          <div class="aui-list-item-right ">
                            <span class="count">
                             + {{l.money}}
                           </span>
                          </div>
                      </div>
                      <div class="aui-list-item-text msg-cont">
                          {{l.lucky_title}}
                      </div>
                      <div class="aui-list-item-text msg-time">
                         {{formatDateTime(l.create_time)}}
                      </div>
                  </div>
              </div>
          </li>

      </ul>

    </div>
</div>

   
</div>
  
</template>

<script>
import { src, getMyLucky } from '../../index/services';

export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      src: src,
      list: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getWallet() {
      getMyLucky(this.$ls.get('token')).then(rep => {
        this.list = rep
        // alert(JSON.stringify(rep))
      })
    },
    formatDateTime(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return m + '-' + d + ' ' + h + ':' + minute
    },
  },
  mounted() {
    this.getWallet()
  }

}
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.my-msg-view {
  height: 100%;
  overflow-y: hidden;
  text-align: center;
  background-color: #fff;
  .van-field--has-textarea .van-field__control {
    min-height: px2rem(300);
  }

  .van-hairline--bottom::after {
    border: none;
  }
  .van-cell:not(:last-child)::after {
    border-bottom-width: 0;
  }
  .van-nav-bar {
    height: px2rem(88);
    background-color: #fff !important;
    border-bottom: 1px solid #e6eaed;
  }

  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(160);
    .van-pull-refresh__track {
      height: 100%;
    }

    .msg-list {
      margin-top: -1px;
      .img-head {
        width: px2rem(100);
        height: px2rem(100);
      }
      .msg-list-inner {
        margin-left: px2rem(-40);
      }
      .count {
        color: #ff5f53;
        font-size: px2rem(40);
        font-weight: bold;
      }
      .msg-title {
        font-weight: 500;
        font-size: px2rem(30);
      }
      .msg-cont {
        color: #646261;
        font-size: px2rem(28);
      }
      .msg-time {
        color: #9d9a99;
        font-size: px2rem(24);
      }
    }
  }
}
</style>

