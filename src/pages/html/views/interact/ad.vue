<template>
  <div class="ad">
    <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft" right-text="" title="活动">
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>
    <div class="content">

      <pull-to :top-load-method="refresh">
        <div>
          <div class="aui-content aui-margin-b-15">
            <!-- @click="vote"  -->
            <ul class="aui-list aui-media-list ad_list" v-for="(ad,index) in adList" :key="index">
              <li class="aui-list-item" @click="vote(ad)">
                <div class="aui-media-list-item-inner ad_list_cont">
                  <div class="aui-list-item-media">
                    <img :src="src+ad.img" class="ad_img">
                  </div>
                  <div class="aui-list-item-inner">
                    <div class="aui-list-item-text">
                      <div class="aui-list-item-title ad_title">{{ad.title}}</div>
                    </div>
                    <div class="aui-list-item-text  ad_cont">
                      {{ad.brief}}
                    </div>
                    <van-tag type="danger">
                      <div v-if="ad.type === 1">购物</div>
                      <div v-if="ad.type === 2">报名</div>
                      <div v-if="ad.type === 3">图文</div>
                      <div v-if="ad.type === 4">投票</div>
                    </van-tag>
                    <!-- <img src="../../../../assets/images/radio/ad_ing.png"  style="width:80px;"/> -->
                    <van-tag plain type="danger" class="stat">
                      <div v-if="ad.stat === 0">未开始</div>
                      <div v-if="ad.stat === 1">正在进行中</div>
                      <div v-if="ad.stat === 2">已结束</div>
                    </van-tag>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </pull-to>
    </div>

    <vDialog v-model="dialog" :type="pushInfo.type" :time="pushInfo.show_time" :url="pushInfo.url" :id="pushInfo.id" :red="pushInfo.red" :blue="pushInfo.blue">
      <div slot="title">
        {{pushInfo.title}}
      </div>
      <span slot="body">
        <img class="pull-info-img" style="width: 100%;max-height:200px;" :src="src+ pushInfo.img" alt="">
        <p>
          {{pushInfo.brief}}
        </p>
      </span>
    </vDialog>

  </div>

</template>

<script>
import PullTo from 'vue-pull-to';

import { getActivity, src, joinActivity } from '../../index/services';
import { Toast } from 'vant';
import { Tag } from 'vant';
import vDialog from '../../components/vDialog.vue';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      src: src,
      adList: [],
      isLoading: false,
      pushInfo: {},
      dialog: false
    }
  },
  methods: {
    render(loaded) {
      setTimeout(() => {
        getActivity({ id: 1 || api.pageParam.id }).then((rep) => {
          this.adList = rep.data;
          if (loaded) {
            loaded('done');
          }
        })
      }, 500)
    },
    refresh(loaded) {
      this.render(loaded);
    },
    onSelect(data) {
      this.pushInfo = data
      this.dialog = true;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    vote(data) {
      var browser = api.require('webBrowser');
      Toast.loading();
      joinActivity({ token: this.$ls.get('token'), id: this.id }).then(rep => {
        Toast.clear();
        if (data.url != '') {
          browser.open({
            url: data.url
          });
        } else {
          this.$router.push({ path: '/interaction/vote', query: { vote: data } })
        }
      })
    }
  },
  components: {
    PullTo,
    vDialog
  },
  mounted() {
    getActivity({ id: 1 || api.pageParam.id }).then((rep) => {
      this.adList = rep.data;
    })
  }

}
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.ad {
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
    height: px2rem(160);
  }
  .ad_title {
    color: #292726;
    font-weight: bold;
    font-size: px2rem(30);
  }

  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(120);
    .van-pull-refresh__track {
      height: 100%;
    }
    .stat {
      margin-left: px2rem(20);
    }
  }

  .ad_cont {
    font-size: px2rem(26);
  }

  .ad_list {
    margin-top: -1px;
  }
  .ad_list_cont {
    padding-top: px2rem(10);
    padding-bottom: px2rem(10);
  }
}
</style>

