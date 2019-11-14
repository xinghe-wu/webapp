<template>
  <div class="view-config">
    <van-nav-bar
      :style="{ paddingTop: paddingTop }"
      id="header"
      @click-left="onClickLeft"
      left-arrow
      title="编辑资料"
    >
    </van-nav-bar>
    <div class="content">
      <div class="row">
        <van-uploader
          accept="image/png, image/jpeg"
          :after-read="onRead"
          style="width: 100%"
        >
          <div class=" t-cell van-cell-group van-hairline--bottom">
            <div class="van-cell van-hairline">
              <div class="van-cell__title">
                <!---->
                <span class="van-cell__text">头像</span>
                <!---->
              </div>
              <!---->
              <div class="van-cell__value van-cell__value--link">
                <img class="head" v-if="info.head" :src="getSrc()" />
              </div>
              <i class="van-icon van-cell__right-icon van-icon-arrow">
                <!---->
              </i>
            </div>
          </div>
        </van-uploader>
      </div>
      <div class="row other">
        <van-cell-group style="width: 100%">
          <van-cell
            @click="onEdit(info.nick_name, 'nick_name')"
            title="昵称"
            :value="info.nick_name"
            is-link
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .view-config{
        height: 100%;
        background-color: #f2f2f2;
        overflow-y: hidden;
        .van-hairline--bottom::after, .van-hairline--left::after, .van-hairline--right::after, .van-hairline--surround::after, .van-hairline--bottom::after, .van-hairline--top::after, .van-hairline::after{
            border-width: 0;
        }

        .content{
            // padding-top: px2rem(33);
            // padding-left: px2rem(40);
            // padding-right: px2rem(40);

            .t-cell{
                height: px2rem(120);
                padding: 0;
                box-shadow: 0px px2rem(20) px2rem(50) 0px
                rgba(0, 0, 0, 0.1);
                .van-cell{
                    line-height: px2rem(120);
                    font-size: px2rem(34);
                    padding: 0 px2rem(40);
                    color: #262628;

                    .van-cell__value--link{
                        color: #777777;
                        font-size: px2rem(28);

                        .head{
                            position: absolute;
                            top:px2rem(20);
                            right: px2rem(80);
                            height: px2rem(80);
                            width: px2rem(80);
                            background-color: #ddd;
                            border-radius: 50%;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .other{
                box-shadow: 0px px2rem(20) px2rem(50) 0px
                rgba(0, 0, 0, 0.1);
                .van-cell{
                    line-height: px2rem(120);
                    font-size: px2rem(34);
                    padding: 0 px2rem(40);
                }

            }
        }
    }

</style>
<script>
import PullTo from "vue-pull-to";
import { uploadPic, getUserInfo, putMy, src } from "../index/services";
import { Toast } from "vant";
export default {
  store: ["paddingTop", "token"],
  data() {
    return {
      info: {
        head: "",
        nick_name: ""
      },
      src: src
    };
  },
  methods: {
    onClickLeft() {
      window.history.back();
    },
    onRead({ file }) {
      Toast.loading();

      this.photoCompress(file, { width: 600 }, base64 => {
        let newFile = this.dataURLtoFile(base64, "upload.png");
        let formData = new FormData();
        formData.append("token", this.$ls.get("token"));
        formData.append("file", newFile);

        uploadPic(formData)
          .then(rep => {
            Toast.clear();
            if (rep.src) {
              this.info.head = rep.src;
              this.onSave();
            }
          })
          .catch(e => {
            // alert(e);
          });
      });
    },
    photoCompress(file, w, objDiv) {
      var ready = new FileReader();
      ready.readAsDataURL(file);
      var self = this;
      ready.onload = function() {
        var re = this.result;
        self.canvasDataURL(re, w, objDiv);
      };
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    canvasDataURL(path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.5; // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    },
    onSave() {
      Toast.loading();
      putMy(this.token, this.info).then(rep => {
        Toast.clear();
        this.render();
      });
    },
    onEdit() {
      this.$router.push("/edit");
    },
    render() {
      Toast.loading();
      getUserInfo(this.token).then(rep => {
        this.info = rep;
        Toast.clear();
      });
    },
    getSrc() {
      if (this.info.head.indexOf("http") > -1) {
        return this.info.head;
      } else {
        return this.src + this.info.head;
      }
    }
  },
  components: {
    PullTo
  },
  mounted() {
    this.render();
  }
};
</script>