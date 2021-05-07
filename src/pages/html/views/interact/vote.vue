<template>
  <div class="vote-body">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
      :title="voteType"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <div class="aui-row ">
      <div class="title">
        {{ vote.title }}
      </div>

      <img class="img" :src="src + vote.img" />
      <div class="cont">
        {{ vote.brief }}
      </div>

      <div class="btn" v-show="vote.type == 4">
        <div class="agree-btn" @click="onVote(1)">
          {{ vote.blue }}（{{ voteCount.blue }}）
        </div>
        <div class="agree-btn" @click="onVote(2)">
          {{ vote.red }}（{{ voteCount.red }}）
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { src, postVote, getVoice } from "../../index/services";
import { Toast } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      src: src,
      voteCount: { red: "", blue: "" },
      vote: {},
      voteType: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onVote(result) {
      Toast.loading();
      postVote({
        token: this.$ls.get("token"),
        ad_id: this.vote.id,
        vote_result: result
      }).then(rep => {
        Toast.clear();
        Toast.success("投票成功");
        this.getVote();
      });
    },
    getVote() {
      getVoice(this.vote.id).then(rep => {
        this.voteCount = rep;
      });
    }
  },
  mounted() {
    this.vote = this.$route.query.vote;
    this.getVote();
    if (this.vote.type == 2) {
      this.voteType = "报名";
    }
    if (this.vote.type == 3) {
      this.voteType = "图文";
    }
    if (this.vote.type == 4) {
      this.voteType = "投票";
    }
  }
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.vote-body {
  height: 100%;
  overflow-y: auto;
  text-align: center;
  background-color: #fff;
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
    height: px2rem(88);
    background-color: #fff !important;
  }

  .title {
    padding: px2rem(30);
    color: #292726;
    font-size: px2rem(40);
    text-align: center;
    font-weight: bold;
  }

  .img {
    width: 400px;
  }
  .cont {
    padding: px2rem(30);
    padding-top: px2rem(20);
    font-size: px2rem(34);
    color: #646261;
  }

  .btn {
    padding: px2rem(60);
    width: 100%;
    text-align: center;
    .agree-btn {
      margin-top: 15px;
      height: px2rem(96);
      color: #ff5f53;
      font-weight: bold;
      border-radius: px2rem(50);
      background-color: #f2f4f5;
      line-height: px2rem(96);
      font-size: px2rem(30);
      text-align: center;
    }
  }
}
</style>

