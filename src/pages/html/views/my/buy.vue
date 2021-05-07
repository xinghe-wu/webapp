<template>
  <div class="my-subscribe-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      title="VIP栏目"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="aui-row kong">
      <img class="img" src="../../../../assets/images/my/kong@3x.png" />
      <div class="title">
        暂无VIP栏目记录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      subscribeList: [],
      columnList: [],
      query: {
        token: "",
        page: 1,
        size: 6,
        id: 1
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  mounted() {}
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.my-subscribe-view {
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
  }

  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(160);
    .van-pull-refresh__track {
      height: 100%;
    }
    .subscribe {
      .ad_list {
        margin-top: -1px;
      }
      .ad-list-cont {
        padding-top: px2rem(10);
        padding-bottom: px2rem(10);
        .ad-img {
          width: px2rem(160);
          height: px2rem(160);
        }
        .ad_title {
          color: #292726;
          font-size: px2rem(30);
          font-weight: bold;
        }
        .ad_cont {
          text-align: left;
          font-size: px2rem(26);
          color: #646261;
        }
        .ad_anchor {
          color: #646261;
          font-size: px2rem(26);
        }
      }
    }
  }

  .kong {
    padding-bottom: px2rem(50);
    .img {
      width: px2rem(400);
      height: px2rem(290);
    }
    .title {
      color: #646261;
      font-size: px2rem(28);
      text-align: center;
      font-weight: bold;
    }
    .cont {
      padding-top: px2rem(10);
      font-size: px2rem(24);
      color: #9d9a99;
    }
  }

  .interval {
    background-color: #f2f4f5;
    height: px2rem(30);
  }

  .like {
    background-color: #fff;
    padding: px2rem(30);

    .title {
      font-size: px2rem(34);
      font-weight: bold;
      float: left;
    }
    .img {
      width: px2rem(216);
      height: px2rem(216);
    }
    .cont {
      color: #292726;
      font-size: px2rem(26);
      font-weight: bold;
    }
  }

  .change-btn {
    width: px2rem(180);
    height: px2rem(56);
    font-size: px2rem(28);
    text-align: center;
    display: inline-block;
  }
}
</style>

