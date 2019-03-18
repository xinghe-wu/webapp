<template>
<div class="view">
    <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
            right-text=""   title="编辑资料"  >
        <van-icon name="arrow-left" slot="left" style="color:#292726"/>
    </van-nav-bar>

<div class="content">
<div class="reg">

<div class="aui-content aui-margin-b-15">
    <ul class="aui-list aui-list-in">
        <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title reg-title" >头像</div>
                <div class="aui-list-item-right">

                            <!-- <van-uploader  accept="image/png, image/jpeg" :after-read="onRead" style="width: 100%">
                <div class=" t-cell van-cell-group van-hairline--bottom"><div class="van-cell van-hairline">
                   
                    <div class="van-cell__value van-cell__value--link">
                        <img class="head"  v-if="info.head" :src="getSrc()" />
                    </div>
               
                    </div>
                </div>
                </van-uploader> -->
                    <img :src="src+compere.head" class="aui-img-round aui-list-img-sm anchor-head"  style="position:relative;top:0; right:0">
                 
                </div>
            </div>
        </li>
        <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title reg-title">用户名</div>
                <div class="aui-list-item-right">
                    <div>{{compere.name}}</div>
                </div>
            </div>
        </li>

                <li class="aui-list-item">
            <div class="aui-list-item-inner aui-list-item-arrow">
                <div class="aui-list-item-title reg-title">个人简介</div>
                <div class="aui-list-item-right">

                    <div v-if="introduce">向大家介绍一下自己吧~</div>
                      <div v-esle>{{compere.introduce}}</div>
                </div>
            </div>
        </li>
        </ul>
    </div>


<!-- <van-cell-group >
  <van-field
    v-model="mobile"
    label="用户名"
    placeholder="请输入用户名"
    class="input-title"
  />
    <van-field
    v-model="weixin"
    label="个人简介"
    placeholder="向大家介绍一下自己吧"
    class="input-title"
  />

</van-cell-group> -->


<div class="aui-content aui-text-center aui-margin-t-15" >
      <div class="aui-btn aui-font-size-16 cblue-bg white-font button-height sumbit-btn">
          <span>提交</span>
      </div>
  </div>
</div>

</div>
</div>
  
</template>

<script>
import PullTo from 'vue-pull-to';
import { src, postApplyAnchor } from '../../index/services';
import { Toast } from 'vant';
import { Field } from 'vant';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        slidesOffsetBefore: 20,
        spaceBetween: 100,
      },
      compere: {},
      name: '',
      mobile: '',
      weixin: '',
      info: '',
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
    postSumbit() {
      // Toast.loading();
      postApplyAnchor({
        token: this.$ls.get('token'),
        name: this.name,
        mobile: this.mobile,
        weixin: this.weixin,
        info: this.info,
      }).then(rep => {


        Toast.success("提交成功请等待");

        setTimeout(() => {
          Toast.clear();
          this.onClickLeft();
        }, 1000)
      })

    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  components: {
    PullTo
  },
  mounted() {
    this.compere = this.$route.query.compere

  }

}
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.view {
  height: 100%;
  overflow-y: hidden;
  background-color: #fff;

  .van-nav-bar {
    color: #292726;
    height: px2rem(88);
    background-color: #fff !important;
    // border-bottom: 1px solid #e6eaed;
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
    input::-webkit-input-placeholder {
      color: #646261;
      font-size: px2rem(28);
    }
    .input-title {
      color: #292726;
      font-size: px2rem(30);
    }

    .title {
      text-align: center;
      padding-top: px2rem(70);
      color: #292726;
      font-weight: bold;
      font-size: px2rem(34);
    }
    .cont {
      text-align: center;
      padding-top: px2rem(20);
      color: #9d9a99;
      font-size: px2rem(28);
    }
    .reg {
      padding-top: px2rem(0);
      .anchor-head {
        margin-top: px2rem(20);
        margin-bottom: px2rem(20);
        width: px2rem(120);
      }
      .reg-title {
        color: #333333;
        font-size: px2rem(28);
      }
    }
    .sumbit-btn {
      margin-top: px2rem(70);
      width: 80%;
      height: px2rem(94);
      background-color: #ff5f53;
      padding-top: px2rem(24);
      color: #fff;
    }
  }
}
</style>

