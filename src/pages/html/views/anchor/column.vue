<template>
  <div class="colunm-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      title="听到栏目"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">
      <!-- <pull-to :top-load-method="refresh"> -->
      <div class="hot-column" v-show="listen">
        <div class="title">
          最热栏目
        </div>

        <swiper :options="swiperOption" class="hot-column-swiper">
          <swiper-slide v-for="l in listenList">
            <div class="aui-card-list" @click="programList(l)">
              <div class="aui-card-list-content">
                <img :src="src + l.img1" class="img" />
              </div>
              <div class="swiper-title">
                {{ l.name }}
              </div>
              <!-- this.msgList[i].head.substring(0, 4) == "http" -->
              <div class="swiper-cont">
                <span v-for="h in l.headList">
                  <img
                    v-if="h.substring(0, 4) == 'http'"
                    :src="h"
                    class="aui-img-round aui-list-img-sm img-head"
                  />

                  <img
                    v-else
                    :src="src + h"
                    class="aui-img-round aui-list-img-sm img-head"
                  />
                </span>
                <span> {{ l.listenCount }}人在听</span>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <div class="all-column">
        <div class="title">
          所有栏目
        </div>

        <div class="aui-content aui-margin-b-15">
          <ul
            class="aui-list aui-media-list ad_list"
            v-for="(d, index) in data"
            :key="index"
          >
            <li class="aui-list-item" @click="programList(d)">
              <div class="aui-media-list-item-inner ad-list-cont">
                <div class="aui-list-item-media">
                  <img :src="src + d.img" class="aui-list-img-sm anchor-head" />
                </div>
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-text">
                    <div class="aui-list-item-title ad_title">
                      {{ d.name }}
                    </div>
                  </div>
                  <div class="aui-list-item-text  ad_cont">
                    {{ d.brief }}
                  </div>
                  <div class="aui-list-item-text  ad_anchor">
                    主播：{{ d.compereName }} {{ d.listenCount }}在听
                  </div>
                  <!-- <img src="../../../../assets/images/radio/enroll.png"  style="width:50px;"/>
                        <img src="../../../../assets/images/radio/ad_ing.png"  style="width:80px;"/> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- </pull-to> -->
    </div>
  </div>
</template>

<script>
import PullTo from "vue-pull-to";
import { src, getColumn, getColumnListen } from "../../index/services";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      data: [],
      listenList: [],
      listen: false,
      src: src,
      isLoading: false,
      swiperOption: {
        slidesPerView: 2,
        slidesOffsetBefore: 20,
        spaceBetween: 100
      },
      query: {
        token: "",
        page: 1,
        size: 999,
        id: 1
      }
    };
  },
  methods: {
    render(loaded) {
      this.query.token = this.$ls.get("token");
      getColumn(this.query).then(rep => {
        this.data = rep.data;

        this.isLoading = false;
        if (loaded) {
          loaded("done");
        }
      });
    },

    getColumnListen() {
      getColumnListen({ token: this.$ls.get("token"), id: 1 }).then(rep => {
        this.listenList = rep.data;
        if (this.listenList.length > 0) {
          this.listen = true;
        }
      });
    },
    refresh(loaded) {
      this.render(loaded);
    },

    onClickLeft() {
      this.$router.go(-1);

      // this.$router.replace({
      //   path: "/program/list",
      //   query: { column: this.$ls.get("column") }
      // });
    },
    vote() {
      this.$router.push("/interaction/vote");
    },
    testClick() {
      this.$router.push("/program/test");
    },
    programList(data) {
      if (data.length === 0) {
      } else {
        this.$ls.set("column", data);
        this.$router.push({
          path: "/program/list",
          query: { column: data.id }
        });
      }
    }
  },
  components: {
    PullTo
  },
  mounted() {
    this.render();
    this.getColumnListen();
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
      .img {
        width: px2rem(460);
        height: px2rem(258);
      }
      .img-head {
        margin-left: px2rem(-10);
        vertical-align: middle;
        width: px2rem(40);
        height: px2rem(40);
      }
      .swiper-title {
        padding-top: px2rem(10);
        font-size: px2rem(28);
        font-weight: bold;
      }
      .swiper-cont {
        color: #646261;
        font-size: px2rem(24);
      }
      .hot-column-swiper {
        background-color: #fff;
        height: px2rem(370);
      }
    }

    .all-column {
      // margin-top: px2rem(30);
      background-color: #fff;
      .title {
        font-size: px2rem(30);
        font-weight: bold;
        padding: px2rem(30);
      }

      .ad_anchor {
        padding-top: px2rem(10);
        font-size: px2rem(26);
        color: #646261;
      }

      .ad_list {
        margin-top: -1px;
      }
      .ad-list-cont {
        padding-top: px2rem(10);
        padding-bottom: px2rem(10);
        .anchor-head {
          width: px2rem(160);
          height: px2rem(160);
        }
        .ad_title {
          color: #292726;
          font-size: px2rem(30);
          font-weight: bold;
        }
        .ad_cont {
          font-size: px2rem(26);
          color: #646261;
        }
      }
    }
  }
}
</style>

