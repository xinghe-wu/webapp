<template>
  <div class="view-live">
    <ul class="tab" id="live-tab" :style="{paddingTop:paddingTop}">
      <li @click="recommeClick()">
        <span :class="recomme_status">推荐</span>
      </li>
      <li @click="followClick()">
        <span :class="follow_status">关注</span>
      </li>
    </ul>

    <!-- 推荐 -->
    <div class="recomme" v-show='recommeShow'>
      <div class="title">
        为你推荐
      </div>
      <section class="aui-grid aui-margin-b-15">
        <div class="aui-row list">
          <div class="aui-col-xs-6" @click="column">
            <div class="lanmu">
              <span class="title">听到栏目</span>
            </div>
          </div>
          <div class="aui-col-xs-6" @click="anchor">
            <div class="zhubo">
              <span class="title">听到主播</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- 已关注 -->
    <div class="follow-list" v-show='followShow'>
      <div>
        <swiper :options="swiperOption" class="follow-list-swiper" v-show="recomList.length>0">
          <swiper-slide>
            <div class="aui-card-list" @click="followList">
              <div class="aui-card-list-content">
                <img src="../../../assets/images/radio/all.png" class="img">
              </div>
              <div class="swiper-title">查看全部</div>
            </div>
          </swiper-slide>
          <swiper-slide v-for="r in recomList">
            <div class="aui-card-list">
              <div class="aui-card-list-content" @click="anchor_detail(r.id)">
                <img :src="src + r.head" class="aui-img-round aui-list-img-sm anchor-head img">
              </div>
              <div class="swiper-title">{{r.name}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="anchor">
      <div class="aui-card-list" v-for="i in infoList">
        <div class="aui-card-list-header aui-card-list-user aui-border-b">

          <div class="aui-card-list-user-avatar">
            <img :src="src+i.head" class="aui-img-round" @click="anchor_detail(i.compereId)" />
          </div>
          <div class="aui-card-list-user-name">
            <div class="name">{{i.name}}</div>
            <div v-if="i.follow" class="aui-btn btn">已关注</div>
            <div v-else class="aui-btn btn-follow" @click="compereFollow(i.compereId)">关注</div>
          </div>
          <div class="aui-card-list-user-info time">11-25 09:12</div>
        </div>

        <!-- anchor_detail -->
        <div class="aui-card-list-content-padded" @click="commentClick(i)">

          <p class="cont">{{i.cont}}</p>
          <img :src="src+i.img" class="anchor-cont-img" />
        </div>
        <div class="aui-card-list-footer aui-border-t footer-list">
          <div @click='postZan(i.id)'> <img class="img" src="../../../assets/images/radio/like.png" />
            <span class="title-check"> {{i.zans}}</span>
          </div>
          <div @click="commentClick(i)"> <img class="img" src="../../../assets/images/radio/comment.png" />
            <span class="title">{{i.comments}}</span>
          </div>
          <div> <img class="img" @click="openShare" src="../../../assets/images/radio/forward.png" />
            <span class="title"></span>
          </div>
        </div>
      </div>

    </div>

    <div class="floatbox" v-show="isShow">

      <div class="title">分享到
        <span @click="closeShare" style="position:absolute;right:10px;font-size:14px">关闭</span>

      </div>

      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!--First Slide-->
          <div class="swiper-slide">
            <table id="section02">
              <tr>
                <td class=" ">
                  <div class="section2ico"><img src="../../../assets/images/frame04cover/cm2_mlogo2_weixin.png" alt=""></div>
                  <div class="section2title">微信</div>
                </td>
                <td class=" ">
                  <div class="section2ico"><img src="../../../assets/images/frame04cover/logo.png" alt=""></div>
                  <div class="section2title">微信朋友圈</div>
                </td>
                <td class="">
                  <div class="section2ico"><img src="../../../assets/images/frame04cover/cm2_mlogo2_sina.png" alt=""></div>
                  <div class="section2title">QQ好友</div>
                </td>
                <td class="">
                  <div class="section2ico"><img src="../../../assets/images/frame04cover/cm2_mlogo2_tencent.png" alt=""></div>
                  <div class="section2title">QQ空间</div>
                </td>
              </tr>
              <tr>

              </tr>
            </table>
          </div>

        </div>

      </div>
      <div class="cancelbtn" tapmode="" @click="closeShare">取消</div>
    </div>

    <!-- 
      <div class="content" id="live-content">
            <pull-to :top-load-method="refresh" >

            <ul class="list">
                <li class="item" v-for="n in data" @click="onOpenLive(n)" v-ripple>
                    <div class="img">
                        <progressive-img  :src="src + n.head" />
                    </div>
                    <p>{{n.name}}</p>
                </li>
            </ul>
            </pull-to>
        </div> -->
  </div>
</template>

<script>
import PullTo from 'vue-pull-to';
import { Toast } from 'vant';
import { getLive, src, getPath, getCompere, getCompereRecom, getInfos, postInfoZan, postCompereFollow } from '../index/services';
export default {
  store: ['paddingTop', 'interact_status', 'fm_playing'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        slidesOffsetBefore: 20,
        spaceBetween: 20,
      },
      isShow: false,
      recomme_status: 'title-active',
      follow_status: 'title',
      isLoading: false,
      recommeShow: true,
      followShow: false,
      src: src,
      data: [],
      infoList: [],
      recomList: [],
      page: 1,
      query: {
        token: '',
        page: 1,
        size: 10,
        id: 1
      },
      param: {
        token: '',
        id: 1,
        type: 1,
        page: 0,
        size: 10
      },
      iconLink: ''
    }
  },
  methods: {
    render(loaded) {
      this.query.token = this.$ls.get('token')
      getCompere(this.query).then(rep => {

        this.data = rep.data;
        this.isLoading = false;
        if (loaded) {
          loaded('done');
        }
      })
    },
    refresh(loaded) {
      this.render(loaded);
    },
    compereRecom() {

      getCompereRecom({ 'token': this.$ls.get('token'), 'id': 1 }).then(rep => {
        this.recomList = rep.data
      })
    },
    anchor_detail(id) {
      this.$router.push({ path: '/anchor/detail', query: { compereId: id } })
    },
    recommeClick() {
      this.recomme_status = 'title-active',
        this.follow_status = 'title',
        this.recommeShow = true;
      this.followShow = false;
    },
    compereFollow(id) {
      //alert(JSON.stringify(id))
      Toast.loading();
      postCompereFollow({ 'token': this.$ls.get('token'), 'compereId': id }).then(rep => {
        Toast.clear();

        Toast.success('关注成功');
        this.getInfos()
      })
    },
    followClick() {
      this.recomme_status = 'title',
        this.follow_status = 'title-active',
        this.recommeShow = false;
      this.followShow = true;
    },
    getInfos() {
      this.param.token = this.$ls.get('token')
      getInfos(this.param).then(rep => {
        this.infoList = rep.data
      });

    },
    postZan(id) {
      postInfoZan({ 'token': this.$ls.get('token'), 'type': 1, 'typeId': id }).then(rep => {

        this.getInfos();
      })
    },
    anchor_detail(d) {
      // alert(JSON.stringify(d))
      this.$router.push({ path: '/anchor/detail', query: { compereId: d } })
    },
    column() {
      this.$router.push('/anchor/column');
    },
    anchor() {
      this.$router.push('/anchor/anchor');
    },
    followList() {
      this.$router.push('/anchor/columnFollow');
    },
    commentClick(data) {
      // alert(JSON.stringify(data))
      this.$router.push({ path: '/anchor/columnComment', query: { comment: data, type: 1 } })
    },

    onOpenLive(room) {
      //                this.interact_status = 'play';
      //                this.fm_playing = false;
      //                if(room.stat == 1) {
      //                    api.openWin({
      //                        name: 'test',
      //                        url:getPath() + '/html/index.html?path=radio-live',
      //                        pageParam:{
      //                            session:{
      //                                roomId: room.roomId,
      //                                password: room.userPwd,
      //                                nickname: room.roomName
      //                            }
      //                        },
      //                        slidBackEnabled: false
      //                    });
      //                    var browser = api.require('webBrowser');
      //                    Toast.loading();
      //                alert(JSON.stringify(room))
      api.openWin({
        name: 'test',
        url: getPath() + '/html/index.html?path=radio-live',
        pageParam: {
          session: room
        },
        slidBackEnabled: false
      });
    },
    stateChange(state) {
      if (state === 'pull' || state === 'trigger') {
        this.iconLink = '#icon-arrow-bottom';
      } else if (state === 'loading') {
        this.iconLink = '#icon-loading';
      } else if (state === 'loaded-done') {
        this.iconLink = '#icon-finish';
      }
    },
    closeShare() {
      this.isShow = false
    },
    openShare() {
      this.isShow = true
    },
  },
  components: {
    PullTo
  },
  mounted() {
    // let tab = document.getElementById("live-tab");
    // let pd = this.paddingTop ? this.paddingTop.replace("px", '') : 0;
    // document.getElementById("live-content").style.top = parseInt(pd) + tab.clientHeight + 'px';

    // this.render();
    this.compereRecom();
    this.getInfos();
  }
}
</script>

<style lang="scss" type="text/scss" >
@import "../../../public/px2rem.scss";
.default-text {
  font-size: px2rem(30) !important;
}
.top-load-wrapper {
  line-height: 50px;
  text-align: center;
}
.icon-arrow {
  transition: 0.2s;
  transform: rotate(180deg);
}
.icon-loading {
  transform: rotate(0deg);
  animation-name: loading;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.view-live {
  height: 100%;
  overflow-y: hidden;
  background-color: #f2f4f5;
  padding-bottom: px2rem(100);

  .recomme {
    margin-top: px2rem(130);
    background-color: #fff;
    .list {
      padding-left: px2rem(30);
      .lanmu {
        width: px2rem(332);
        height: px2rem(126);
        background-image: url("../../../assets/images/radio/lanmu@3x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: right;
        line-height: px2rem(126);
        padding-right: px2rem(30);
        .title {
          color: #fff;
          font-size: px2rem(34);
        }
      }
      .zhubo {
        width: px2rem(332);
        height: px2rem(126);
        background-image: url("../../../assets/images/radio/zhubo@3x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        text-align: right;
        line-height: px2rem(126);
        padding-right: px2rem(30);
        .title {
          color: #fff;
          font-size: px2rem(34);
        }
      }
    }

    .title {
      padding-top: px2rem(30);
      padding-left: px2rem(30);
      font-size: px2rem(34);
      color: #292726;
      font-weight: bold;
    }

    .img {
      width: px2rem(270);
    }
  }

  .follow-list {
    background-color: #fff;
    margin-top: px2rem(130);
    padding-top: px2rem(30);
    .title {
      font-size: px2rem(30);
      font-weight: bold;
      padding: px2rem(30);
      .img-icon {
        vertical-align: middle;
        width: px2rem(44);
        height: px2rem(44);
      }
    }
    .img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .follow-list-swiper {
      height: px2rem(180);
      background-color: #fff;
    }
    .swiper-title {
      color: #646261;
      font-size: px2rem(24);
      font-weight: bold;
      text-align: center;
    }
    .swiper-cont {
      color: #646261;
      font-size: px2rem(24);
    }
  }

  .anchor {
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
    .anchor-cont-img {
      width: px2rem(520);
      height: px2rem(520);
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

  .progressive-image {
    width: px2rem(200);
    height: px2rem(210);
    .progressive-image-main {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }

  .tab {
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e6eaed;
    overflow-y: auto;
    position: fixed;
    width: 100%;
    min-height: px2rem(128);
    height: px2rem(128);
    line-height: px2rem(88);
    display: flex;
    justify-content: center;
    .title-active {
      font-weight: Bold;
      margin-left: px2rem(30);
      margin-right: px2rem(30);
      font-size: px2rem(34);
      border-bottom: 1px solid #ff5f53;
      border-bottom-width: px2rem(8);
    }
    .title {
      font-weight: Bold;
      color: #9d9a99;
      margin-left: px2rem(30);
      margin-right: px2rem(30);
      font-size: px2rem(34);
    }

    li {
      text-align: center;
      a {
        display: block;
        font-size: px2rem(30);
        font-weight: bold;
        color: #777;
        padding: 0 px2rem(32);
      }

      &.active {
        a {
          color: #262628;
        }
      }
    }
  }
  .content {
    overflow-y: auto;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding-bottom: px2rem(88);
    ul.list {
      padding-top: px2rem(48);
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      li.item {
        position: relative;
        margin-bottom: px2rem(37);
        padding: 0 px2rem(10);
        .img {
          width: px2rem(200);
          height: px2rem(200);
          background-color: #262628;
          box-shadow: 0px px2rem(20) px2rem(20) 0px rgba(0, 0, 0, 0.1);

          > span {
            position: absolute;
            top: px2rem(10);
            right: px2rem(20);
            font-size: px2rem(20);
            color: #fff;
            z-index: 100;
            background-color: #00aa00;
          }
        }
        p {
          margin: 0;
          padding-top: px2rem(23);
          padding-bottom: 0;
          text-align: center;
          font-size: px2rem(26);
          color: #777;
        }
      }
    }
  }
}
</style>