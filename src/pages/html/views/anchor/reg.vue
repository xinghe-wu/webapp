<template>
  <div class="anchor-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      title="成为主播"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="content">
      <div class="title">
        填写基础资料
      </div>
      <div class="cont">
        听到APP工作人员将第一时间与您联络
      </div>

      <div class="reg">
        <van-cell-group>
          <van-field
            v-model="name"
            clearable
            label="姓名"
            right-icon="question-o"
            placeholder="请输入姓名"
            class="input-title"
          />

          <van-field
            v-model="mobile"
            label="手机号"
            placeholder="请输入手机号"
            class="input-title"
          />
          <van-field
            v-model="weixin"
            label="微信"
            placeholder="请输入微信"
            class="input-title"
          />

          <van-field
            class="input-title"
            v-model="info"
            label="介绍"
            placeholder="几句说说您的情况"
          />
        </van-cell-group>

        <div
          class="aui-content aui-text-center aui-margin-t-15"
          @click="postSumbit"
        >
          <div
            class="aui-btn aui-font-size-16 cblue-bg white-font button-height sumbit-btn"
          >
            <span>提交</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PullTo from "vue-pull-to";
import { src, postApplyAnchor } from "../../index/services";
import { Toast } from "vant";
import { Field } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        slidesOffsetBefore: 20,
        spaceBetween: 100
      },
      name: "",
      mobile: "",
      weixin: "",
      info: "",
      src: src,
      isLoading: false,
      query: {
        token: "",
        page: 1,
        size: 10,
        id: 1
      }
    };
  },
  methods: {
    postSumbit() {
      // Toast.loading();
      postApplyAnchor({
        token: this.$ls.get("token"),
        name: this.name,
        mobile: this.mobile,
        weixin: this.weixin,
        info: this.info
      }).then(rep => {
        Toast.success(
          "您的主播申请已提交，请保持通信畅通，工作人员将尽快与您联络"
        );

        setTimeout(() => {
          Toast.clear();
          this.onClickLeft();
        }, 1000);
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  components: {
    PullTo
  },
  mounted() {}
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.anchor-view {
  height: 100%;
  overflow-y: hidden;
  background-color: #fff;

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
      padding-top: px2rem(80);
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

