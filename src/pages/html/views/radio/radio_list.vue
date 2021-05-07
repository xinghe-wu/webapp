<template>
  <div class="radio-list-view">
    <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft" right-text="" title="电台列表">
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">

      <div class="title">
        本地电台
      </div>
      <section class="aui-grid ">
        <ul class="aui-list aui-media-list radio-list">

          <li class="aui-list-item aui-list-item-middle" v-for="l in list" @click="onClickLeft" v-if="l.city=='杭州'">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media" style="width:5rem;">
                <img :src="src+l.radio_img" class="radio-list-img">
              </div>
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title aui-font-size-14 radio-list-title">{{l.radio_name}}</div>
                  <div class="aui-list-item-right ">
                    <!-- <span class="count">
                      <img src="../../../../assets/images/radio/listen_in.png" style="width:20px;"> 201w
                    </span> -->
                  </div>
                </div>
                <div class="aui-list-item-text radio-list-cont">
                  正在直播：{{l.live_name}}
                </div>
                <div class="aui-list-item-text radio-list-anchor">
                  主播：{{l.compere}}
                </div>
              </div>
            </div>
          </li>

        </ul>
      </section>

      <div class="interval" />

      <div class="title">
        其它电台
      </div>
      <section class="aui-grid ">
        <ul class="aui-list aui-media-list radio-list">

          <li class="aui-list-item aui-list-item-middle" v-for="l in list" @click="onClickLeft" v-if="l.city!='杭州'">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media" style="width:5rem;">
                <img :src="src+l.radio_img" class="radio-list-img">
              </div>
              <div class="aui-list-item-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title aui-font-size-14 radio-list-title">{{l.radio_name}}</div>
                  <div class="aui-list-item-right ">
                    <!-- <span class="count">
                      <img src="../../../../assets/images/radio/listen_in.png" style="width:20px;"> 201w
                    </span> -->
                  </div>
                </div>
                <div class="aui-list-item-text radio-list-cont">
                  正在直播：{{l.live_name}}
                </div>
                <div class="aui-list-item-text radio-list-anchor">
                  主播：{{l.compere}}
                </div>
              </div>
            </div>
          </li>

        </ul>
      </section>
    </div>

  </div>

</template>

<script>
import { getRadioList, src } from '../../index/services';

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
    }

  },
  mounted() {
    getRadioList().then(rep => {
      this.list = rep
    })
  }

}
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.radio-list-view {
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

    .interval {
      background-color: #f2f4f5;
      height: px2rem(30);
    }

    .title {
      font-size: px2rem(34);
      font-weight: bolder;
      float: left;
      padding: px2rem(30);
    }

    .radio-list-img {
      width: px2rem(180);
      height: px2rem(180);
    }
    .radio-list-title {
      font-size: px2rem(30);
      font-weight: bolder;
      color: #292726;
    }

    .radio-list-cont {
      font-size: px2rem(26);
      font-weight: 500;
      color: #646261;
    }

    .radio-list-anchor {
      font-size: px2rem(26);
      font-weight: 500;
      color: #646261;
    }
  }
}
</style>

