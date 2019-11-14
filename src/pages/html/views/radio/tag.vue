<template>
  <div class="radio-tag-view">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      right-text=""
    >
      <!-- <van-icon name="arrow-left" slot="left" style="color:#292726"/> -->
    </van-nav-bar>

    <div class="brief">
      <div class="aui-row">
        <div class="aui-col-xs-12 title">
          挑选你感兴趣的标签
        </div>
      </div>

      <div class="aui-row">
        <div class="aui-col-xs-12 cont">
          我们将努力推荐你更感兴趣的内容
        </div>
      </div>
    </div>

    <!-- <div class="aui-row">
            <div class="aui-col-xs-4" v-for="t in tags">
               <img :src="src + t.pic" class="img">
                <div class="aui-grid-label cont"> {{t.key_word}}</div>
            </div>
       </div> -->
    <div class="tags-block">
      <ul>
        <li :class="{ active: hasSelect(t.id) }" v-for="t in tags">
          <a href="#" @click="onSelect(t.id)">
            <div>
              <img :src="src + t.pic" alt="" />
              <i class="van-icon van-icon-success"></i>
            </div>
            <p>
              {{ t.key_word }}
            </p>
          </a>
        </li>
      </ul>
    </div>

    <div class="btn-block">
      <div class="aui-btn aui-btn-block tag-open-btn" @click="onPost">
        开启私人电台
      </div>
    </div>
  </div>
</template>

<script>
import { getTags, src, postTags } from "../../index/services";
import { Toast } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      type: "open",
      tags: [],
      src: src,
      selectTags: [],
      iPad: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    changeType(t) {
      this.type = t;
    },
    onSelect(id) {
      if (this.selectTags.indexOf(id) > -1) {
        this.selectTags = this.selectTags.filter(s => s != id);
      } else {
        this.selectTags.push(id);
      }
    },
    hasSelect(id) {
      return this.selectTags.indexOf(id) > -1;
    },
    render() {
      getTags({ token: this.token }).then(rep => {
        this.tags = rep.data;
      });
    },
    onPost() {
      if (this.selectTags.length == 0) {
        return Toast.fail("请至少选择一个标签");
      }
      Toast.loading();
      postTags({
        tags: this.selectTags,
        token: this.token
      }).then(rep => {
        Toast.success("设置成功");
        this.$emit("change", "fm");
        // this.$router.go(-2);
        // if (this.$route.query.type) {
        //   this.$router.replace("/fm-list");
        // } else {
        //   this.$emit("change", "fm");
        // }
      });
    }
  },
  created() {
    if (this.$route.query.type) {
      this.type = this.$route.query.type;
    }
  },
  mounted() {
    this.render();
    this.iPad = api.deviceModel.indexOf("iPad") > -1;
  }
};
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.radio-tag-view {
  height: 100%;
  overflow-y: hidden;
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

  .brief {
    padding-top: px2rem(50);
    .title {
      color: #292726;
      font-size: px2rem(34);
      font-weight: bold;
      text-align: center;
    }
    .cont {
      padding-top: px2rem(30);
      color: #9d9a99;
      font-size: px2rem(28);
      text-align: center;
    }
  }

  .tag-grid {
    background-color: #fff;
    padding: px2rem(30);
    .title {
      font-size: px2rem(34);
      font-weight: bold;
      float: left;
    }
    .img {
      width: px2rem(216);
      height: px2rem(216);
    }
    .cont {
      color: #292726;
      font-size: px2rem(26);
      font-weight: bold;
    }
  }

  .tags-block {
    overflow-y: auto;
    width: 100%;
    height: px2rem(600);
    position: absolute;
    top: px2rem(391);
    left: 0;
    ul {
      width: 100%;
      display: block;
      font-size: 0;
      li {
        display: inline-block;
        width: px2rem(200);
        margin-left: px2rem(24);
        box-sizing: border-box;
        a {
          display: block;
          div {
            width: 100%;
            height: px2rem(200);
            box-shadow: 0px px2rem(20) px2rem(20) 0px rgba(0, 0, 0, 0.1);
            position: relative;

            .van-icon-success {
              display: none;
            }

            img {
              height: 100%;
              width: 100%;
            }
          }

          p {
            font-size: px2rem(26);
            text-align: center;
            color: #777777;
            margin-top: px2rem(24);
            margin-bottom: px2rem(40);
          }
        }
      }

      li.active {
        a {
          div {
            border: solid px2rem(4) #ff5f53;
            .van-icon-success {
              position: absolute;
              font-size: px2rem(26);
              text-align: center;
              padding-top: px2rem(10);
              bottom: 0;
              right: 0;
              background-color: #ff5f53;
              color: #fff;
              display: inline-block;
              width: px2rem(40);
              height: px2rem(40);
            }
          }
        }
      }
    }
  }

  .btn-block {
    text-align: center;
    position: absolute;
    top: px2rem(1057);
    width: 100%;
    left: 0;
  }

  .tag-open-btn {
    background-color: #ff5f53;
    width: px2rem(660);
    height: px2rem(98);
    text-align: center;
    display: inline-block;
    font-size: px2rem(28);
    color: #fff;
  }

  tag-cont {
    padding: px2rem(30);
  }

  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(160);
    .van-pull-refresh__track {
      height: 100%;
    }

    .msg-list {
      margin-top: -1px;
      .img-head {
        width: px2rem(100);
        height: px2rem(100);
      }
      .msg-list-inner {
        margin-left: px2rem(-40);
      }
      .count {
        color: #ff5f53;
        font-size: px2rem(40);
        font-weight: bold;
      }
      .msg-title {
        font-weight: 500;
        font-size: px2rem(30);
      }
      .msg-cont {
        color: #646261;
        font-size: px2rem(28);
      }
      .msg-time {
        color: #9d9a99;
        font-size: px2rem(24);
      }
    }
  }
}
</style>

