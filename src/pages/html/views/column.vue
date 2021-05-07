<template>
  <div class="my-fm-list">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      title="听到栏目"
    >
    </van-nav-bar>

    <div class="content">
      <ul
        class="aui-list aui-media-list ad_list"
        v-for="(ad, index) in adList"
        :key="index"
      >
        <li class="aui-list-item">
          <div class="aui-media-list-item-inner ad-list-cont">
            <div class="aui-list-item-media">
              <img
                src="../../../assets/images/radio/ad_list.png"
                class="ad_img"
              />
            </div>
            <div class="aui-list-item-inner">
              <div class="aui-list-item-text">
                <div class="aui-list-item-title ad_title">{{ ad.title }}</div>
              </div>
              <div class="aui-list-item-text  ad_cont">
                {{ ad.cont }}
              </div>
              <img
                src="../../../assets/images/radio/enroll.png"
                style="width:50px;"
              />
              <img
                src="../../../assets/images/radio/ad_ing.png"
                style="width:80px;"
              />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" type="text/scss" >
@import "../../../public/px2rem.scss";
.my-fm-list {
  height: 100%;
  overflow-y: hidden;
  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-hairline--bottom::after {
    border-width: 0;
  }
  .header-button2 {
    display: inline-block;
    padding-top: px2rem(16);
    img {
      height: px2rem(56);
    }
  }

  .header-button {
    position: absolute;
    width: px2rem(112);
    height: px2rem(56);
    background-color: #000;
    color: #fff;
    border-radius: px2rem(28);
    line-height: px2rem(56);
    text-align: center;
    right: px2rem(20);
    margin-top: px2rem(15);
    font-size: px2rem(24);
    &:active {
      background-color: #333;
    }
  }

  .van-nav-bar {
    background-color: #fce76c !important;
  }

  .edit-toolbar {
    background-color: #fce76c;
    height: px2rem(120);
    display: flex;
    align-items: center;

    .circle {
      text-align: center;
      width: px2rem(100);
      font-size: px2rem(44);
      color: #262628;
    }

    .btns {
      flex: 1;
      text-align: right;
      padding-right: px2rem(20);
      .btn-remove {
        width: px2rem(112);
        height: px2rem(56);
        display: inline-block;
        color: #000;
        border-radius: px2rem(28);
        line-height: px2rem(56);
        right: px2rem(20);
        font-size: px2rem(24);
        margin-right: px2rem(60);
        position: relative;
        text-align: right;
        .van-icon {
          font-size: px2rem(36);
          color: #ff6a71;
          position: absolute;
          left: px2rem(10);
          top: px2rem(8);
        }
        &:active {
          color: #00aa00;
        }
      }
      .btn-ok {
        width: px2rem(112);
        height: px2rem(56);
        display: inline-block;
        background-color: #000;
        color: #fff;
        border-radius: px2rem(28);
        line-height: px2rem(56);
        text-align: center;
        right: px2rem(20);
        font-size: px2rem(24);
        &:active {
          background-color: #333;
        }
      }
    }
  }

  .content {
    overflow-y: auto;
    padding-bottom: px2rem(188);
    height: 100%;
    .van-pull-refresh__track {
      height: 100%;
    }
    ul.list {
      li {
        &:active {
          background-color: #efefef;
        }
        position: relative;
        /*&:after{*/
        /*content: '';*/
        /*position: absolute;*/
        /*top: 0;*/
        /*left: px2rem(96);*/
        /*width: 200%;*/
        /*height: 200%;*/
        /*-webkit-transform: scale(.5);*/
        /*transform: scale(.5);*/
        /*-webkit-transform-origin: 0 0;*/
        /*transform-origin: 0 0;*/
        /*pointer-events: none;*/
        /*box-sizing: border-box;*/
        /*border-bottom: 1px solid #e5e5e5;*/
        /*}*/

        height: px2rem(120);
        display: flex;
        align-items: center;
        .index {
          width: px2rem(96);
          color: #ddd;
          font-size: px2rem(34);
          text-align: center;
          .van-icon {
            font-size: px2rem(44);
            &.van-icon-checked {
              color: #7ade81;
            }
          }
        }
        .info {
          flex: 1;
          h5 {
            padding: 0;
            margin: 0;
            font-size: px2rem(34);
            color: #262628;
          }
          p {
            font-size: px2rem(26);
            color: #777;
            margin-top: px2rem(15);
            padding: 0;
          }
        }
        .time {
          width: px2rem(100);
          font-size: px2rem(26);
          text-align: left;
          color: #ddd;
        }
      }
    }
  }
}
</style>
<script>
import { getVideo, src, delPrograms } from "../index/services";
import { Toast, Dialog } from "vant";
export default {
  store: ["paddingTop", "fm_list"],
  data() {
    return {
      src: src,
      select: [],
      editable: false,
      selectAll: false,
      token: "",
      adList: []
    };
  },
  methods: {
    refresh(loaded) {
      setTimeout(() => {
        loaded("done");
      }, 2000);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    hasSelect(id) {
      return this.select.findIndex(s => s == id) > -1;
    },
    onSelect(id) {
      if (this.editable) {
        if (this.select.findIndex(s => s == id) == -1) {
          this.select.push(id);
        } else {
          this.select = this.select.filter(s => s != id);
        }
      }
      this.selectAll = false;
    },
    onSelectAll() {
      if (!this.selectAll) {
        this.select = this.fm_list.map(l => l.id);
      } else {
        this.select = [];
      }
      this.selectAll = !this.selectAll;
    },
    render() {
      Toast.loading();
      this.select = [];
      this.editable = false;
      this.selectAll = false;
      getVideo({ token: this.token }).then(rep => {
        this.fm_list = rep;
        Toast.clear();
      });
    },
    getTime(time) {
      return new Date(time * 1000).Format("mm:ss");
    },
    onSave() {
      this.editable = false;
    },
    onClickRight() {
      if (!this.editable) {
        this.editable = true;
      } else {
        this.$router.push("/openfm?type=select");
      }
    },
    onRemove() {
      if (this.select.length > 0) {
        Dialog.confirm({
          title: "提示",
          message: "确定删除您所选的节目吗？"
        })
          .then(() => {
            Dialog.close();
            Toast.loading();

            delPrograms({ token: this.token, programIds: this.select }).then(
              rep => {
                Toast.clear();
                api.toast({ msg: "删除成功~" });
                this.render();
                this.$ls.set("refresh", new Date().valueOf());
              }
            );
          })
          .catch(() => {
            // on cancel
          });
      } else {
        api.toast({ msg: "您什么都没有选取~" });
      }
    }
  },
  mounted() {
    this.token = api.pageParam.token;
    this.render();
  }
};
</script>