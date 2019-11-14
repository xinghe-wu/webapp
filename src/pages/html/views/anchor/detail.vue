<template>
  <div class="detail">
    <!-- <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
            right-text=""   title="主播"  >
        <van-icon name="arrow-left" slot="left" style="color:#292726"/>
    </van-nav-bar> -->

    <header id="header" class="aui-bar aui-bar-nav">
      <div class="header">
        <div class="aui-row header-list" :style="{ paddingTop: paddingTop }">
          <div class="aui-col-xs-1" @click="onClickLeft">
            <van-icon name="arrow-left" />
          </div>
          <div class="aui-col-xs-10">
            &nbsp
          </div>
          <div class="aui-col-xs-1" @click="editClick" v-if="compere.edit == 1">
            <van-icon name="edit" class="header-icon" />
          </div>
        </div>

        <div class="aui-row">
          <div class="aui-col-xs-4">
            <img :src="src + compere.head" class="aui-img-round header-img" />
          </div>
          <div class="aui-col-xs-5">
            &nbsp
          </div>
          <div class="aui-col-xs-3">
            <div v-if="compere.follow" class="btn">已关注</div>
            <div v-else class="btn-follow" @click="compereFollow(compere.id)">
              关注
            </div>
            <!-- <img src="../../../../assets/images/radio/follow_btn.png"  style="width:100px;margin-top:50px"> -->
          </div>
        </div>

        <div class="aui-row cont">
          <div class="name">
            {{ compere.name }}
          </div>
          <div class="explain">
            {{ compere.introduce }}
          </div>
          <div class="count">{{ compere.follow_count }} 关注</div>
        </div>
      </div>
    </header>

    <div class="content1">
      <pull-to :bottom-load-method="refresh">
        <div class="anchor" v-show="columnShow">
          <div class="title">
            主播栏目
          </div>
          <div class="anchor-swiper">
            <swiper :options="swiperOption" style="background-color:#fff">
              <swiper-slide v-for="c in compere.columns">
                <div class="aui-card-list" @click="programList(c)">
                  <div class="aui-card-list-content">
                    <img :src="src + c.img" class="img" />
                  </div>
                  <div class="swiper-cont">{{ c.name }}</div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="anchor">
          <div class="title">
            主播动态
          </div>

          <div class="aui-row kong" v-show="infoList.length == 0">
            <img class="img" src="../../../../assets/images/my/kong@3x.png" />
            <div class="title">
              暂未发布动态
            </div>
          </div>

          <div class="aui-card-list" v-for="i in infoList">
            <div class="aui-card-list-header aui-card-list-user aui-border-b">
              <div class="aui-card-list-user-avatar">
                <img :src="src + i.head" class="aui-img-round head" />
              </div>
              <div class="aui-card-list-user-name">
                <div class="name">{{ i.name }}</div>
                <!-- <div class="aui-btn btn-follow" @click="postDel(i)">
                  删除
                </div> -->
                <!-- <div
                  v-else
                  class="aui-btn btn-follow"
                  @click="compereFollow(i.id)"
                >
                  关注
                </div> -->
                <div
                  v-if="type == 1"
                  class="aui-btn btn-follow"
                  @click="postDel(i)"
                >
                  删除
                </div>
                <div v-else-if="i.follow" class="aui-btn btn">已关注</div>
                <div
                  v-else
                  class="aui-btn btn-follow"
                  @click="compereFollow(i.compereId)"
                >
                  关注
                </div>
              </div>
              <div class="aui-card-list-user-info time">
                {{ formatDateTime(i.time) }}
              </div>
            </div>
            <div class="aui-card-list-content-padded" @click="anchor_detail(i)">
              <p class="cont">{{ i.cont }}</p>
              <img :src="src + i.img" style="width:300px" />
            </div>
            <div class="aui-card-list-footer aui-border-t footer-list">
              <div @click="postZan(i.id)">
                <img
                  class="img"
                  src="../../../../assets/images/radio/like.png"
                />
                <span class="title-check">{{ i.zans }}</span>
              </div>
              <div @click="commentClick(i)">
                <img
                  class="img"
                  src="../../../../assets/images/radio/comment.png"
                />
                <span class="title">{{ i.comments }}</span>
              </div>
              <div @click="openShare(i)">
                <img
                  class="img"
                  src="../../../../assets/images/radio/forward.png"
                />
                <span class="title"></span>
              </div>
            </div>
          </div>
        </div>
      </pull-to>
    </div>

    <div class="floatbox" v-show="isShow">
      <div class="title">
        分享到
        <span
          @click="closeShare"
          style="position:absolute;right:10px;font-size:14px"
          >关闭</span
        >
      </div>

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!--First Slide-->
          <div class="swiper-slide">
            <table id="section02">
              <tr>
                <td class=" " @click="weixin('session')">
                  <div class="section2ico">
                    <img
                      src="../../../../assets/images/frame04cover/cm2_mlogo2_weixin.png"
                      alt=""
                    />
                  </div>
                  <div class="section2title">微信好友</div>
                </td>
                <td class=" ">
                  <div class="section2ico" @click="weixin('timeline')">
                    <img
                      src="../../../../assets/images/frame04cover/cm2_mlogo2_weixin.png"
                      alt=""
                    />
                  </div>
                  <div class="section2title">微信朋友圈</div>
                </td>
                <td class=" "></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  src,
  getCompereById,
  getInfos,
  postCompereFollow,
  postInfoDel,
  postInfoZan
} from "../../index/services";
import PullTo from "vue-pull-to";
import { Toast, Dialog } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      src: src,
      compereId: 0,
      compere: {},
      infoList: [],
      data: [],
      type: 0,
      isShow: false,
      shareText: {},
      columnShow: false,
      param: {
        token: "",
        id: 1,
        type: 1,
        page: 1,
        size: 3,
        isCompere: 0
      },
      swiperOption: {
        slidesPerView: 3,
        slidesOffsetBefore: 20,
        spaceBetween: 10
      }
    };
  },

  methods: {
    render(loaded) {
      this.compereId = this.$route.query.compereId;
      this.getCompereById();
      this.getInfos();
    },

    getCompereById() {
      getCompereById({
        token: this.$ls.get("token"),
        compereId: this.compereId
      }).then(rep => {
        this.compere = rep.data;

        if (this.compere.columns.length > 0) {
          this.columnShow = true;
        }
      });
    },
    closeShare() {
      this.isShow = false;
    },
    openShare(data) {
      this.shareText = data;
      this.isShow = true;
    },
    weixin(type, data) {
      var wx = api.require("wx");
      const img = this.shareText.img;
      api.download(
        {
          url: this.src + img,

          savePath: "fs://" + img,
          report: true,
          cache: true,
          allowResume: true
        },
        function(ret, err) {
          wx.shareImage(
            {
              apiKey: "",
              scene: type,

              contentUrl: "fs://" + img
            },
            function(ret, err) {
              if (ret.status) {
                // alert("分享成功");
              } else {
                api.toast({ msg: "请安装微信" });
              }
            }
          );
        }
      );
    },
    getInfos(loaded) {
      this.param.token = this.$ls.get("token");
      this.param.isCompere = this.compereId;
      getInfos(this.param).then(rep => {
        const rs = rep.data;
        for (const r of rs) {
          this.infoList.push(r);
        }

        if (loaded) {
          loaded("done");
        }
      });
    },
    programList(data) {
      //alert(JSON.stringify(data))
      this.$ls.set("column", data);
      this.$router.push({ path: "/program/list", query: { column: data.id } });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    editClick() {
      this.$router.push({
        path: "/anchor/edit",
        query: { compere: this.compere }
      });
    },
    refresh(loaded) {
      this.param.page++;
      this.getInfos(loaded);
    },
    compereFollow(id) {
      Toast.loading();
      postCompereFollow({ token: this.$ls.get("token"), compereId: id }).then(
        rep => {
          Toast.clear();
          Toast.success("关注成功");
          this.compere.follow = 1;
        }
      );
    },
    commentClick(data) {
      this.$router.push({
        path: "/anchor/columnComment",
        query: { comment: data, type: 1 }
      });
    },
    postZan(id) {
      postInfoZan({ token: this.$ls.get("token"), type: 1, typeId: id }).then(
        rep => {
          this.getInfos();
        }
      );
    },

    postDel(data) {
      Dialog.confirm({
        title: "提示",
        message: "确定删除您所选的内容吗？"
      }).then(() => {
        Dialog.close();
        Toast.loading();

        postInfoDel({ token: this.$ls.get("token"), id: data.id }).then(rep => {
          api.toast({ msg: "删除成功~" });
          this.render();
        });
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
      return m + "-" + d + " " + h + ":" + minute;
    }
  },

  components: {
    PullTo
  },

  mounted() {
    this.type = this.$route.query.type;
    this.render();
  }
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.detail {
  height: 100%;
  overflow-y: auto;
  background-color: #efefef;
  .header {
    padding-top: px2rem(30);
    background-image: url(../../../../assets/images/radio/head11.png);
    height: px2rem(554);
    position: fixed;
    width: 100%;
    line-height: px2rem(44);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .btn {
      margin-top: px2rem(100);
      padding-top: px2rem(10);
      background-color: #f2f4f5;
      width: px2rem(140);
      height: px2rem(60);
      font-size: px2rem(26);
      color: #292726;
    }
    .btn-follow {
      margin-top: px2rem(100);
      padding-top: px2rem(8);
      background-color: #ff5f53;
      color: #fff;
      width: px2rem(100);
      height: px2rem(56);
      font-size: px2rem(26);
    }
    .header-icon {
      margin-right: px2rem(10);
      height: px2rem(34);
      width: px2rem(34);
      color: #fff;
    }

    .header-img {
      width: px2rem(160);
      height: px2rem(160);
      margin-top: px2rem(60);
    }

    .cont {
      text-align: left;
      padding: 15px;
      margin-top: px2rem(-20);

      .name {
        color: #292726;
        font-weight: bold;
        font-size: px2rem(36);
      }

      .explain {
        padding-top: 5px;
        color: #292726;
        font-weight: bold;
        font-size: px2rem(26);
        max-width: px2rem(680);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .count {
        color: #292726;
        font-size: px2rem(34);
        font-weight: bold;
      }
    }

    .ad_content {
      overflow-y: auto;
      height: 100%;
      margin-bottom: px2rem(660);
      .van-pull-refresh__track {
        height: 100%;
      }
    }
  }
  .anchor {
    margin-top: px2rem(30);
    background-color: #fff;

    .title {
      color: #292726;
      font-size: px2rem(30);
      font-weight: bold;
      padding: px2rem(30) 0 px2rem(20) px2rem(30);
    }

    .img {
      width: px2rem(240);
      height: px2rem(240);
    }

    .head {
      width: px2rem(80);
      height: px2rem(80);
    }

    .swiper-cont {
      padding-top: px2rem(10);
      color: #646261;
      font-weight: bold;
      font-size: px2rem(26);
    }
    .kong {
      padding-bottom: px2rem(50);
      text-align: center;
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
  }

  .anchor {
    margin-top: px2rem(30);
    background-color: #fff;
    .title {
      font-size: px2rem(30);
      font-weight: bold;
      padding: px2rem(30);
    }

    .name {
      font-size: px2rem(28);
      font-weight: bold;
    }
    .follow-btn {
      width: px2rem(140);
      height: px2rem(60);
      font-size: px2rem(26);
    }
    .time {
      color: #9d9a99;
      font-size: px2rem(24);
    }
    .cont {
      color: #292726;
      font-size: px2rem(30);
      font-weight: bold;
    }

    .btn {
      width: px2rem(140);
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

    .footer-list {
      padding-left: px2rem(80);
      padding-right: px2rem(80);

      .img {
        vertical-align: middle;
        display: inline-block;
        width: px2rem(40);
        height: px2rem(36);
      }
      .title-check {
        color: #ff5f53;
        font-size: px2rem(28);
      }
      .title {
        color: #646261;
        font-size: px2rem(28);
      }
    }
  }

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
    height: 45px;
    background-color: #fff !important;
  }
}

.content1 {
  overflow-y: auto;
  height: 100%;
  margin-top: px2rem(450);
  padding-bottom: px2rem(554);
  .van-pull-refresh__track {
    height: 100%;
  }
}
</style>

