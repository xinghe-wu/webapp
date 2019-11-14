<template>
  <div class="colunm-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      title="听到主播"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">
      <pull-to :top-load-method="refresh">
        <div class="hot-column">
          <div class="title">
            主播排行榜
          </div>

          <div class="img-list">
            <div class="aui-col-xs-4">
              <div class="yajun-div" @click="anchor_detail(yajun_head_id)">
                <img
                  :src="src + yajun_head"
                  class="aui-img-round aui-list-img-sm yajun-img"
                />
              </div>
              <div class="name">{{ yajun_head_name }}</div>
            </div>
            <div class="aui-col-xs-4">
              <div class="guanjun-div" @click="anchor_detail(guanjun_head_id)">
                <img
                  :src="src + guanjun_head"
                  class="aui-img-round aui-list-img-sm guanjun-img"
                />
              </div>
              <div class="name">{{ guanjun_head_name }}</div>
            </div>
            <div class="aui-col-xs-4">
              <div class="jijun-div" @click="anchor_detail(jijun_head_id)">
                <img
                  :src="src + jijun_head"
                  class="aui-img-round aui-list-img-sm jijun-img"
                />
              </div>
              <div class="name">{{ jijun_head_name }}</div>
            </div>
          </div>
        </div>

        <div class="bg-line"></div>

        <div class="all-anchor">
          <div class="title">
            所有主播
          </div>

          <div class="aui-content aui-margin-b-15 ">
            <ul class="aui-list aui-media-list follow-list" v-for="d in data">
              <li
                class="aui-list-item aui-list-item-middle"
                @click="anchor_detail(d.id)"
              >
                <div class="aui-media-list-item-inner">
                  <div class="aui-list-item-media" style="width: 4rem;">
                    <img
                      :src="src + d.head"
                      class="aui-img-round aui-list-img-sm anchor-head"
                    />
                  </div>
                  <div class="aui-list-item-inner all-ancho-list-inner">
                    <div class="aui-list-item-text">
                      <div class="aui-list-item-title aui-font-size-14 name">
                        {{ d.name }}
                      </div>
                      <div class="aui-list-item-right">
                        <div v-if="d.follow" class="aui-btn btn">已关注</div>
                        <div
                          v-else
                          class="aui-btn btn-follow"
                          @click="compereFollow(d.id)"
                        >
                          关注
                        </div>
                      </div>
                    </div>
                    <div class="cont">
                      {{ d.introduce }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </pull-to>
    </div>
  </div>
</template>

<script>
import PullTo from "vue-pull-to";
import {
  src,
  getCompere,
  getCompereSort,
  postCompereFollow
} from "../../index/services";
import { Toast } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        slidesOffsetBefore: 20,
        spaceBetween: 100
      },
      data: [],
      compereSort: [],
      yajun_head: "",
      guanjun_head: "",
      jijun_head: "",
      jijun_head_name: "",
      yajun_head_id: 0,
      yajun_head_name: "",
      guanjun_head_id: 0,
      guanjun_head_name: "",
      jijun_head_id: 0,
      src: src,
      isLoading: false,
      query: {
        token: "",
        page: 1,
        size: 100,
        id: 1
      }
    };
  },
  methods: {
    render(loaded) {
      this.isLoading = true;
      this.query.token = this.$ls.get("token");
      getCompere(this.query).then(rep => {
        var list = rep.data;

        var len = list.length;

        if (len > 2) {
          this.yajun_head = list[1].head;
          this.guanjun_head = list[0].head;
          this.jijun_head = list[2].head;

          this.yajun_head_id = list[1].id;
          this.guanjun_head_id = list[0].id;
          this.jijun_head_id = list[2].id;

          this.yajun_head_name = list[1].name;
          this.guanjun_head_name = list[0].name;
          this.jijun_head_name = list[2].name;
          this.data = list.slice(3, len - 1);
        }

        this.isLoading = false;
        if (loaded) {
          loaded("done");
        }
      });

      // getCompereSort(this.query).then(rep => {
      //   this.compereSort = rep.data;

      //   this.yajun_head = this.compereSort[1].head;
      //   this.guanjun_head = this.compereSort[0].head;
      //   this.jijun_head = this.compereSort[2].head;

      //   this.yajun_head_id = this.compereSort[1].id;
      //   this.guanjun_head_id = this.compereSort[0].id;
      //   this.jijun_head_id = this.compereSort[2].id;

      //   this.yajun_head_name = this.compereSort[1].name;
      //   this.guanjun_head_name = this.compereSort[0].name;
      //   this.jijun_head_name = this.compereSort[2].name;
      // });
    },
    getCompere() {
      this.query.token = this.$ls.get("token");
      getCompere(this.query).then(rep => {
        this.data = rep.data;
        this.isLoading = false;
        if (loaded) {
          loaded("done");
        }
      });
    },
    anchor_detail(id) {
      this.$router.push({
        path: "/anchor/detail",
        query: { compereId: id, type: 0 }
      });
    },
    refresh(loaded) {
      this.render(loaded);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    vote() {
      this.$router.push("/interaction/vote");
    },
    compereFollow(id) {
      Toast.loading();
      postCompereFollow({ token: this.$ls.get("token"), compereId: id }).then(
        rep => {
          Toast.clear();
          Toast.success("关注成功");
          this.getCompere();
        }
      );
    }
  },
  components: {
    PullTo
  },
  mounted() {
    this.render();
  }
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.colunm-view {
  height: 100%;
  overflow-y: hidden;
  background-color: #f2f4f5;

  .van-nav-bar {
    color: #292726;
    height: px2rem(88);
    background-color: #fff !important;
    border-bottom: 1px solid #e6eaed;
  }

  .ad_img {
    width: px2rem(160);
  }
  .ad_title {
    color: #292726;
    font-weight: bold;
    font-size: px2rem(30);
  }

  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(160);
    .van-pull-refresh__track {
      height: 100%;
    }
    .hot-column {
      background-color: #fff;
      .title {
        font-size: px2rem(30);
        font-weight: bold;
        padding: px2rem(30);
      }
      .img-list {
        padding-bottom: px2rem(260);

        text-align: center;

        .name {
          color: #292726;
          font-size: px2rem(30);
          font-weight: bold;
        }

        .yajun-div {
          width: px2rem(174);
          height: px2rem(174);
          background-image: url("../../../../assets/images/radio/yajun@3x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          line-height: px2rem(174);
          display: inline-block;

          .yajun-img {
            margin-top: px2rem(38);
            width: px2rem(128);
            height: px2rem(128);
          }
        }

        .guanjun-div {
          margin-top: px2rem(-50);
          margin-left: px2rem(30);
          margin-right: px2rem(30);
          width: px2rem(222);
          height: px2rem(222);
          background-image: url("../../../../assets/images/radio/guanjun@3x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          line-height: px2rem(222);
          display: inline-block;

          .guanjun-img {
            margin-top: px2rem(46);
            width: px2rem(168);
            height: px2rem(168);
          }
        }

        .jijun-div {
          width: px2rem(174);
          height: px2rem(174);
          background-image: url("../../../../assets/images/radio/jijun@3x.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          line-height: px2rem(174);
          display: inline-block;

          .jijun-img {
            margin-top: px2rem(38);
            width: px2rem(128);
            height: px2rem(128);
          }
        }
      }

      .img-head {
        margin-left: px2rem(-10);
        vertical-align: middle;
        width: px2rem(40);
        height: px2rem(40);
      }
      .swiper-title {
        font-size: px2rem(28);
        font-weight: bold;
      }
      .swiper-cont {
        color: #646261;
        font-size: px2rem(24);
      }
    }

    .bg-line {
      height: px2rem(30);
    }

    .all-anchor {
      margin-top: px2rem(50);
      background-color: #fff;
      .title {
        font-size: px2rem(30);
        font-weight: bold;
        padding: px2rem(30);
      }
      .follow-list {
        margin-top: -1px;
        .all-ancho-list-inner {
          margin-left: px2rem(-30);
        }
        .anchor-head {
          width: px2rem(110);
          height: px2rem(110);
        }
        .name {
          font-size: px2rem(30);
          font-weight: bold;
        }
        .cont {
          margin-top: px2rem(10);
          color: #646261;
          font-size: px2rem(26);
          max-width: px2rem(430);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btn {
          width: px2rem(140);
          padding-top: px2rem(15);
          height: px2rem(60);
          font-size: px2rem(26);
        }
        .btn-follow {
          background-color: #ff5f53;
          color: #fff;
          width: px2rem(100);
          height: px2rem(56);
          font-size: px2rem(26);
        }
      }
    }
  }
}
</style>

