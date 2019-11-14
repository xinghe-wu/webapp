<template>
  <div class="view">
    <div class="content">
      <div class="play-up">
        <img :src="src + info.img" class="playdisc" alt="" />

        <div class="aui-row title">
          <div class="aui-col-xs-1" @click="onClickLeft()">
            <van-icon name="arrow-left" style="margin-left: 12px;" />
          </div>
          <div class="aui-col-xs-11">
            {{ info.name }}
          </div>
        </div>

        <div class="aui-row info-list">
          <div class="aui-col-xs-2">
            <img :src="src + column.img" class="img" />
          </div>
          <div class="aui-col-xs-8">
            <div class="name">{{ column.name }}</div>
            <div class="info-listen">{{ column.listenCount }}人在听</div>
          </div>
          <div class="aui-col-xs-2">
            <!-- <div class="btn-follow">订阅</div> -->
            <div class="btn" v-if="column.subscribe === 1">已订阅</div>
            <div
              class="btn-follow"
              @click="postSubscribes(column.id)"
              v-if="column.subscribe === 0"
            >
              订阅
            </div>
          </div>
        </div>

        <div class="progress-bar">
          <div class="aui-col-xs-2" style="text-align: center;">
            <span class="now">{{ current }}</span>
          </div>
          <div class="aui-col-xs-8 bar">
            <!-- <van-progress
                       pivot-text=" "
                       color="#f2826a"
                     /> -->
          </div>
          <div class="aui-col-xs-2" style="text-align: center;">
            <span class="total">{{ duration }}</span>
          </div>
        </div>

        <!-- {{play_list}} -->

        <div class="aui-row play-up-toolbar">
          <div class="aui-col-xs-4 play-up-tool " @click="zan(column.id)">
            <img
              src="../../../../assets/images/ico_like@3x.png"
              alt=""
              class="img-like"
            />
            <span>{{ column.zans }}</span>
          </div>
          <div class="aui-col-xs-4 play-up-tool " @click="commentsClick">
            <img
              src="../../../../assets/images/musiclist/musiclistcommet.png"
              alt=""
            />
            <span>{{ column.comments }}</span>
          </div>
          <div class="aui-col-xs-4 play-up-tool " @click="openShean">
            <img
              src="../../../../assets/images/musiclist/musiclistshare.png"
              alt=""
            />
            <span>分享</span>
          </div>
        </div>
      </div>

      <div class="player-bar">
        <div class="aui-col-xs-2" style="text-align: center;">
          <img
            src="../../../../assets/images/radio/shunxubofang @2x.png"
            alt=""
          />
        </div>
        <div class="aui-col-xs-8 bar">
          &nbsp;
        </div>
        <div class="aui-col-xs-2" style="text-align: center;">
          <img
            src="../../../../assets/images/radio/bianji@2x.png"
            alt=""
            @click="playList"
          />
        </div>
      </div>

      <div class="player-block">
        <ul>
          <li>
            <a href="#" v-ripple class="tools-back" @click="onPrev">
              <img
                src="../../../../assets/images/radio/shangyishou@2x.png"
                alt=""
              />
            </a>
          </li>
          <li>
            <a v-ripple href="#" class="player-btn" @click="onChangeStatus">
              <img :src="play_src" alt="" />
            </a>
          </li>
          <li>
            <a href="#" v-ripple class="tools-next" @click="onNext">
              <img
                src="../../../../assets/images/radio/xiayijiemu@2x.png"
                alt=""
              />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="floatbox" v-show="isShow">
      <div class="title">
        <img
          class="img-title"
          src="../../../../assets/images/radio/shunxubofang @2x.png"
          alt=""
        />
        <span class="name">循环播放</span>
        <span
          @click="closeShare"
          style="position:absolute;right:10px;font-size:14px"
          >关闭</span
        >
      </div>

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="aui-content aui-margin-b-15">
              <ul class="aui-list aui-list-in">
                <li
                  class="aui-list-item"
                  v-for="(p, index) in play_list"
                  :key="index"
                  @click="onChangeList(index)"
                >
                  <div class="aui-list-item-inner">
                    <div
                      class="aui-list-item-title name-activie"
                      v-if="index === active"
                    >
                      {{ p.name }}
                    </div>
                    <div class="aui-list-item-title name" v-else>
                      {{ p.name }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="swiper-slide">
            <table id="section02"></table>
          </div>
        </div>
        <div class="pagination"></div>
      </div>
    </div>

    <div class="floatbox1" v-show="isShow1">
      <div class="title"></div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!--First Slide-->
          <div class="swiper-slide">
            <table id="section02">
              <tr>
                <td class=" ">
                  <div class="section2ico" @click="weixin('session')">
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
                <td class="">
                  <!-- <div class="section2ico">
                    <img
                      src="../../../../assets/images/frame04cover/cm2_mlogo2_sina.png"
                      alt=""
                    />
                  </div>
                  <div class="section2title">QQ好友</div> -->
                </td>
                <td class="">
                  <!-- <div class="section2ico">
                    <img
                      src="../../../../assets/images/frame04cover/cm2_mlogo2_tencent.png"
                      alt=""
                    />
                  </div>
                  <div class="section2title">QQ空间</div>
                </td> -->
                </td>
              </tr>

              <tr></tr>
            </table>
          </div>
        </div>
      </div>
      <div class="cancelbtn" tapmode="" @click="closeShare1">取消</div>
    </div>
  </div>
</template>

<script>
import PullTo from "vue-pull-to";
import {
  src,
  getCompere,
  getCompereSort,
  postCompereFollow,
  fmSrc,
  postProgram,
  postInfoZan,
  postSubscribes
} from "../../index/services";
import { Toast } from "vant";
import { Progress } from "vant";
export default {
  store: ["paddingTop", "token", "interact_status", "fm_playing"],

  data() {
    let active = this.$ls.get("fm_active", 0);
    return {
      play_list: [],
      src: src,
      column: {},
      isShow: false,
      isShow1: false,
      info: {
        id: "",
        name: "",
        img: "",
        count: "1",
        brief: "",
        audio_link: "",
        play_time: 0,
        play_count: 0,
        position: 1
      },
      current: "00:00",
      duration: "00:00",
      active: 0,
      playSata: 0
    };
  },
  methods: {
    load() {
      // var playbg = document.getElementsByClassName('play-up')[0];
      // playbg.style.height = document.documentElement.clientHeight - 60 + 'px';
    },
    onChangeStatus() {
      if (this.playSata === 0) {
        this.stopmusic();
        this.playSata = 1;
      } else {
        this.playmusic();
        this.playSata = 0;
      }
      this.fm_playing = !this.fm_playing;
    },
    onPlayer() {
      const audio = api.require("audioPlayer");

      var audioPlayer = api.require("audioStreamer");
      audioPlayer.stop();

      if (this.current == "00:00") {
        audio.initPlayer(
          {
            path: fmSrc + this.info.audio_link,
            cache: false
          },
          (ret, err) => {
            if (ret.duration) {
              this.duration = new Date(ret.duration * 1000).Format("mm:ss");
            }
          }
        );

        //最近播放
        postProgram({
          token: this.$ls.get("token"),
          programId: this.info.id
        }).then(rep => {
          // alert(JSON.stringify(rep))
        });

        audio.removeEventListener({ name: "playing" });
        audio.addEventListener({ name: "playing" }, ret => {
          if (this.current == "00:30") {
            //试听30秒
            if (this.column.free == 1) {
              Toast.success("免费试听结束请购买！");
              this.onClickLeft();
            }
          }
          this.current = new Date(ret.current * 1000).Format("mm:ss");
        });
      } else {
        audio.play();
      }
    },
    pausePlay() {
      const audio = api.require("audioPlayer");
      audio.pause();
    },
    stopPlay() {
      const audio = api.require("audioPlayer");
      this.current = "00:00";
      this.duration = "00:00";
      audio.stop();
    },
    //            render(){
    //                Toast.loading();
    //                getVideo({token:this.token}).then( (rep)=>{
    //                    this.list = rep;
    //                    this.info = this.list[this.active];
    //                    this.swiper.slideTo(this.active);
    //                    Toast.clear();
    //                })
    //            },
    onNext() {
      // this.swiper.slideNext();
      this.onChange();
    },
    onPrev() {
      if (this.active > 0) {
        setTimeout(() => {
          this.info = this.play_list[this.active - 1];
          this.active--;

          this.stopPlay();
          if (!this.fm_playing) {
            this.fm_playing = true;
          } else {
            this.onPlayer();
          }
        }, 400);
      }
    },
    onNow() {
      setTimeout(() => {
        this.info = this.play_list[this.active];
        this.stopPlay();
        if (!this.fm_playing) {
          this.fm_playing = true;
        } else {
          this.onPlayer();
        }
      }, 400);
    },
    onChange() {
      if (this.active < this.play_list.length - 1) {
        setTimeout(() => {
          this.info = this.play_list[this.active + 1];
          // alert(JSON.stringify(this.info))
          this.active++;
          // this.active = this.swiper.activeIndex;
          this.stopPlay();
          //                    this.fm_playing = false;
          //                    this.$nextTick(()=>{
          //                        this.fm_playing = true;
          //                    })
          if (!this.fm_playing) {
            this.fm_playing = true;
          } else {
            this.onPlayer();
          }

          //                    this.stopPlay();
          //                    this.onPlayer();
        }, 400);
      }
    },
    onChangeList(id) {
      this.isShow = false;
      this.active = id;
      setTimeout(() => {
        this.info = this.play_list[this.active];
        this.stopPlay();
        if (!this.fm_playing) {
          this.fm_playing = true;
        } else {
          this.onPlayer();
        }
      }, 400);
    },
    playList() {
      this.isShow = true;
    },
    commentsClick() {
      this.$router.push({
        path: "/anchor/columnComment",
        query: { comment: this.column, type: 5 }
      });
    },
    closeShare() {
      this.isShow = false;
    },
    closeShare1() {
      this.isShow1 = false;
    },
    refresh(loaded) {
      this.render(loaded);
    },
    onClickLeft() {
      this.stopPlay();
      this.$router.go(-1);
      // this.$router.replace({
      //   path: "/program/list",
      //   query: { column: this.column }
      // });
    },
    playmusic() {
      var musicdisc = document.getElementsByClassName("playdisc")[0];
      musicdisc.style.WebkitAnimationPlayState = "running";
    },

    stopmusic() {
      var musicdisc = document.getElementsByClassName("playdisc")[0];
      musicdisc.style.webkitAnimationPlayState = "paused";
    },
    getActive(list, id) {
      var activeId = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          activeId = i;
        }
      }
      return activeId;
    },
    postSubscribes(id) {
      postSubscribes({ token: this.$ls.get("token"), coumnId: id }).then(
        rep => {
          this.column.subscribe = 1;
          Toast.success("订阅成功");
        }
      );
    },
    openShean() {
      this.isShow1 = true;
    },
    zan(id) {
      postInfoZan({ token: this.$ls.get("token"), type: 3, typeId: id }).then(
        rep => {
          this.column.zans++;
        }
      );
      this.column.zans++;
    },
    weixin(type) {
      // this.closeShare1();
      // var wx = api.require("wx");
      // wx.shareMusic(
      //   {
      //     apiKey: "",
      //     scene: "timeline",
      //     title: this.info.name,
      //     description: this.info.brief,

      //     contentUrl: fmSrc + this.info.audio_link
      //   },
      //   function(ret, err) {
      //     if (ret.status) {
      //       alert(1);
      //     } else {
      //       alert(err);
      //     }
      //   }
      // );

      var wx = api.require("wx");
      this.closeShare1();
      wx.shareWebpage(
        {
          apiKey: "",
          scene: type,
          title: this.info.name,
          description: this.info.brief,

          contentUrl: "http://www.tingdaoapp.com/static/down/index.html"
        },
        function(ret, err) {
          if (ret.status) {
            // alert("分享成功");
          } else {
            api.toast(err.code);
          }
        }
      );
    }
  },
  watch: {
    // active(a) {
    //   this.$ls.set('fm_active', a);
    // },
    fm_playing(b) {
      if (b) {
        this.onPlayer();
      } else {
        this.pausePlay();
      }
    }
  },
  components: {
    PullTo
  },
  computed: {
    play_src: function() {
      return this.fm_playing
        ? require("../../../../assets/images/radio/bofang@2x.png")
        : require("../../../../assets/images/radio/bofang-stop@2x.png");
    }
  },
  mounted() {
    // this.column = this.$route.query.column
    // this.play_list = this.$route.query.programList
    this.column = this.$ls.get("column");

    this.play_list = this.$ls.get("programList");
    this.active = this.getActive(this.play_list, this.$ls.get("pId"));
    this.onNow();
    this.playmusic(); //进入页面开始播放
  }
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";

.view {
  height: 100%;
  overflow-y: hidden;
  background: linear-gradient(0deg, rgba(52, 43, 36, 1), rgba(103, 83, 63, 1));
  .br {
    border-right: 1px solid #0a0a0a;
  }
  .bl {
    border-right: 1px solid #232323;
  }

  /* 上部效果 */
  .play-up {
    // position: relative;
    .title {
      padding-top: px2rem(80);
      font-size: px2rem(34);
      text-align: left;
      color: #fff;
    }
    .info-list {
      // height: px2rem(108);
      margin-top: px2rem(40);
      border-top: 1px solid #f2f4f5;
      border-bottom: 1px solid #f2f4f5;
      padding-top: px2rem(30);
      padding-left: px2rem(30);

      .btn {
        text-align: center;
        padding-top: px2rem(8);
        background-color: #e3e8ee;
        color: #232323;
        width: px2rem(100);
        height: px2rem(56);
        font-size: px2rem(26);
        border-radius: 10%;
      }
      .btn-follow {
        text-align: center;
        padding-top: px2rem(8);
        background-color: #ff5f53;
        color: #fff;
        width: px2rem(100);
        height: px2rem(56);
        font-size: px2rem(26);
        border-radius: 10%;
      }
      .img {
        width: px2rem(68);
        height: px2rem(68);
      }
      .name {
        color: #fff;
        font-size: px2rem(30);
      }
      .info-listen {
        color: #a2a2a3;
        font-size: px2rem(26);
      }
      .btn-follow {
        text-align: center;
        padding-top: px2rem(8);
        background-color: #ff5f53;
        color: #fff;
        width: px2rem(100);
        height: px2rem(56);
        font-size: px2rem(26);
        border-radius: 10%;
      }
    }

    .progress-bar {
      padding-top: px2rem(650);
      .bar {
        padding-top: px2rem(40);
      }
      .now {
        color: #a2a2a3;
        font-size: px2rem(26);
      }
      .total {
        right: 0;
        color: #a2a2a3;
        font-size: px2rem(26);
      }
    }
  }

  .player-bar {
    padding-top: px2rem(170);
    img {
      width: px2rem(60);
    }
  }

  .player-block {
    position: absolute;
    top: px2rem(1000);
    left: 45%;
    margin-left: px2rem(-200);
    // bottom: 100px;

    .now {
      color: #a2a2a3;
      font-size: px2rem(26);
    }
    .total {
      right: 0;
      color: #a2a2a3;
      font-size: px2rem(26);
    }
    h5 {
      margin: 0;
      text-align: center;
      font-size: px2rem(26);
      letter-spacing: 0px;
      color: #fff;
      font-weight: bold;
    }
    p {
      text-align: center;
      font-size: px2rem(26);
      font-weight: normal;
      letter-spacing: 0px;
      color: #777777;
      margin-top: px2rem(15);
    }
    ul {
      height: px2rem(120);
      width: px2rem(472);
      margin: px2rem(69) auto 0 auto;
      display: flex;
      font-size: 0;
      justify-content: space-between;
      align-items: center;
      li {
        a {
          display: block;
        }
        .player-btn {
          display: block;
          border-radius: 50%;
          img {
            width: px2rem(144);
            height: px2rem(144);
          }
        }
        .play-next {
          width: px2rem(92);
          height: px2rem(92);
        }
        .tools-next,
        .tools-back {
          img {
            width: px2rem(88);
          }
        }
      }
    }
  }
  .play-up-bg {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .play_needle {
    position: absolute;
    vertical-align: top;
    top: -20px;
    width: 200px;
    left: 50%;
    margin-left: -100px;
    transform: rotate(-30deg);
    transform-origin: 50% 10%;
    transition: all 0.8s ease;

    -webkit-transform: rotate(-30deg);
    -webkit-transform-origin: 50% 10%;
    -webkit-transition: all 0.8s ease;
  }

  @-webkit-keyframes playing {
    /*0%   { transform: rotate(0deg);}*/
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes playing {
    100% {
      transform: rotate(360deg);
    }
  }

  .playdisc {
    position: absolute;
    width: px2rem(500);
    height: px2rem(500);
    background-image: url("../../../../assets/images/musicplay/play_disc.png");
    background-size: 100% 100%;
    left: 45%;
    margin-left: px2rem(-200);
    top: px2rem(400);
    animation: playing 10s infinite linear;
    animation-play-state: paused;

    -webkit-animation: playing 10s infinite linear;
    -webkit-animation-play-state: paused;
    border: 10px solid #626262;
    border-radius: 50%;
  }

  .play-up-toolbar {
    left: 45%;
    margin-left: px2rem(-200);
    position: absolute;
    bottom: px2rem(10);
    display: -webkit-box;
    width: px2rem(500);
    text-align: center;

    .play-up-tool {
      vertical-align: middle;
      text-align: center;

      img {
        vertical-align: middle;
        width: px2rem(36);
      }
      .img-like {
        vertical-align: middle;
        width: px2rem(45);
      }

      span {
        padding-left: px2rem(6);
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        font-size: px2rem(28);
      }
    }
  }

  .floatbox {
    position: absolute;
    background: #fff;
    bottom: 0;
    width: 100%;
    height: 50%;
    overflow-y: auto;

    .title {
      .img-title {
        vertical-align: middle;
        padding-left: px2rem(20);
        width: px2rem(60);
      }
      .name {
        padding-left: px2rem(10);
        vertical-align: middle;
        color: #292726;
        font-size: px2rem(28);
      }
    }

    .name {
      color: #292726;
      font-size: px2rem(30);
    }
    .name-activie {
      padding-left: px2rem(10);
      vertical-align: middle;
      color: #ff5f53;
      font-size: px2rem(30);
    }
    .cancelbtn {
      background-color: #fff;
      height: px2rem(80);
      line-height: px2rem(80);
      font-size: px2rem(36);
      text-align: center;
    }
  }

  .floatbox1 {
    position: absolute;
    background: #fff;
    bottom: 0;
    width: 100%;
    overflow-y: auto;

    .title {
      padding: px2rem(10);
      color: #292726;
      font-size: px2rem(30);
    }

    .name {
      color: #292726;
      font-size: px2rem(30);
    }
    .name-activie {
      padding-left: px2rem(10);
      vertical-align: middle;
      color: #ff5f53;
      font-size: px2rem(30);
    }
    .cancelbtn {
      background-color: #fff;
      height: px2rem(80);
      line-height: px2rem(80);
      font-size: px2rem(36);
      text-align: center;
    }
  }

  /* 底部控制 */
  .play-control {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 60px;
  }
  .play-control .loopmode {
    position: absolute;
    left: 0;
    width: 30px;
    padding: 15px;
    vertical-align: top;
  }
  .play-control .controllist {
    position: absolute;
    right: 0;
    width: 30px;
    padding: 15px;
    vertical-align: top;
  }
  .play-control .play-control-bar {
    position: absolute;
    left: 60px;
    right: 60px;
    height: 60px;
  }
  .play-control .play-control-bar img {
    width: 50px;
    padding-top: 5px;
    position: absolute;
  }
  .play-control .play-control-bar .play-control-bar-bg {
    height: 40px;
    margin-top: 10px;
    background-color: #d6d6d6;
    border-radius: 20px;
    width: 100%;
  }
}
</style>

