<template>
  <div class="v-dialog" v-show="show">
    <transition name="fade">
      <div class="content" v-show="show">
        <a href="#" class="close-btn" @click="onClose">
          <img
            class="close-img"
            src="../../../assets/images/guanbi@2x.png"
            alt=""
          />
        </a>
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="body">
          <p>
            <slot name="body"></slot>
          </p>
        </div>
        <van-button
          v-if="type != 4"
          style="background-color: #FF5F53;"
          @click="onClick"
          bottom-action
          >{{ title }}</van-button
        >
        <van-row v-if="type == 4">
          <van-col span="12">
            <van-button
              style="background-color: #fff;color: #FF5F53; border-top: 1px solid #f6f6f6;border-right: 1px solid #f6f6f6;"
              @click="onVote(1)"
              bottom-action
              >{{ blue }}</van-button
            >
          </van-col>
          <van-col span="12">
            <van-button
              @click="onVote(2)"
              style="background-color: #fff;color: #9D9A99;border-top: 1px solid #f6f6f6;font-weight: bold"
              bottom-action
              >{{ red }}</van-button
            >
          </van-col>
        </van-row>
      </div>
    </transition>
  </div>
</template>
<script>
import { joinActivity, postVote } from "../index/services";
import { Toast } from "vant";
export default {
  store: ["token"],
  props: ["value", "time", "type", "url", "id", "red", "blue"],
  data() {
    return {
      show: this.value,
      timer: null
    };
  },
  watch: {
    value(v) {
      this.show = v;
      if (v) {
        if (this.time) {
          if (this.timer) {
            clearInterval(this.timer);
          }
          this.timer = setTimeout(() => {
            this.onClose();
          }, this.time * 1000);
        }
      }
    }
  },
  computed: {
    title() {
      let title = "";
      switch (this.type) {
        case "2":
          title = "立即报名";
          break;
        case "4":
          title = "投票活动";
          break;
        default:
          title = "查看详情";
      }
      return title;
    }
  },
  methods: {
    onClose() {
      this.show = false;
      this.$emit("input", false);
    },
    onClick() {
      var browser = api.require("webBrowser");
      Toast.loading();
      joinActivity({ token: this.$ls.get("token"), id: this.id }).then(rep => {
        Toast.clear();
        if (this.url) {
          this.onClose();
          browser.open({
            url: this.url
          });
        }
      });
    },
    onVote(result) {
      Toast.loading();
      postVote({
        token: this.$ls.get("token"),
        ad_id: this.id,
        vote_result: result
      }).then(rep => {
        Toast.clear();
        Toast.success("投票成功");
        this.show = false;
        // this.onClose();
      });
    }
  }
};
</script>
<style lang="sass" type="text/scss" scoped>
    @import "../../../public/px2rem.scss";

    .v-dialog{
        position: fixed;
        top:0;
        left: 0;
        right:0;
        height: px2rem(700);
        z-index: 2000;
        background-color: rgba(38, 38, 40, 0.81);

        .content{
            position: absolute;
            background-color: #fff;
            width: px2rem(670);
  
            box-shadow: 0px 20px 50px 0px
            rgba(0, 0, 0, 0.1);
            top:px2rem(256);
            left: 50%;
            margin-left: - px2rem(670/2);
            .title{
                color:#292726;
                padding-top:px2rem(30);
                height: px2rem(80);
                font-size: px2rem(34);
                line-height: px2rem(80);
                font-weight: bold;
                text-align:center;
            }
            .close-btn{
                position: absolute;
                height: px2rem(46);
                width: px2rem(46);
                font-size: px2rem(27);
                background-color: #f6f6f6;
                color: #fff;
                right: 0;
                top:0;
                line-height: px2rem(80);
                text-align: center;
                &:active{
                    color: #ddd;
                    background-color: #333;
                }
                .close-img{
                     height: px2rem(46);
                     width: px2rem(46);
                }
            }

            .body{
                padding: px2rem(40) px2rem(32);

                 max-width: px2rem(650);
                              
                overflow: hidden;
                 text-overflow: ellipsis;
                  white-space: nowrap;
              
                 bottom:0;
                height: px2rem(460);
                
                p{
                    font-size: px2rem(28);
                    color: #777;
                    line-height: 20px;
                }
                .cont{

                }

            }
            .van-button--bottom-action{
                height: 55px;
                line-height: 55px;
                border: none;
                color: #fff;
                font-size: px2rem(34);
            }
        }
    }
</style>
