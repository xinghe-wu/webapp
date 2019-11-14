<template>
  <div class="radio-list-view">
    <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft" right-text="" title="电台选择">
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">

      <div class="title">
        本地电台
      </div>
      <section class="aui-grid">
        <div class="aui-row">

          <div class="aui-col-xs-6" v-for="l in localList" @click="onClickLeft">
            <img :src="src + l.pic" class="radio-logo">
            <div class="aui-grid-label radio-list-title">{{l.name}}</div>
          </div>

        </div>
      </section>

      <div class="interval"></div>

      <div class="title">
        其它电台
      </div>
      <section class="aui-grid">
        <div class="aui-row">
          <div class="aui-col-xs-4" v-for="l in otherList">
            <img :src="src + l.pic" class="radio-logo-other">
            <div class="aui-grid-label radio-list-title">{{l.name}}</div>
          </div>

        </div>
      </section>

    </div>

  </div>

</template>

<script>
import { getVideo, src } from '../../index/services';

export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      src: src,
      localList: [],
      otherList: [],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {
    // Toast.loading();
    // this.type = this.$route.query.type;

    getVideo().then(rep => {
      this.localList = rep.data.local;
      this.otherList = rep.data.other;
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

    .radio-logo {
      width: px2rem(300);
      height: px2rem(300);
      border: 1px solid #e6eaed;
    }
    .radio-logo-other {
      width: px2rem(219);
      height: px2rem(219);
      border: 1px solid #e6eaed;
    }
    .radio-list-title {
      font-size: px2rem(26);
      font-weight: bolder;
      color: #292726;
    }
  }
}
</style>

