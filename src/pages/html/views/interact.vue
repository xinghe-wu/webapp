<template>
  <div class="view-interact" :class="{ ipad: iPad }">
    <!-- 直播头部 -->
    <!-- <div class="show">11</div> -->
    <div class="content">
      <van-popup
        v-model="showFirst1"
        class="overlay"
        :close-on-click-overlay="false"
      >
        <img src="../../../assets/images/1.png" @click="first1()" />
      </van-popup>

      <van-popup
        v-model="showFirst2"
        class="overlay"
        :close-on-click-overlay="false"
      >
        <img src="../../../assets/images/2.png" @click="first2()" />
      </van-popup>

      <van-popup
        v-model="showFirst3"
        class="overlay"
        :close-on-click-overlay="false"
      >
        <img src="../../../assets/images/3.png" @click="first3()" />
      </van-popup>
      <!-- <pull-to :bottom-load-method="refresh"> -->
      <header class="aui-bar aui-bar-nav">
        <div class="header1">
          <img :src="src + video.pic" class="img-bg" alt="" />
          <div class="cont">
            <div class="cont-row">
              <div class="aui-row">
                <div class="aui-col-xs-2" @click="radioList">
                  <span slot="left" class="header-button">
                    <img
                      src="../../../assets/images/diantailiebiao@3x.png"
                      alt=""
                      class="img"
                    />
                  </span>
                </div>

                <div class="aui-col-xs-8">
                  <span class="name"> {{ video.name }}</span>
                </div>

                <div
                  class="aui-col-xs-2"
                  @click="onShowLive"
                  v-if="liveStat == 1"
                >
                  <img
                    src="../../../assets/images/btn_live_ON@3x.png"
                    alt=""
                    class="img-live"
                  />
                </div>
              </div>

              <div class="aui-row">
                <div
                  class="aui-col-xs-8"
                  style="text-align:left;margin-top:-15px;margin-left:20px"
                >
                  <span class="title"> {{ video.video_title }}</span>
                </div>
              </div>

              <div class="aui-row" style="margin-top:-30px">
                <span class="time">
                  {{ video.video_time }} {{ video.compere }}</span
                >
              </div>
            </div>

            <!-- 直播留言 -->
            <div class="live-msg">
              <!-- <div class="card" v-for="(m, index) in msgList">
                <div class="aui-col-xs-1">
                  <img :src="src + m.head" class="aui-img-round  img" />
                </div>
                <div class="aui-col-xs-11">
                  <span class="cont">
                    {{ m.cont }}
                  </span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </header>
      <img
        :src="src + video.icon"
        alt=""
        class="icon"
        @click="adVote(video.url)"
        v-show="video.icon"
      />
      <!-- 直播预告 -->
      <div class="live" v-if="liveText">
        <div class="aui-row">
          <div class="aui-col-xs-1">
            <img class="img" src="../../../assets/images/radio/zhibo@3x.png" />
          </div>
          <div class="aui-col-xs-11">
            <!-- 直播预告：西湖文博会将于本周日08:00直播 -->
            <van-notice-bar
              class="title"
              :text="liveText"
              background="#fff4f1"
              color="#ff5f53"
            ></van-notice-bar>
          </div>
        </div>
      </div>

      <div id="Barrage">
        <ul class="ul">
          <li class="li">
            <!-- <div class="BarMes"></div> -->
          </li>
        </ul>
      </div>

      <!-- 电台活动推送 -->
      <div class="ad" v-if="video.activity.stat == 1">
        <div class="aui-row">
          <div class="aui-col-xs-1">
            <img
              src="../../../assets/images/radio/huodong@3x.png"
              class="img-alert"
            />
          </div>
          <div class="aui-col-xs-2">
            <img
              src="../../../assets/images/index/enroll.png"
              class="img-enroll"
            />
          </div>
          <div class="aui-col-xs-9" @click="ad">
            <span class="title">
              {{ video.activity.stat == 1 ? "正在进行中" : "已结束" }}：{{
                video.activity.title
              }}</span
            >
          </div>
        </div>
      </div>

      <!-- 互动 -->
      <div class="play">
        <section class="aui-grid aui-margin-b-15 play">
          <div class="aui-row cont">
            <div class="aui-col-xs-4" @click.stop="onText">
              <img
                src="../../../assets/images/radio/tuwenhudong@3x.png"
                class="tuwenhudong"
              />

              <div class="aui-grid-label title">图文互动</div>
            </div>
            <div class="aui-col-xs-4" @click="onSpeech">
              <img
                src="../../../assets/images/radio/yuyinhudong@3x.png"
                class="yuyinhudong"
              />
              <div class="aui-grid-label yuyinhudong-title">语音互动</div>
            </div>
            <div class="aui-col-xs-4">
              <section class="player-block">
                <span
                  class="play-button"
                  :class="interact_status"
                  v-ripple
                  @click="onPlay"
                >
                </span>
              </section>
              <!-- <img src="../../../assets/images/index/stop.png" style="width:26px;margin-top:25px" > -->
              <div
                class="aui-grid-label title"
                v-if="interact_status == 'play'"
              >
                听直播
              </div>
              <div class="aui-grid-label title" v-else>静音</div>
            </div>
          </div>
        </section>
      </div>

      <!-- 新闻 -->
      <div class="new"></div>
      <div class="aui-content aui-margin-b-15">
        <ul class="aui-list aui-media-list">
          <li class="aui-list-item" v-for="n in newList">
            <div class="aui-media-list-item-inner info" @click="news(n)">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title cont">{{ n.title }}</div>
                <div class="">
                  <span class="brief_title">{{ n.radio_name }}</span>
                  <span class="brief">{{ n.comments }}评论</span>
                  <span class="brief">{{ getDateDiff(n.time) }}</span>
                </div>
              </div>
              <div class="aui-list-item-media">
                <img :src="src + n.img" alt="" class="img" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- </pull-to> -->
    </div>
    <!-- <van-nav-bar :style="{paddingTop:paddingTop}" id="header" :title="video.name" @click-right="onShowLive" @click-left="onShowList" >
      <span slot="right" class="header-button" >
 
      </span>
            
        </van-nav-bar> -->

    <div class="main">
      <!-- <section class="base-block" >
                <p>
                    <img src="../../../assets/images/ico_playing_S@3x.png" alt="">
                    <span>{{video.video_play==1?'正在播放':'暂无节目'}}</span>
                </p>
                <div class="news" @click="openActivityList">
                    <div class="icon">
                        <img src="../../../assets/images/ico_remind@3x.png" alt="">
                    </div>
                    <div class="content">
                        <h5>{{video.activity.title}}</h5>
                        <p>{{video.activity.stat == 0?'已结束':'正在进行中'}}</p>
                    </div>
                    <div class="arrow">
                        <img src="../../../assets/images/ico_more@3x.png" alt="">
                    </div>
                </div>

            </section> -->

      <!-- <section class="player-block" :style="playBg">
                <span class="play-button" :class="interact_status" v-ripple @click="onPlay">
                </span>
                <div v-if="!iPad">
                    <h5>{{video.video_title}}</h5>
                    <p>{{video.video_time}} {{video.compere}}</p>
                </div>
                <div v-if="iPad">
                    <h5>{{video.video_title}}
                        <span>{{video.video_time}} {{video.compere}}</span>
                    </h5>
                </div>

            </section> -->

      <!-- <section class="voice-block">
                <div class="voice-circle" :class="{'speech':speech}" @click="onSpeech" >
                    <p>&nbsp;</p>
                    <h5>开启语音互动</h5>
                </div>
                <span class="voice-tag" @click.stop="onText">
                    字
                </span>
            </section> -->
    </div>

    <span @click="onGetHongBao" class="hongbao" v-if="lucky.id">
      <img src="../../../assets/images/hongbao.png" alt="" />
    </span>

    <div class="speech-modal" v-show="speech">
      <div class="speech-body">
        <div class="content">
          <div class="left">
            <i class="iconfont icon-maikefeng1"></i>
          </div>
          <div class="right">
            <ul>
              <li v-for="n in volumeNum"></li>
            </ul>
          </div>
        </div>
        <p>请开始说话</p>
      </div>
      <div class="speech-footer">
        <span @click="onCloseSpeech" class="voice-circle">
          <p>&nbsp;</p>
          <h5>{{ countdown < 9 ? countdown + "秒" : "发送" }}</h5>
        </span>
        <span class="voice-tag" @click.stop="onCancelSpeech">
          <i class="iconfont">
            <span class="text">关闭</span>
          </i>
        </span>
      </div>
    </div>

    <vDialog
      v-model="dialog"
      :type="pushInfo.type"
      :time="pushInfo.show_time"
      :url="pushInfo.url"
      :id="pushInfo.id"
      :red="pushInfo.red"
      :blue="pushInfo.blue"
    >
      <div slot="title">
        {{ pushInfo.title }}
      </div>
      <span slot="body">
        <img
          class="pull-info-img"
          style="width: 100%;max-height:200px;"
          :src="src + pushInfo.img"
          alt=""
        />
        <p>
          {{ pushInfo.brief }}
        </p>
      </span>
    </vDialog>
  </div>
</template>

<script>
//    var speech = api.require('speechRecognizer');
import {
  getDefaultFm,
  getVideoDetail,
  getLiveStatus,
  src,
  base,
  postVoice,
  getPath,
  getPush,
  getNews,
  getMsg
} from "../index/services";

import { Toast } from "vant";
import vDialog from "../components/vDialog.vue";
import PullTo from "vue-pull-to";
import { stringify } from "querystring";
import $ from "jquery";

var data = [];

export default {
  store: ["paddingTop", "interact_status", "fm_playing", "token"],
  data() {
    return {
      video: {
        live: 0,
        name: "",
        video_title: "",
        video_time: "",
        video_url: "",
        pic: "",
        video_play: 0, //0无节目 1正在播放
        id: "",
        activity: {
          title: "",
          stat: "",
          id: ""
        }
      },
      showFirst1: false,
      showFirst2: false,
      showFirst3: false,
      liveText: "",
      msgList: [],
      iPad: false,
      wordStr: "",
      speech: false,
      volume: 1,
      dialog: false,
      liveStat: 0,
      liveList: {},
      pushInfo: {
        id: "",
        type: 0,
        img: "",
        title: "",
        url: "",
        brief: "",
        show_time: 0
      },
      src: src,
      hbModal: false,
      lucky: {
        id: null
      },
      countdown: 60,
      newList: [],
      param: {
        id: 1,
        type: 0,
        page: 0,
        size: 5
      }
    };
  },
  components: {
    vDialog,
    PullTo
  },
  computed: {
    playBg() {
      return this.video.pic == ""
        ? null
        : {
            backgroundImage: `url(${src}${this.video.pic})`
          };
    },
    volumeNum() {
      var n = this.volume / 4;
      return parseInt(n) || 1;
    }
  },
  methods: {
    first1() {
      this.showFirst1 = false;
      this.showFirst2 = true;
    },
    first2() {
      this.showFirst2 = false;
      this.showFirst3 = true;
    },
    first3() {
      this.showFirst3 = false;
      this.$ls.set("first", true);
    },
    refresh() {
      // this.render(loaded);
    },

    bar() {
      $(".ul .li:eq(0)").animate(
        {
          "margin-top": "-42px"
        },
        "slow"
      );

      setTimeout(function() {
        $(".ul .li:eq(0)").remove();
      }, 1000);

      if ($(".li").length <= 8) {
        // add(); //玩完了再去去一下

        var num = this.msgList.length;
        for (var i = 0; i < num; i++) {
          var src = "";
          if (this.msgList[i].head) {
            if (this.msgList[i].head.substring(0, 4) == "http") {
              src = this.msgList[i].head;
            } else {
              src = this.src + this.msgList[i].head;
            }
          }
          $(".ul").append(
            " <li class='li'><div class='BarMes'><img  src=" +
              src +
              " ><div class='cont'>" +
              this.msgList[i].cont +
              "</div></div></li>"
          );
        }
      }
    },

    onSpeech() {
      if (this.token) {
        this.speech = true;
        this.fm_playing = false;
        this.countdown = 60;
        const speech = api.require("iflyRecognition");
        this.pre = this.interact_status;
        this.interact_status = "play";

        if (api.systemType == "ios") {
          const audioRecorder = api.require("audioRecorder");
          audioRecorder.startRecord(
            {
              savePath: "fs://speechTest/speech.pcm",
              format: "pcm",
              channel: 1
            },
            function(ret, err) {}
          );
        }

        speech.record(
          {
            audioPath: "fs://speechTest/speech.pcm"
          },
          (ret, err) => {
            if (ret.status) {
              this.wordStr = ret.wordStr;
            }
          }
        );

        speech.addRecordHUD({}, (ret, err) => {
          this.volume = ret.volume;
        });
        speech.hideRecordHUD();

        this.cdTimer = setInterval(() => {
          this.countdown = this.countdown - 1;

          if (this.countdown == 0) {
            this.onCloseSpeech();
            clearInterval(this.cdTimer);
          }
        }, 1000);
      } else {
        this.interact_status = "play";

      }
    },
    onCancelSpeech() {
      this.speech = false;
      var speech = api.require("iflyRecognition");
      speech.stopRecord();
      if (this.cdTimer) {
        clearInterval(this.cdTimer);
      }
      if (this.pre == "pause") {
        this.interact_status = "pause";
      }

      if (api.systemType == "ios") {
        var audioRecorder = api.require("audioRecorder");
        audioRecorder.stopRecord({}, function(ret, err) {});
      }
    },
    onCloseSpeech() {
      if (this.cdTimer) {
        clearInterval(this.cdTimer);
      }
      Toast.clear();
      this.speech = false;
      var speech = api.require("iflyRecognition");
      speech.stopRecord();
      Toast.loading();
      if (this.pre == "pause") {
        this.interact_status = "pause";
      }

      if (api.systemType == "ios") {
        var audioRecorder = api.require("audioRecorder");
        audioRecorder.stopRecord({}, function(ret, err) {});
      }

      setTimeout(() => {
        api.ajax(
          {
            url: base + "/radio/voice/upload",
            method: "post",
            dataType: "json",
            returnAll: false,
            data: {
              files: { file: "fs://speechTest/speech.pcm" },
              values: { token: this.$ls.get("token") }
            }
          },
          (ret, err) => {
            alert(JSON.stringify(ret));
            if (ret.code == 0) {
              let url = ret.response.src;
              postVoice({
                token: this.$ls.get("token"),
                type: 0,
                voice_url: url,
                text: this.wordStr
              }).then(rep => {
                alert(JSON.stringify(rep));
                Toast.clear();
                Toast.success({ message: "留言成功", duration: 1000 });
              });

              // alert(JSON.stringify(err));
            } else {
              alert(JSON.stringify(ret));
            }
          }
        );
      }, 500);
    },
    radioList() {
      this.$router.push("/radio/radio_list");
    },
    onShowList() {
      api.openWin({
        name: "test",
        url: getPath() + "/html/index.html?path=list",
        pageParam: {
          name: "test"
        }
      });
    },
    playVideo(path) {
      this.fm_playing = false;
      var audioPlayer = api.require("audioStreamer");
      const audio = api.require("audioPlayer");
      audio.stop();
      Toast.loading({ mask: false });

      audioPlayer.openPlayer(
        {
          path: path
        },
        function(ret) {
          Toast.clear();
        }
      );
    },
    pauseVideo() {
      var audioPlayer = api.require("audioStreamer");
      audioPlayer.stop();
    },
    onPlay() {
      this.interact_status = this.interact_status == "pause" ? "play" : "pause";
    },
    render(id) {
      getVideoDetail(id).then(rep => {
        Toast.clear();
        this.video = rep;
        this.onPlay();
        this.getLive(id);
      });
    },
    getNews() {
      getNews(this.param).then(rep => {
        this.newList = rep.data;
      });
    },
    getMsg() {
      getMsg(this.$ls.get("token")).then(rep => {
        if (rep !== null) {
          this.msgList = rep;
        }
      });
    },
    getLive(id) {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.getMsg();
        getLiveStatus(id).then(rep => {
          if (rep != null) {
            this.liveStat = rep.stat;
            this.liveList = rep;
          }
        });

        getVideoDetail(id).then(rep => {
          this.video = rep;

          this.liveText = rep.marquee;

          if (rep.activity && rep.activity.stat == 1) {
            const pushId = this.$ls.get("pushId", 0);
            if (pushId != rep.activity.id) {
              getPush(rep.activity.id).then(ret => {
                this.pushInfo = ret;
                this.dialog = true;
                this.$ls.set("pushId", rep.activity.id);
              });
            }
          }
        });
      }, 5000);
    },
    onText() {
      if (this.token) {
        this.$router.push({ path: "/textarea", query: { type: 0 } });
        // api.openWin({
        //     name: 'test',
        //     url: getPath() + '/html/index.html?path=textarea',
        //     pageParam: {
        //         name: 'test'
        //     },
        //     animation: {
        //         type: 'movein',
        //         subType: 'from_bottom'
        //     }
        // });
      } else {
        this.interact_status = "play";

      }
    },
    ad() {
      this.$router.push("/interaction/ad");
    },
    news(data) {
      this.$router.push({ path: "/interaction/news", query: { new: data } });
    },
    openActivityList() {
      if (this.token) {
        this.$router.push("/activity");
        // api.openWin({
        //     name: 'test',
        //     url: getPath() + '/html/index.html?path=activity',
        //     pageParam: {
        //         id: this.video.id
        //     },
        // });
      } else {
        this.interact_status = "play";

      }
    },
    onShowLive() {
      if (this.liveStat == 1) {
        this.interact_status = "play";
        this.fm_playing = false;

        const data = {
          roomId: this.liveList.roomId,
          password: this.liveList.userPwd,
          nickname: this.liveList.roomName
        };

        this.$router.push({ path: "/radio-live", query: { session: data } });
        // api.openWin({
        //   name: "live_frm",
        //   url: getPath() + "/html/index.html?path=radio-live",
        //   pageParam: {
        //     session: {
        //       roomId: "22001693",
        //       password: this.liveList.userPwd,
        //       nickname: "nike"
        //     }
        //   }
        // });
      }
    },
    onGetHongBao() {},
    getDateDiff(dateTimeStamp) {
      var result;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp * 1000;

      if (diffValue < 0) {
        return;
      }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        if (monthC <= 12) result = "" + parseInt(monthC) + "月前";
        else {
          result = "" + parseInt(monthC / 12) + "年前";
        }
      } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    },
    adVote(url) {
      var browser = api.require("webBrowser");
      if (url != "") {
        browser.open({
          url: url
        });
      }
    }
  },
  watch: {
    speech(b) {
      var audio = api.require("audioStreamer");
      if (b) {
        if (this.interact_status == "pause") {
          audio.stop();
        }
      } else {
        // if(this.interact_status == 'pause') {
        //   audio.play();
        // }
      }
    },
    interact_status(s) {
      if (s == "pause") {
        this.playVideo(this.video.video_url);
      } else {
        this.pauseVideo();
      }
    }
  },

  mounted() {
    const first = this.$ls.get("first");

    if (!first) {
      this.showFirst1 = true;
    }
    // let dm = this.$ls.get("dm");
    // alert(JSON.stringify(dm));

    setInterval(() => {
      this.bar();
    }, 2000);

    var audio = api.require("audioStreamer");
    var push = api.require("push");

    let userName = this.$ls.get("userName");
    let userId = this.$ls.get("userId");

    var iflyRecognition = api.require("iflyRecognition");
    iflyRecognition.createUtility(
      {
        ios_appid: "5bb96d8f",
        android_appid: "5bb96ba0"
      },
      function(ret, err) {}
    );

    push.bind(
      {
        userName: userName,
        userId: userId
      },
      _ => {}
    );

    Toast.loading({ mask: false });
    getDefaultFm({ token: this.token }).then(rep => {
      if (rep.id == 0) {
        let current = this.$ls.get("currentId");
        if (current) {
          this.render(current);
        } else {
          this.render(1);
          // this.$router.replace('/list?type=default')
          // alert('1')
          //this.$router.replace('/radio_select')
        }
      } else {
        this.render(rep.id);
      }
    });

    this.$ls.on("currentId", rep => {
      audio.stop();
      this.$router.replace("");
      this.interact_status = "play";
      this.render(rep);
    });

    this.getNews();

    this.iPad = api.deviceModel.indexOf("iPad") > -1;
  }
};
</script>

<style lang="scss"  type="text/scss" >
@import "../../../public/px2rem.scss";

.overlay {
  background: rgba(255, 255, 255, 0);
}

.show {
  position: absolute;
  left: 100px;
  top: 350px;
  z-index: 999;
  width: 200px;
  height: 200px;
  background-color: #ff5f53;
}

#Barrage {
  z-index: 999;
  width: 90%;
  height: px2rem(400);
  /* border:1px solid rgba(204, 204, 204,.2); */
  border-radius: px2rem(22);
  position: absolute;
  left: 0;
  top: px2rem(270);
  overflow: hidden;
}

.BarMes {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(204, 204, 204, 0.3);
  padding: 0 5px;
  height: px2rem(60);
  line-height: px2rem(60);
  display: table;
  // vertical-align: middle;
  /* 文字自适应 */
  float: left;
  .cont {
    display: inline;
  }

  img {
    vertical-align: middle;
    // margin-top: px2rem(10);
    border-radius: px2rem(30);
    height: px2rem(50);
    width: px2rem(50);
    margin-right: px2rem(10);
  }
}

.ul {
  display: block;
  margin-top: 0px;
}

.li {
  border-radius: px2rem(10);
  font-size: px2rem(24);
  color: #fff;
  list-style-type: none;
  width: 90%;
  margin-left: px2rem(30);
  display: inline-block;
  text-align: center;
  line-height: px2rem(50);
  word-break: keep-all;
  /* 不换行 */
  white-space: nowrap;
  /* 不换行 */
  overflow: hidden;
  /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis;
  /*溢出时显示省略标记...；需与overflow:hidden;一起使用*/
  /* border: 1px solid #000; */
}

@-webkit-keyframes anim1 {
  0% {
    top: px2rem(24);
    opacity: 1;
  }

  50% {
    top: -48px;
    opacity: 1;
  }

  75% {
    top: -48px;
    opacity: 0;
  }

  100% {
    top: px2rem(24);
    opacity: 0;
  }
}

@-webkit-keyframes anim2 {
  0% {
    top: 0px;
  }

  25% {
    top: -20px;
  }

  50% {
    top: -35px;
  }

  75% {
    top: -45px;
  }

  100% {
    top: -55px;
  }
}

.BarMes1:nth-child(n + 1) {
  -webkit-animation: anim2 1.2s linear;
  /* linear infinite */
  animation-fill-mode: forwards;
}

@keyframes blink {
  0% {
    color: green;
  }
  50% {
    color: green;
  }
  50.01% {
    color: #dd4814;
  } /* 注意这里定义50.01%立刻透明度为０，可以设置闪烁效果 */
  100% {
    color: #dd4814;
  }
}

/* 定义blink类*/
.blink {
  animation: blink 0.75s linear infinite;
  /* 其它浏览器兼容性前缀 */
  -webkit-animation: blink 0.75s linear infinite;
  -moz-animation: blink 0.75s linear infinite;
  -ms-animation: blink 0.75s linear infinite;
  -o-animation: blink 0.75s linear infinite;
  color: #dd4814;
}

.view-interact {
  // padding-bottom: px2rem(60);
  height: 100%;
  overflow-y: hidden;
  background-color: #f2f4f5;
  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(60);
    .van-pull-refresh__track {
      height: 100%;
    }
  }

  .icon {
    width: px2rem(80);
    position: absolute;
    right: px2rem(30);
    top: px2rem(180);
    z-index: 999;
    border-radius: px2rem(20);
  }
  .header1 {
    // padding: px2rem(32);
    // padding-top: px2rem(38);
    height: px2rem(678);
    background-image: url("../../../assets/images/index/head.png");
    .img-bg {
      top: 0;
      left: 0;
      position: relative;
      width: 100%;
      height: px2rem(678);
    }
    .cont {
      //   position: absolute
      z-index: 10;

      .cont-row {
        margin-top: px2rem(-678);
        padding-top: px2rem(5);
      }

      .live-msg {
        padding-top: px2rem(60);
        padding-left: px2rem(30);
        height: px2rem(460);
        overflow: hidden;
        //   background-color: #000;
        text-align: left;
        .card {
          padding-top: px2rem(0);
          .cont {
            font-size: px2rem(26);
            font-weight: bold;
            padding: px2rem(10);
            border-radius: px2rem(20);
            background: rgba(0, 0, 0, 0.3);
          }
        }
      }
    }

    .img {
      margin-left: px2rem(-30);
      width: px2rem(42);
      height: px2rem(42);
    }
    .img-live {
      width: px2rem(80);
      // height: px2rem(42);
    }
    .name {
      font-size: px2rem(36);
      font-weight: bold;
    }
    .title {
      font-size: px2rem(38);
      font-weight: bold;
    }
    .time {
      font-size: px2rem(26);
      position: absolute;
      left: px2rem(40);
    }
  }

  .live {
    height: px2rem(80);
    background-color: #fff4f1;
    color: #ff5f53;
    padding-left: px2rem(30);
    .img {
      padding-top: px2rem(20);
      width: px2rem(36);
    }
    .title {
      font-size: px2rem(30);
    }
  }

  .ad {
    padding-left: px2rem(30);
    // padding-top: px2rem(18);
    height: px2rem(100);
    line-height: px2rem(100);
    background-color: #fff;

    .title {
      margin-left: px2rem(-30);
      font-size: px2rem(30);
      font-weight: bold;
    }
    .img-alert {
      padding-top: px2rem(30);
      width: px2rem(46);
    }
    .img-enroll {
      padding-top: px2rem(33);
      width: px2rem(72);
    }
  }

  .play {
    height: px2rem(300);
    background-image: url(../../../assets/images/index/play_bg.png);

    .cont {
      //   padding-top: px2rem(30);
      .tuwenhudong {
        width: px2rem(36);
        margin-top: px2rem(70);
      }
      .yuyinhudong {
        width: px2rem(180);
        height: px2rem(180);
      }
      .title {
        margin-top: px2rem(60);
        font-size: px2rem(26);
        color: #9d9a99;
      }
      .yuyinhudong-title {
        margin-top: px2rem(-10);
        font-size: px2rem(26);
        color: #9d9a99;
      }
    }
  }

  .new {
    text-align: center;
    background-color: #f2f4f5;
    .title {
      color: #9d9a99;
      font-size: px2rem(26);
      font-weight: bold;
    }
  }

  .info {
    padding-top: px2rem(10);
    padding-right: px2rem(20);
    .cont {
      color: #292726;
      font-size: px2rem(30);
      font-weight: bold;
    }
    .brief_title {
      padding-top: px2rem(16);
      font-size: px2rem(24);
      color: #9d9a99;
    }
    .brief {
      padding-top: px2rem(16);
      margin-left: px2rem(30);
      font-size: px2rem(24);
      color: #9d9a99;
    }
    .img {
      width: px2rem(200);
      height: px2rem(150);
    }
  }

  &.ipad {
    .base-block {
      height: px2rem(360);
    }
    .player-block {
      height: px2rem(52);
      padding-top: px2rem(20);

      h5 {
        margin-top: px2rem(20);
        span {
          font-size: px2rem(24);
          padding-top: px2rem(54);
          color: rgba(38, 38, 40, 0.4);
        }
      }

      /*p {*/
      /*float: right;*/
      /*}*/
    }
  }

  .pull-info-img {
    max-height: px2rem(320);
  }

  .speech-modal {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 1000;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
    .speech-body {
      position: absolute;
      top: px2rem(300);
      left: 25%;
      background-color: rgba(0, 0, 0, 0.7);
      height: px2rem(400);
      width: px2rem(400);
      margin-left: -px2rem(200);
      border-radius: px2rem(20);
      .content {
        padding: 0 px2rem(10);
        display: flex;
        height: px2rem(340);
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: px2rem(20);
          .iconfont {
            color: #fff;
            // font-size: px2rem(200);
          }
        }
        .right {
          flex: 1;
          display: flex;
          align-items: flex-end;
          padding-bottom: px2rem(55);
          padding-right: px2rem(20);
          padding-left: px2rem(20);
          justify-content: center;
          ul {
            flex: 1;
            display: flex;
            flex-direction: column-reverse;
            li {
              flex: 1;
              height: px2rem(28);
              border-radius: px2rem(4);
              background-color: #fff;
              margin-bottom: px2rem(15);
            }
            li:nth-child(1) {
              width: 40%;
            }
            li:nth-child(2) {
              width: 55%;
            }
            li:nth-child(3) {
              width: 70%;
            }
            li:nth-child(4) {
              width: 85%;
            }
            li:nth-child(5) {
              width: 100%;
            }
          }
        }
      }

      > p {
        text-align: center;
        font-size: px2rem(28);
        color: #fff;
      }
    }

    .speech-footer {
      position: absolute;
      top: px2rem(850);
      width: 100%;

      .voice-tag {
        display: inline-block;
        width: px2rem(112);
        text-align: center;
        line-height: px2rem(112);
        height: px2rem(112);
        background-color: #ff5f53;
        border-radius: 50%;
        position: absolute;
        top: px2rem(0);
        font-size: px2rem(46);
        color: #262628;
        left: px2rem(461);
        .text {
          color: #fff;
          font-size: px2rem(24);
        }
      }

      .voice-circle {
        width: px2rem(320);
        height: px2rem(320);
        box-shadow: 0px 0px px2rem(40) 0px rgba(0, 0, 0, 0.05);
        border: solid 2px #ff5f53;
        margin: 0 auto;
        border-radius: 50%;
        position: relative;
        display: block;
        text-align: center;
        background: url(../../../assets/images/Wechat.png) no-repeat;
        background-position: center center;
        background-size: px2rem(140) px2rem(140);
        background-color: #fff;
        &.speech {
          background-color: #f1f1f1;
        }
        > p {
          text-align: center;
          font-size: px2rem(24);
          margin: 0;
          padding-top: px2rem(54);
          color: rgba(38, 38, 40, 0.4);
        }
        > h5 {
          margin-top: px2rem(145);
          text-align: center;
          color: #262628;
          font-size: px2rem(24);
        }
      }
    }
  }

  .van-nav-bar__right,
  .van-nav-bar__left {
    width: px2rem(160) !important;
  }
  .van-nav-bar__left {
    text-align: left;
    padding-left: px2rem(34);
  }

  .van-nav-bar__right .header-button {
    line-height: 0;
  }

  .header-button {
    display: inline-block;
    padding-top: px2rem(16);
    padding-left: px2rem(16);
    position: relative;
    img {
      height: px2rem(56);
    }
    .status {
      font-size: px2rem(24);
      color: #999;

      &.blink {
        color: #dd4814;
      }
    }
  }

  .van-hairline--bottom::after {
    border-width: 0;
  }
  .main {
    position: relative;
    padding-top: px2rem(24);
  }
  .base-block {
    position: relative;
    margin-left: px2rem(72);
    margin-right: px2rem(72);
    height: px2rem(616);
    background-color: #fff;
    box-shadow: 0px px2rem(20) px2rem(50) 0px rgba(0, 0, 0, 0.1);
    > p {
      padding: 0;
      margin: 0;

      img {
        height: px2rem(25);
        position: absolute;
        left: px2rem(17);
        top: px2rem(16);
      }

      span {
        font-size: px2rem(25);
        font-weight: normal;
        font-stretch: normal;
        line-height: px2rem(28);
        position: absolute;
        left: px2rem(56);
        top: px2rem(16);
        letter-spacing: 0;
        color: #777;
      }
    }

    .news {
      &:active {
        background-color: #efefef;
      }
      position: absolute;
      display: flex;
      bottom: 0;
      height: px2rem(112);
      width: 100%;
      left: 0;
      padding: 0 px2rem(16);
      align-items: center;

      .icon {
        width: px2rem(80);
        padding-top: px2rem(12);
        img {
          width: px2rem(64);
        }
      }
      .arrow {
        width: px2rem(80);
        padding-top: px2rem(12);
        text-align: center;
        img {
          height: px2rem(64);
        }
      }
      .content {
        flex: 1;
        p,
        h5 {
          margin: 0;
          padding: 0;
        }
        h5 {
          font-size: px2rem(26);
          font-weight: bold;
          font-stretch: normal;
          line-height: px2rem(44);
          letter-spacing: 0px;
          color: #262628;
        }
        p {
          font-size: px2rem(24);
          font-weight: normal;
          font-stretch: normal;
          line-height: px2rem(32);
          letter-spacing: 0px;
          color: #777777;
        }
      }
    }
  }
  .player-block {
    // position: absolute;
    // top: px2rem(80);
    // left: px2rem(40);
    // right: px2rem(40);
    // height: px2rem(448);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: px2rem(55);
    // padding-left: px2rem(40);

    .play-button {
      //   padding-top: px2rem(90);
      width: px2rem(46);
      height: px2rem(46);
      display: inline-block;
      //   border-radius: 50%;

      &.play {
        background: url(../../../assets/images/radio/jingyin@3x.png) no-repeat;
        background-size: 100% 100%;
      }

      &.pause {
        background: url(../../../assets/images/radio/bofang@3x.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    h5 {
      font-family: "PingFang-SC-Bold";
      font-size: px2rem(40);
      font-weight: 400;
      font-stretch: normal;
      line-height: px2rem(20);
      margin-top: px2rem(70);
      margin-bottom: px2rem(18);
      color: #262628;
    }
    p {
      font-size: px2rem(26);
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      margin: px2rem(14) 0 0 0;
      color: rgba(0, 0, 0, 0.3);
    }
  }
  .voice-block {
    position: relative;
    padding-top: px2rem(80);
    .voice-circle {
      width: px2rem(320);
      height: px2rem(320);
      background: url(../../../assets/images/Wechat.png) no-repeat;
      background-position: center center;
      background-size: px2rem(140) px2rem(140);
      box-shadow: 0px 0px px2rem(40) 0px rgba(0, 0, 0, 0.05);
      border: solid 2px #fce76c;
      margin: 0 auto;
      border-radius: 50%;
      position: relative;
      &.speech {
        background-color: #f1f1f1;
      }
      p {
        text-align: center;
        font-size: px2rem(24);
        margin: 0;
        padding-top: px2rem(54);
        color: rgba(38, 38, 40, 0.4);
      }
      h5 {
        margin-top: px2rem(145);
        text-align: center;
        color: #262628;
        font-size: px2rem(24);
      }
    }
    .voice-tag {
      display: inline-block;
      width: px2rem(112);
      text-align: center;
      line-height: px2rem(112);
      height: px2rem(112);
      background-color: #fce76c;
      border-radius: 50%;
      position: absolute;
      top: px2rem(81);
      font-size: px2rem(46);
      color: #262628;
      left: px2rem(461);
    }
  }

  .hongbao {
    position: absolute;
    top: px2rem(180);
    right: px2rem(20);
    img {
      width: px2rem(120);
      border-radius: px2rem(20);
    }
  }
}
</style>
