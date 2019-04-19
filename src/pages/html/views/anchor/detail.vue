<template>
  <div class="detail">
    <!-- <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
            right-text=""   title="主播"  >
        <van-icon name="arrow-left" slot="left" style="color:#292726"/>
    </van-nav-bar> -->

    <header id='header' class="aui-bar aui-bar-nav">
      <div class="header">
        <div class="aui-row header-list" :style="{paddingTop:paddingTop}">
          <div class="aui-col-xs-1" @click="onClickLeft">
            <van-icon name="arrow-left" />
          </div>
          <div class="aui-col-xs-10">
            &nbsp
          </div>
          <div class="aui-col-xs-1" @click="editClick">
            <van-icon name="edit" class="header-icon" />
          </div>
        </div>

        <div class="aui-row">
          <div class="aui-col-xs-4">
            <img :src="src+compere.head" class="aui-img-round header-img">
          </div>
          <div class="aui-col-xs-5">
            &nbsp
          </div>
          <div class="aui-col-xs-3">
            <div v-if="compere.follow" class="btn">已关注</div>
            <div v-else class="btn-follow" @click="compereFollow(compere.id)">关注</div>
            <!-- <img src="../../../../assets/images/radio/follow_btn.png"  style="width:100px;margin-top:50px"> -->
          </div>
        </div>

        <div class="aui-row cont">
          <div class="name">
            {{compere.name}}
          </div>
          <div class="explain">
            {{compere.introduce}}
          </div>
          <div class="count">
            {{compere.id}} 粉丝 {{compere.id}} 关注
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <!-- <pull-to :top-load-method="refresh" > -->

      <div class="anchor" v-show="columnShow">
        <div class="title">
          主播栏目
        </div>
        <div class="anchor-swiper">
          <swiper :options="swiperOption" style="background-color:#fff">
            <swiper-slide v-for="c in compere.columns">
              <div class="aui-card-list" @click="programList(c)">
                <div class="aui-card-list-content">
                  <img :src="src+c.img" class="img">
                </div>
                <div class="swiper-cont"> {{c.name}}</div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="anchor">
        <div class="title">
          主播动态
        </div>

        <div class="aui-row kong" v-show="infoList.length==0">
          <img class="img" src="../../../../assets/images/my/kong@3x.png">
          <div class="title">
            暂未发布动态
          </div>

        </div>

        <div class="aui-card-list" v-for="i in infoList">
          <div class="aui-card-list-header aui-card-list-user aui-border-b">
            <div class="aui-card-list-user-avatar">
              <img :src="src+i.head" class="aui-img-round" />
            </div>
            <div class="aui-card-list-user-name">
              <div class="name">{{i.name}}</div>
              <div v-if="i.follow" class="aui-btn btn">已关注</div>
              <div v-else class="aui-btn btn-follow" @click="compereFollow(i.id)">关注</div>
            </div>
            <div class="aui-card-list-user-info time">11-25 09:12</div>
          </div>
          <div class="aui-card-list-content-padded" @click="anchor_detail(i)">

            <p class="cont">{{i.cont}}</p>
            <img :src="src+i.img" style="width:300px" />
          </div>
          <div class="aui-card-list-footer aui-border-t footer-list">
            <div> <img class="img" src="../../../../assets/images/radio/like.png" />
              <span class="title-check">{{i.zans}}</span>
            </div>
            <div @click="commentClick(i)"> <img class="img" src="../../../../assets/images/radio/comment.png" />
              <span class="title">{{i.comments}}</span>
            </div>
            <div> <img class="img" src="../../../../assets/images/radio/forward.png" />
              <span class="title"></span>
            </div>
          </div>
        </div>

      </div>
      </pull-to>

    </div>
  </div>

</template>

<script>

import { src, getCompereById, getInfos, postCompereFollow } from '../../index/services';
import PullTo from 'vue-pull-to';
import { Toast } from 'vant';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      src: src,
      compereId: 0,
      compere: {},
      infoList: [],
      data: [],
      columnShow: false,
      param: {
        token: '',
        id: 1,
        type: 1,
        page: 0,
        size: 10,
        isCompere: 0,
      },
      swiperOption: {
        slidesPerView: 3,
        slidesOffsetBefore: 20,
        spaceBetween: 10,
      },

    }
  },

  methods: {
    render(loaded) {

    },

    getCompereById() {
      getCompereById({ 'token': this.$ls.get('token'), 'compereId': this.compereId }).then(rep => {
        this.compere = rep.data;
        if (this.compere.columns.length > 0) {
          this.columnShow = true;
        }
      })
    },
    getInfos() {
      this.param.token = this.$ls.get('token')
      this.param = this.compereId
      getInfos(this.param).then(rep => {
        this.infoList = rep.data

      });

    },
    programList(data) {
      //alert(JSON.stringify(data))
      this.$ls.set("column", data);
      this.$router.push({ path: '/program/list', query: { column: data } })

    },
    onClickLeft() {
      this.$router.go(-1);
    },
    editClick() {
      this.$router.push({ path: '/anchor/edit', query: { compere: this.compere } })
    },
    refresh(loaded) {
      this.render(loaded);
    },
    compereFollow(id) {
      Toast.loading();
      postCompereFollow({ 'token': this.$ls.get('token'), 'compereId': id }).then(rep => {
        Toast.clear();
        Toast.success('关注成功');
        this.compere.follow = 1
      })
    }
  },

  components: {
    PullTo
  },

  mounted() {
    this.compereId = this.$route.query.compereId
    this.getCompereById()
    this.getInfos()
  }

}
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
      padding-bottom: px2rem(160);
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
</style>

