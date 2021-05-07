<template>
  <div class="my-msg-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      :title="title"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">
      <div class="aui-row kong" v-show="list.length == 0">
        <img class="img" src="../../../../assets/images/my/kong@3x.png" />
        <div class="title">暂无{{ title }}</div>
      </div>
      <pull-to :bottom-load-method="refresh">
        <div class="aui-content aui-margin-b-15 ">
          <ul class="aui-list aui-media-list msg-list" v-for="l in list">
            <li class="aui-list-item aui-list-item-middle ">
              <div class="aui-media-list-item-inner">
                <div class="aui-list-item-media" style="width: 4rem;">
                  <img
                    v-if="l.head.substring(0, 4) == 'http'"
                    :src="l.head"
                    class="aui-img-round aui-list-img-sm img-head"
                  />

                  <img
                    v-else
                    :src="src + l.head"
                    class="aui-img-round aui-list-img-sm img-head"
                  />
                </div>
                <div class="aui-list-item-inner msg-list-inner">
                  <div class="aui-list-item-text">
                    <div class="aui-list-item-title aui-font-size-14 msg-title">
                      {{ l.name }}
                    </div>
                    <div class="aui-list-item-right msg-time">
                      {{ formatDateTime(l.time) }}
                    </div>
                  </div>
                  <div class="aui-list-item-text msg-cont">
                    【{{ l.type }}】 {{ l.title }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </pull-to>
    </div>
  </div>
</template>

<script>
import PullTo from "vue-pull-to";
import { src, getMsgZan } from "../../index/services";

export default {
  store: ["paddingTop", "token"],
  components: {
    PullTo
  },
  data() {
    return {
      src: src,
      title: "",
      list: [],
      param: {
        token: "",
        page: 1,
        size: 10
      }
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    refresh(loaded) {
      this.param.page++;
      this.getMsgZan(loaded);
    },
    getMsgZan(loaded) {
      this.param.token = this.$ls.get("token");

      getMsgZan(this.param).then(rep => {
        const rs = rep.zanList;
        for (const r of rs) {
          this.list.push(r);
        }
      });

      this.isLoading = false;
      if (loaded) {
        loaded("done");
      }
    },
    formatDateTime(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return m + "-" + d + " " + h + ":" + minute;
    }
  },
  created() {
    this.title = this.$route.query.title;

    this.getMsgZan();
  }
};
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

    .msg-list {
      text-align: center;
      .xihuan {
        width: px2rem(88);
        height: px2rem(88);

        border-radius: px2rem(18);
        display: inline-block;
        line-height: px2rem(88);
        .img {
          width: px2rem(42);
          height: px2rem(42);
        }
      }

      .title {
        font-weight: bold;
        font-size: px2rem(28);
      }
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
      .msg-title {
        font-weight: 500;
        font-size: px2rem(30);
      }
      .msg-cont {
        color: #646261;
        font-size: px2rem(26);
      }
      .msg-time {
        color: #9d9a99;
        font-size: px2rem(24);
      }
    }
  }
}
</style>

