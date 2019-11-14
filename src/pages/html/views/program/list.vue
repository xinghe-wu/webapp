<template>
  <div>
    <div class="header">
      <div class="aui-row title">
        <div class="aui-col-xs-1" @click="onClickLeft()">
          <van-icon name="arrow-left" style="margin-left: 12px;" />
        </div>

        <div class="aui-col-xs-9">
          &nbsp
        </div>

        <div class="aui-col-xs-2" v-show="column.free == 0">
          <div
            class="btn"
            v-show="column.subscribe === 1"
            @click="postSubscribes(column.id)"
          >
            已订阅
          </div>
          <div
            class="btn-follow"
            @click="postSubscribes(column.id)"
            v-show="column.subscribe === 0"
          >
            订阅
          </div>
        </div>
      </div>

      <div class="egret-flex-item musiclistprofile">
        <div class="egret-flex-item-shelf">
          <div class="title">{{ column.name }}</div>
          <div class="cont">{{ column.brief }}</div>
        </div>
      </div>
      <div class="userinfo">
        <div
          class="userinfocol01 userinfocol br"
          tapmode="toolhover"
          @click="zan(column.id)"
          data-click="0"
        >
          <div class="info">
            <img
              src="../../../../assets/images/ico_like@3x.png"
              alt=""
              class="like-img"
            />
          </div>
          <div class="num">{{ column.zans }}</div>
        </div>
        <div
          class="userinfocol02 userinfocol br"
          tapmode="toolhover"
          @click="commentsClick"
        >
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclistcommet.png"
              alt=""
            />
          </div>
          <div class="num">{{ column.comments }}</div>
        </div>
        <div
          class="userinfocol03 userinfocol br"
          tapmode="toolhover"
          @click="openShare"
        >
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclistshare.png"
              alt=""
            />
          </div>
          <div class="num">{{ column.shares }}</div>
        </div>
      </div>
    </div>

    <div v-if="!freeShow">
      <div class="radius">
        <div class="listen">
          <div class="title">
            电台简介
          </div>
        </div>
      </div>

      <div class="class">
        <div class="introduction" v-html="column.courseCont"></div>

        <div class="footer">
          <div class="aui-row ">
            <div class="aui-col-xs-5 audition">
              <div class="aui-row ">
                <div class="aui-col-xs-5" style="text-align:right">
                  <img src="../../../../assets/images/radio/audition.png" />
                </div>
                <div class="aui-col-xs-7 free-btn" @click="freeListen">
                  <div style="color:#FF5F53;">免费试听</div>
                </div>
              </div>
            </div>
            <div class="aui-col-xs-7 buy" @click="buy(column.id)">
              <span style="color:#fff">购买：{{ column.money }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="freeShow">
      <!-- 2 播放全部 -->
      <div
        class="egret-flex-item isolateitem-bottom playall"
        tapmode="allplayhover"
      >
        <div class="egret-flex-item-shelf">
          <div class="egret-flex-item-shelf03">
            共{{ num }}期
            <span class="totalnum">已更新完成</span>
          </div>
        </div>
        <div class="egret-flex-item-arrow">
          <!-- <img
            src="../../../../assets/images/musiclist/musiclistplayarrow.png"
            alt=""
            class=""
          /> -->
          <!-- <span class="title">排序</span> -->
        </div>
      </div>

      <!-- 3  -->

      <div
        class="egret-flex-item musiclist-item"
        v-for="(p, index) in programList"
        :key="index"
      >
        <div class="egret-flex-item-logo">
          {{ p.count }}
        </div>
        <div class="egret-flex-item-abright" @click="playClick(p)">
          <div class="egret-flex-item-shelf">
            <div class="egret-flex-item-shelf01">{{ p.name }}</div>

            <div class="egret-flex-item-shelf02">
              <van-tag
                plain
                type="primary"
                v-if="column.free == 1"
                style="margin-right:10px"
                >试听</van-tag
              >

              <span class="title">{{ formatDateTime(p.create_time) }}</span>
              <img
                src="../../../../assets/images/radio/shijian@2x.png"
                alt=""
                class="shijian"
              />
              <span class="title">{{ formatSeconds(p.play_time) }}</span>
              <img
                src="../../../../assets/images/radio/bofang@2x.png"
                alt=""
                class="shijian"
              />
              <span class="title">{{ p.play_count }}</span>
            </div>
            <!-- <div class="egret-flex-item-shelf02" style="display:inline">{{formatDateTime(p.create_time)}}</div> -->
          </div>
          <div class="egret-flex-item-arrow">
            <img
              src="../../../../assets/images/ico_more@3x.png"
              alt=""
              class="toobarimg"
              @click="expandlist(0, this)"
            />
          </div>
        </div>
      </div>
      <div class="musiclist-item-tool" data-click="0">
        <div class="userinfocol" tapmode="toolhover">
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclisttool01.png"
              alt=""
            />
          </div>
          <div class="num">收藏</div>
        </div>
        <div class="userinfocol" tapmode="toolhover" @click="downloadMusic()">
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclisttool01.png"
              alt=""
            />
          </div>
          <div class="num">下载</div>
        </div>
        <div
          class="userinfocol"
          tapmode="toolhover"
          @click="openMusiclistshare()"
        >
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclisttool03.png"
              alt=""
            />
          </div>
          <div class="num">分享</div>
        </div>
        <div class="userinfocol" tapmode="toolhover">
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclisttool04.png"
              alt=""
            />
          </div>
          <div class="num">歌手</div>
        </div>
        <div class="userinfocol" tapmode="toolhover">
          <div class="info">
            <img
              src="../../../../assets/images/musiclist/musiclisttool05.png"
              alt=""
            />
          </div>
          <div class="num">专辑</div>
        </div>
      </div>
    </div>

    <div class="floatbox" v-show="isShow">
      <div class="title">分享到</div>
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
      <div class="cancelbtn" tapmode="" @click="closeShare">取消</div>
    </div>
  </div>
</template>
<script>
import {
  getProgram,
  src,
  postSubscribes,
  postProgramListen,
  postInfoZan,
  getPayCreate,
  getColumnById
} from "../../index/services";
import { Toast } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      isShow: false,
      freeShow: true,
      column: {},
      num: 0,
      programList: [],
      query: {
        page: 1,
        size: 10,
        id: 0
      }
    };
  },
  methods: {
    render(loaded) {
      const id = this.$route.query.column;

      getColumnById({ token: this.$ls.get("token"), id: id }).then(rep => {
        this.column = rep.data;
        if (this.column.free == 1) {
          this.freeShow = false;
        } else {
          this.freeShow = true;
        }

        postProgramListen({
          token: this.$ls.get("token"),
          columnId: this.column.id
        }).then(rep => {
          // alert(JSON.stringify(this.column.id))
        });

        this.query.id = this.column.id;
        getProgram(this.query).then(rep => {
          this.programList = rep.data;
          // alert(JSON.stringify(this.programList))
          this.num = this.programList.length;

          this.isLoading = false;
          if (loaded) {
            loaded("done");
          }
        });
      });
    },

    openMusiclistshare() {
      this.isShow = true;
    },
    postSubscribes(id) {
      postSubscribes({ token: this.$ls.get("token"), coumnId: id }).then(
        rep => {
          // alert(JSON.stringify(rep))
          Toast.success("订阅成功");
          this.column.subscribe = 1;
        }
      );
    },

    closeShare() {
      this.isShow = false;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    openShare() {
      this.isShow = true;
    },
    zan(id) {
      postInfoZan({ token: this.$ls.get("token"), type: 3, typeId: id }).then(
        rep => {
          this.render();
        }
      );
    },

    weixin(type) {
      this.closeShare();

      var wx = api.require("wx");
      wx.shareWebpage(
        {
          apiKey: "",
          scene: type,
          title: this.column.name,
          description: this.column.brief,
          // thumb: "widget://a.jpg",
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
    },
    freeListen() {
      this.freeShow = true;
    },
    commentsClick() {
      this.$router.push({
        path: "/anchor/columnComment",
        query: { comment: this.column, type: 3, back: 1 }
      });
    },
    playClick(p) {
      this.$ls.set("programList", this.programList);
      this.$ls.set("pId", p.id);
      // this.$ls.set('column', this.column)

      this.$router.push({
        path: "/program/play",
        query: { programList: this.programList, id: p.id, column: this.column }
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
      return m + "-" + d;
    },
    formatSeconds(value) {
      var secondTime = parseInt(value); // 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        //如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
          //获取小时，获取分钟除以60，得到整数小时
          hourTime = parseInt(minuteTime / 60);
          //获取小时后取佘的分，获取分钟除以60取佘的分
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      var result = "" + parseInt(secondTime) + "";

      if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + ":" + result;
      }
      if (hourTime > 0) {
        result = "" + parseInt(hourTime) + ":" + result;
      }
      return result;
    }
  },
  created() {
    this.render();
  }
};
</script>


<style lang="scss" type="text/scss" >
@import "../../../../public/px2rem.scss";

.hdivider {
  width: 100%;
  height: 1px;
  background-color: #e0e0e0;
}
.br {
  border-right: 1px solid #e0e0e0;
}

.row {
  display: -webkit-box;
  display: -webkit-flex;
}
.col {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  margin: 0 5px;
  position: relative;
}

.swiper-container img {
  width: 100%;
}
.sort {
  color: #292726;
  font-size: 26px;
}

/* 歌单标题 */
.sectionTitle {
  height: 2em;
  line-height: 2em;
  font-size: 1.12em;
}
.sectionTitle .titleDivider {
  display: inline-block;
  height: 1.12em;
  width: 3px;
  vertical-align: top;
  background-color: #d43c33;
  margin-top: 0.44em;
  margin-left: 0.7em;
  margin-right: 0.3em;
}
/* 歌单 */
.col .listcoverbar {
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 1.2em;
}
.col .listcoverbar span {
  color: #fff;
}
.col .listcoverbar .earphone {
  width: 1em;
  margin-top: 0.2em;
  margin-right: 0.3em;
}
.col .listcover {
  width: 100%;
}
.col .listtitle {
  height: 2.4em;
  font-size: 1em;
  line-height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* item样式 */
.egret-item {
  height: 4em;
}
.egret-item .egret-item-box-cover-center {
  display: table;
  height: inherit;
}
.egret-item .egret-item-box-cover-center .egret-item-box-abtc {
  display: table-cell;
  vertical-align: middle;
}
.egret-item .egret-item-box-cover-center .egret-item-box-abtc img {
  width: 3em;
  vertical-align: top;
}
/* 右侧箭头样式 */
.egret-item .egret-item-arrow {
  display: table;
  height: inherit;
}
.egret-item .egret-item-arrow .egret-item-box-abtc {
  display: table-cell;
  vertical-align: middle;
}
.egret-item .egret-item-arrow .egret-item-box-abtc img {
  width: 0.8em;
  vertical-align: top;
}
/* 中间shelf  两个条目*/
.egret-item .egret-item-shelf {
  height: inherit;
}
.egret-item .egret-item-shelf .egret-item-shelf-title {
  font-size: 1.1em;
  margin-top: 0.6em;
}
.egret-item .egret-item-shelf .egret-item-shelf-subtitle {
  font-size: 0.6em;
  color: #666;
  margin-top: 0.6em;
}
/* 中间shelf 一个条目 */
.egret-item .egret-item-shelf-single {
  height: inherit;
  line-height: 4em;
  font-size: 1.1em;
}
.egret-item .egret-item-shelf-redclassify {
  color: #e03f40;
  border: 1px solid #e03f40;
  font-size: inherit;
  padding: 0.1em;
  border-radius: 1px;
  margin-right: 5px;
}

/* 用flex重写框架 */
.egret-flex-item {
  display: -webkit-box;
  -webkit-box-align: center;
  height: 3em; /*background-color: #fff;*/
}
/* 左部logo */
.egret-flex-item-logo {
  max-width: px2rem(100);
  min-width: px2rem(100);
  margin-left: 0.5em;
  margin-right: 0.2em;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
  color: #9d9a99;
  font-size: px2rem(30);
}
.egret-flex-item-logo img {
  height: 2em;
  width: 2em;
  -webkit-box-align: center;
  vertical-align: top; /*否则图片不会居中，底部仍然是会有空白*/
}
/* 中间文本信息 */
.egret-flex-item-shelf {
  overflow: hidden;
  -webkit-box-flex: 2;
  -webkit-box-align: center;
}
.egret-flex-item-shelf div {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.egret-flex-item-shelf .egret-flex-item-shelf01 {
  color: #292726;
  font-weight: bold;
  font-size: px2rem(28);
}

.egret-flex-item-shelf .egret-flex-item-shelf02 {
  color: #9d9a99;
  font-size: px2rem(22);
}

.egret-flex-item-shelf .egret-flex-item-shelf03 {
  color: #292726;
  font-weight: bold;
  font-size: px2rem(28);
  padding-left: px2rem(30);
}

.egret-flex-item-shelf .totalnum {
  color: #292726;
  font-weight: bold;
  font-size: px2rem(28);
  padding-left: px2rem(30);
}

.egret-flex-item-shelf .egret-flex-item-redclassify {
  color: #e03f40;
  border: 1px solid #e03f40;
  font-size: inherit;
  padding: 0.1em;
  border-radius: 1px;
  margin-right: 5px;
}

/* 右部箭头 */
.egret-flex-item-arrow {
  -webkit-box-flex: 1;
  max-width: 10px;
  min-width: 10px;
  margin-right: 15px;
}
.egret-flex-item-arrow img {
  width: px2rem(32);
  height: px2rem(32);
}

/* 暗头部 */
.egret-dark-title {
  height: 1.4em;
  line-height: 1.4em;
  font-size: 0.8em;
  background-color: #e7e7e7;
  color: #666;
  padding-left: 10px;
}

/* special 对个别自定义 */
.special {
  height: 4em;
}
.special .egret-flex-item-logo img {
  height: 3em;
  width: 3em;
}

/* */
.inputmusic {
  text-align: center;
  margin-top: 30px;
}
.inputmusic p {
  color: #6f6f6f;
}
.inputmusic p .inputbtn {
  color: #3a9dd3;
  text-decoration: underline;
}

/* 独立条目 */
.isolateitem-top {
  margin-top: 10px;
  border-top: 1px solid #e0e0e0;
}
.isolateitem-bottom {
  border-bottom: 1px solid #e0e0e0;
}

/* 退出 */
.exitbtn {
  margin: 15px 10px;
  border-radius: 4px;
  border: 1px solid #d33a31;
  background-color: #fff;
  color: #d33a31;
  text-align: center;
  height: 2em;
  line-height: 2em;
}

.header {
  background-image: url(../../../../assets/images/radio/music.jpg);
  height: px2rem(540);

  .title {
    padding-left: px2rem(10);
    padding-top: px2rem(80);
    font-size: px2rem(34);
    text-align: left;
    color: #fff;
  }
  .cont {
    padding-left: px2rem(10);
  }
  .btn {
    text-align: center;
    padding-top: px2rem(12);
    background-color: #e3e8ee;
    color: #232323;
    width: px2rem(100);
    height: px2rem(56);
    font-size: px2rem(26);
    border-radius: 10%;
  }
  .btn-follow {
    text-align: center;
    padding-top: px2rem(12);
    background-color: #ff5f53;
    color: #fff;
    width: px2rem(100);
    height: px2rem(56);
    font-size: px2rem(26);
    border-radius: 10%;
  }
}

.radius {
  z-index: 999;
  height: px2rem(300);
  position: absolute;
  top: px2rem(470);
  left: 0;
  right: 0;
}
.listen {
  background-color: #fff;
  border-radius: px2rem(30);
  /*background-color: #fff;*/
}
.listen .title {
  color: #292726;
  font-size: px2rem(34);
  font-weight: bold;
  padding: px2rem(30) 0 px2rem(20) px2rem(30);
}
.listen .cont {
  color: #292726;
  font-weight: 700;
}

.listen .img {
  width: 130px;
}

.class {
  padding: px2rem(30);
  padding-bottom: px2rem(80);
  background-color: #fff;
  .title {
    padding-top: px2rem(20);
    color: #292726;
    font-size: px2rem(34);
  }
  .cont {
    padding-top: px2rem(20);
    color: #646261;
    font-size: px2rem(28);
  }
}

.introduction {
  color: #646261;
  font-size: px2rem(28);
  width: 100%;
}

.introduction img {
  width: 100%;
  object-fit: fill;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: px2rem(100);
  background-color: #fff;
  z-index: 9999;
  border-top: 1px solid #e6eaed;
}

.footer .audition {
  font-size: px2rem(28);
  padding-top: px2rem(20);
  text-align: center;
  height: px2rem(100);
  color: #ff5f53;
  img {
    width: px2rem(50);
  }
  .free-btn {
    padding-top: px2rem(6);
    text-align: left;
  }
}

.footer .buy {
  font-size: px2rem(28);
  padding-top: px2rem(30);
  text-align: center;
  height: px2rem(100);
  color: #fff;
  background-color: #ff5f53;
}
/* 个人用户标题 */
.musiclistprofile {
  padding-top: px2rem(40);
  padding-left: px2rem(20);
}
.musiclistprofile .title {
  color: #fff;
  font-weight: bold;
  font-size: px2rem(36);
}
.musiclistprofile .cont {
  color: #fff;
  font-size: px2rem(26);
}

.musiclistprofile .egret-flex-item-logo img {
  height: 6em;
  width: 6em;
}
.musiclistprofile .egret-flex-item-logo {
  max-width: 6em;
  min-width: 6em;
  margin-left: 0.5em;
  margin-right: 0.2em;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
}
.musiclistprofile .egret-flex-item-shelf {
  margin-left: 0.5em;
}
.musiclistprofile .egret-flex-item-shelf .egret-flex-item-shelf01 {
  color: #292726;
  font-size: px2rem(28);
}
.musiclistprofile .egret-flex-item-shelf .egret-flex-item-shelf02 {
  margin-top: 1.6em;
  color: #9d9a99;
  font-size: px2rem(22);
  -webkit-box-align: center;
  display: -webkit-box;
}
.musiclistprofile .egret-flex-item-shelf .egret-flex-item-shelf02 .createrlogo {
  width: 2em;
}
.musiclistprofile .egret-flex-item-shelf .egret-flex-item-shelf02 .creatername {
  margin: 0 1em;
}
.userinfo {
  display: -webkit-box;
  padding-top: px2rem(100);
  color: #fff;
}
.userinfo .userinfocol {
  /*-webkit-box-flex:1;*/
  padding: 0 0;
  text-align: center;
  width: 25%;
}
.userinfo .userinfocol .info {
  font-size: px2rem(28);
  color: #999;
}
.userinfo .userinfocol .info img {
  width: px2rem(30);
}
.userinfo .info .like-img {
  width: px2rem(80);
}
.userinfo .userinfocol .num {
  font-size: px2rem(28);
}

/* 播放全部*/
.playall {
  height: px2rem(112);
  background-color: #f9f9f9;
  img {
    vertical-align: middle;
    width: px2rem(32);
  }
  .title {
    vertical-align: middle;
    padding-left: px2rem(5);
    text-align: center;
    color: #292726;
    font-size: px2rem(26);
  }
}
.playall .egret-flex-item-arrow {
  -webkit-box-flex: 1;
  max-width: 2em;
  min-width: 2em;
  margin-right: 15px;
}
.playall .egret-flex-item-arrow img {
  max-width: none;
}
.playall .egret-flex-item-logo img {
  width: 1.5em;
  height: 1.5em;
}

/* egret item 抽象右部 */
.egret-flex-item-abright {
  display: -webkit-box;
  -webkit-box-flex: 1;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-align: center;
  height: 3em;
}

/* musiclist 特殊样式 */
.musiclist-item {
  height: 3em;
  .shijian {
    margin-right: px2rem(10);
    margin-left: px2rem(30);
    vertical-align: middle;
    width: px2rem(22);
  }
  .title {
    color: #9d9a99;
    vertical-align: middle;
    font-size: px2rem(22);
  }
}
.musiclist-item .egret-flex-item-logo {
  text-align: center;
  font-size: px2rem(30);
  font-weight: bold;
  color: #9d9a99;
}
.musiclist-item .egret-flex-item-shelf .egret-flex-item-shelf01 {
  color: #292726;
  font-size: px2rem(30);
  font-weight: bolder;
}
.musiclist-item .egret-flex-item-arrow {
  max-width: 24px;
  min-width: 24px;
}
.musiclist-item .egret-flex-item-arrow img {
  max-width: none;
}

/* 弹出工具条 */
.musiclist-item-tool {
  background-color: #303030;
  color: #fff;
  display: -webkit-box;
  padding: 0 10px;
  display: none;
}
.musiclist-item-tool .userinfocol {
  -webkit-box-flex: 1;
  text-align: center;
  padding: 5px 0;
}
.musiclist-item-tool .userinfocol .info img {
  width: px2rem(40);
}
.musiclist-item-tool .userinfocol .num {
  color: #a8a8a8;
  font-size: px2rem(28);
}

/* 悬浮 */
.exitbtnhover {
  background-color: #d33a31;
  color: #fff;
}
.userinfo .toolhover {
  background-color: #e2e2e2;
}
.musiclist-item-tool .toolhover {
  background-color: #1d1d1d;
}
.allplayhover {
  background-color: #e2e2e2;
}

.floatbox {
  position: absolute;
  background: #fff;
  bottom: 0;
  width: 100%;
}
.floatheader {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #999;
  text-align: left;
  margin-left: 20px;
}
.floatbody {
  border-bottom: 1px solid #d0d2d6;
}
.floatbodybtn {
  width: 20px;
  height: 20px;
  background: #0fc;
}
.floatfooter {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
}

/* 水平等宽样式 */
.floatbox .item {
  font-size: 16px;
  padding-left: 15px;
  color: #999;
  padding-right: 15px;
  background-color: #f5f5f5;
}
.floatbox .item:last-child {
  border-bottom: 0;
}
.floatbox .checkmark {
  width: 20px;
  float: right;
  margin-top: 18px;
  margin-right: 10px;
}
.floatbox .title {
  height: 30px;
  line-height: 30px;
  color: #000;
  background-color: #e0e0e0;
  padding-left: 10px;
  font-size: 10px;
}

.row {
  display: -webkit-box;
  display: -webkit-flex;
}
.col {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  box-flex: 1;
  text-align: center;
  height: 90px;
}
.col img {
  width: 50px;
  margin-top: 10px;
}
.col div {
  margin-top: 5px;
  color: #7d7d7d;
  font-size: 14px;
}
/* 悬浮样式 */
.floatbox .item .row .btnhover {
  background-color: #00aeef;
}

/*table .br {border-right: 1px solid #e5e5e5;}
		table .bb {border-bottom: 1px solid #e5e5e5;}*/
table {
  width: 100%;
  text-align: center;
  background-color: #fafafa;
}
table img {
  width: 34px;
  height: 34px;
  margin: 0;
  margin-top: 10px;
}
table td .section2title {
  padding: 5px 0 10px 0px;
  color: #292726;
  font-size: px2rem(24);
}
table td {
  width: 25%;
}
.cancelbtn {
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
}
.swiper-container img {
  width: 34px;
}
.swiper-container {
  width: 100%;
  height: 160px;
  background-color: #fafafa;
}
</style>
