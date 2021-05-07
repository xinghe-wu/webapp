<template>
  <div class="my-fm-list">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      @click-right="onClickRight"
      left-arrow
      title="播放列表"
    >
      <a v-show="!editable" class="header-button" slot="right">编辑</a>

      <a
        href="javascript:;"
        class="header-button2"
        slot="right"
        v-show="editable"
      >
        <img src="../../../assets/images/icon_add.png" alt="" />
      </a>
    </van-nav-bar>

    <div class="edit-toolbar" v-show="editable">
      <div class="circle" @click="onSelectAll">
        <van-icon :name="selectAll ? 'checked' : 'check'"></van-icon>
      </div>
      <div class="btns">
        <a href="javascript:;" class="btn-remove" @click="onRemove">
          <van-icon name="delete"></van-icon>
          删除</a
        >
        <a href="javascript:;" @click="onSave" class="btn-ok">完成</a>
      </div>
    </div>

    <pull-to :bottom-load-method="refresh">
      <div class="aui-row kong" v-if="fm_list1.length == 0">
        <img class="img" src="../../../assets/images/my/kong@3x.png" />
        <div class="title">
          暂无私人台栏目
        </div>
      </div>

      <div class="aui-content aui-margin-b-15 ">
        <ul
          class="aui-list aui-media-list follow-list"
          v-for="(l, index) in fm_list1"
          @click="onSelect(l.id)"
        >
          <li class="aui-list-item aui-list-item-middle">
            <div class="aui-media-list-item-inner">
              <span v-show="!editable" @click="sote(l.id)">{{
                index + 1
              }}</span>
              <van-icon
                v-show="editable"
                :name="hasSelect(l.id) ? 'checked' : 'check'"
              ></van-icon>
              <div class="aui-list-item-media" style="width: 4rem;">
                <img
                  :src="src + l.img"
                  class="aui-img-round aui-list-img-sm anchor-head"
                />
              </div>
              <div class="aui-list-item-inner all-ancho-list-inner">
                <div class="aui-list-item-text">
                  <div class="aui-list-item-title aui-font-size-14 name">
                    {{ l.name }}
                  </div>
                  <div class="aui-list-item-right" v-if="l.free === 1">
                    <div class="btn-follow">￥{{ l.money }}</div>
                  </div>
                </div>
                <div class="aui-list-item-text cont">
                  {{ l.brief }}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </pull-to>
  </div>
</template>
<style lang="scss" type="text/scss" >
@import "../../../public/px2rem.scss";
.my-fm-list {
  height: 100%;
  overflow-y: auto;

  padding-bottom: px2rem(90);

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
    background-color: #fff !important;
  }

  .edit-toolbar {
    background-color: #f2f4f5;
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

  .follow-list {
    margin-top: -1px;
    .all-ancho-list-inner {
      margin-left: px2rem(-30);
    }
    .anchor-head {
      margin-left: px2rem(20);
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
      width: px2rem(100);
      height: px2rem(46);
      line-height: px2rem(46);
      font-size: px2rem(24);
      border: 1px solid #e6eaed;
      border-radius: px2rem(50);
      text-align: center;
    }
    .btn-follow {
      color: #ff5f53;
      width: px2rem(100);
      height: px2rem(46);
      line-height: px2rem(46);
      font-size: px2rem(24);
      border: 1px solid #ff5f53;
      border-radius: px2rem(50);
      text-align: center;
    }
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
import {
  getVideo,
  src,
  delPrograms,
  getColumn,
  postcolumnDel,
  getColumnDel,
  getColumnLike,
  postcolumnLikePostion,
  getColumnParam
} from "../index/services";
import { Toast, Dialog } from "vant";
import PullTo from "vue-pull-to";
export default {
  store: ["paddingTop", "fm_list"],
  data() {
    return {
      src: src,
      select: [],
      fm_list1: [],
      editable: false,
      selectAll: false,
      token: "",
      query: {
        token: "",
        page: 1,
        size: 10,
        id: 1
      }
    };
  },
  methods: {
    refresh(loaded) {
      setTimeout(() => {
        loaded("done");
      }, 2000);
    },
    onClickLeft() {
      this.$router.replace("/index/fm");
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
        this.select = this.fm_list1.map(l => l.id);
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
      // getVideo({ token: this.token }).then((rep) => {
      //     this.fm_list = rep;
      //     Toast.clear();
      // })
      this.query.token = this.$ls.get("token");
      getColumnLike(this.query).then(rep => {
        this.fm_list1 = rep.data;

        getColumnParam({ token: this.$ls.get("token") }).then(rep => {
          this.fm_list = rep;
        });

        Toast.clear();
      });
    },
    getColumnDel() {
      getColumnDel(this.query).then(rep => {
        // alert(JSON.stringify(rep))
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
        // this.$router.push('/radio/tag');
        this.$router.push("/fm-list-select");
      }
    },
    sote(coumnId) {
      postcolumnLikePostion({
        token: this.$ls.get("token"),
        coumnId: coumnId
      }).then(rep => {
        Toast.clear();
        api.toast({ msg: "置顶成功~" });
        this.render();
        this.$ls.set("refresh", new Date().valueOf());
        this.render();
      });
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

            // delPrograms({ token: this.token, programIds: this.select }).then(rep => {
            //     Toast.clear();
            //     api.toast({ msg: "删除成功~" });
            //     this.render();
            //     this.$ls.set("refresh", new Date().valueOf());
            // })

            postcolumnDel({
              token: this.$ls.get("token"),
              coumnIds: this.select
            }).then(rep => {
              Toast.clear();
              api.toast({ msg: "删除成功~" });
              this.render();
              this.$ls.set("refresh", new Date().valueOf());
            });
          })
          .catch(() => {
            // on cancel
          });
      } else {
        api.toast({ msg: "您什么都没有选取~" });
      }
    }
  },
  components: {
    PullTo
  },
  mounted() {
    this.token = this.$ls.get("token");
    this.render();
  }
};
</script>