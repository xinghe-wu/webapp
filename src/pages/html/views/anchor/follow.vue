<template>
<div class="colunm-view">
    <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
            right-text=""   title="关注"  >
        <van-icon name="arrow-left" slot="left" style="color:#292726"/>
    </van-nav-bar>

<div class="content">

<pull-to :top-load-method="refresh" >

<div class="all-anchor">

  <div class="aui-content aui-margin-b-15 ">
    <ul class="aui-list aui-media-list follow-list" v-for="d in data">
         <li class="aui-list-item aui-list-item-middle" v-show="d.follow==1">
             <div class="aui-media-list-item-inner">
                 <div class="aui-list-item-media" style="width: 4rem;">
                      <img :src="src + d.head" class="aui-img-round aui-list-img-sm anchor-head">
                 </div>
                 <div class="aui-list-item-inner all-ancho-list-inner">
                     <div class="aui-list-item-text">
                         <div class="aui-list-item-title aui-font-size-14 name">{{d.name}}</div>
                         <div class="aui-list-item-right">
                           <div v-if="d.follow" class="aui-btn btn">已关注</div>
                            <div v-else class="aui-btn btn-follow" @click="compereFollow(d.id)">关注</div>
                         </div>
                     </div>
                     <div class="aui-list-item-text cont">
                         {{d.introduce}}
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
import PullTo from 'vue-pull-to';
import { src, getCompere, getCompereSort, postCompereFollow } from '../../index/services';
import { Toast } from 'vant';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        slidesOffsetBefore: 20,
        spaceBetween: 100,
      },
      data: [],
      compereSort: [],
      yajun_head: '',
      guanjun_head: '',
      jijun_head: '',
      src: src,
      isLoading: false,
      query: {
        token: '',
        page: 1,
        size: 10,
        id: 1
      },

    }
  },
  methods: {
    render(loaded) {
      this.isLoading = true;
      this.query.token = this.$ls.get('token')
      getCompere(this.query).then(rep => {
        this.data = rep.data;
        this.isLoading = false;
        if (loaded) {
          loaded('done');
        }
      })

      getCompereSort(this.query).then(rep => {
        this.compereSort = rep.data;
        this.yajun_head = this.compereSort[0].head
        this.guanjun_head = this.compereSort[1].head
        this.jijun_head = this.compereSort[2].head
      })
    },
    getCompere() {
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
    onClickLeft() {
      this.$router.go(-1);
    },
    vote() {
      this.$router.push('/interaction/vote');
    },
    compereFollow(id) {
      Toast.loading();
      postCompereFollow({ 'token': this.$ls.get('token'), 'compereId': id }).then(rep => {
        Toast.clear();
        Toast.success('关注成功');
        this.getCompere();
      })
    }
  },
  components: {
    PullTo
  },
  mounted() {
    this.render();
  }

}
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
    padding-bottom: px2rem(120);
    .van-pull-refresh__track {
      height: 100%;
    }

    .all-anchor {
      margin-top: px2rem(0);
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
      }
    }
  }
}
</style>

