<template>
  <div class="my-msg-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      title="我的消息"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">
      <section class="aui-grid  msg-list">
        <div class="aui-row">
          <div class="aui-col-xs-3" @click="detail(1)">
            <div class="aui-badge" v-show="msg.zanCount > 0">
              {{ msg.zanCount }}
            </div>
            <div class="xihuan" style="background-color: #c252e7;">
              <img
                class="img"
                src="../../../../assets/images/my/xihuan@3x.png"
              />
            </div>
            <div class="aui-grid-label title">赞</div>
          </div>
          <div class="aui-col-xs-3" @click="detail(2)">
            <div class="aui-badge" v-show="msg.commentCount > 0">
              {{ msg.commentCount }}
            </div>
            <div class="xihuan" style="background-color: #30E19C;">
              <img
                class="img"
                src="../../../../assets/images/my/pinlun@3x.png"
              />
            </div>
            <div class="aui-grid-label title">评论</div>
          </div>
          <div class="aui-col-xs-3" @click="detail(3)">
            <!-- <div class="aui-badge">5</div> -->
            <div class="xihuan" style="background-color: #499EFD;">
              <img
                class="img"
                src="../../../../assets/images/my/sixin@3x.png"
              />
            </div>
            <div class="aui-grid-label title">@我的</div>
          </div>
          <div class="aui-col-xs-3" @click="detail(4)">
            <!-- <div class="aui-badge">6</div> -->
            <div class="xihuan" style="background-color: #FFA857;">
              <img class="img" src="../../../../assets/images/my/@@3x.png" />
            </div>
            <div class="aui-grid-label title">私信</div>
          </div>
        </div>
      </section>

      <div class="aui-content aui-margin-b-15 ">
        <ul class="aui-list aui-media-list msg-list" v-for="m in msg.zanList">
          <li class="aui-list-item aui-list-item-middle ">
            <div class="aui-media-list-item-inner">
              <div class="aui-list-item-media" style="width: 4rem;">
                <img
                  src="../../../../assets/images/radio/head3.png"
                  class="aui-img-round aui-list-img-sm img-head"
                />
              </div>
              <div class="aui-list-item-inner msg-list-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title aui-font-size-14 msg-title">
                    {{ m.name }}
                  </div>
                  <div class="aui-list-item-right msg-time">
                    {{ formatDateTime(m.time) }}
                  </div>
                </div>
                <div class="aui-list-item-text msg-cont">
                  {{ m.title }}
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
import { getUserMsg, src, postUserMsgDel } from "../../index/services";

export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      msg: {},
      list: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    detail(type) {
      var title;
      var list;
      if (type == 1) {
        title = "赞";
        list = this.msg.zanList;
      } else if (type == 2) {
        list = this.msg.commentList;
      } else if (type == 3) {
        title = "@我的";
        list = [];
      } else if (type == 4) {
        title = "私信";
        list = [];
      }
      this.$router.push({
        path: "/my/msg_detail",
        query: { title: title, list: list }
      });

      postUserMsgDel({ token: this.$ls.get("token"), type: type }).then(rep => {
        this.msg.zanCount = 0;
      });
    },
    getMsg() {
      getUserMsg(this.$ls.get("token")).then(rep => {
        this.msg = rep;
        alert(JSON.stringify(this.msg));
      });
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
      return h + ":" + minute;
    }
  },
  mounted() {
    this.getMsg();
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
        text-align: left;
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

