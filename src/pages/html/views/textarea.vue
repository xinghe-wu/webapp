<template>
    <div class="textarea-list">

        <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
                     right-text="发送"  @click-right="onClickRight" title="图文互动"  >
            <van-icon name="arrow-left" slot="left" style="color:#292726"/>
        </van-nav-bar>

        <div class="content">
            <van-field
                    v-model="message"
                    type="textarea"
                    placeholder="说说你的想法吧~"
                    rows="30"
            />
            <div class="files" v-if="media_url" >
                <ul>
                    <li>
                        <img :src="src + media_url" alt="">
                        <a href="javascript:;" @click="media_url = ''">
                            <i class="iconfont icon-jianqu2"></i>
                        </a>
                    </li>
                </ul>

            </div>
            <div class="upload-block">
                <van-uploader :after-read="onRead" v-if="!media_url">
                    <van-icon name="photograph" />
                </van-uploader>
            </div>
        </div>
    </div>
</template>
<style lang="scss" type="text/scss">
@import "../../../public/px2rem.scss";
.textarea-list {
  height: 100%;
  overflow-y: hidden;
  background-color: #efefef;
  overflow: hidden;

  .header {
    background: #fff;
    height: 50px;
    font-size: 18px;
    color: #292726;
    font-weight: 900;
    border-bottom: 1px solid #e6eaed;
  }

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
    height: 45px;
    background-color: #fff !important;
  }
  .tab {
    height: px2rem(88);
    line-height: px2rem(88);
    display: flex;
    justify-content: center;
    li {
      text-align: center;
      a {
        display: block;
        font-size: px2rem(30);
        font-weight: bold;
        color: #777;
        padding: 0 px2rem(32);
      }

      &.active {
        a {
          color: #262628;
        }
      }
    }
  }
  .content {
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 px2rem(1) px2rem(2) rgba(0, 0, 0, 0.1);
    textarea {
      width: 100%;
      padding: px2rem(10) px2rem(20);
      border: none;
      font-size: px2rem(36);
    }

    .files {
      padding: px2rem(10) px2rem(20);
      ul {
        display: flex;
        li {
          width: px2rem(150);
          height: px2rem(150);
          position: relative;
          img {
            width: 100%;
            height: 100%;
            transform: rotate(90deg);
          }
          a {
            color: #00c000;
            position: absolute;
            right: - px2rem(20);
            top: 0;
            width: px2rem(40);
            height: px2rem(40);
            .iconfont {
              font-size: px2rem(40);
            }

            &:active {
              color: #00aa00;
            }
          }
        }
      }
    }

    .upload-block {
      padding: px2rem(10) px2rem(20);
      text-align: right;
      .van-icon-photograph {
        color: #666;
      }
    }
  }
}
</style>
<script>
import { getVideo, src, postVoice, uploadFile } from '../index/services';
import { Toast } from 'vant';
export default {
    store: ['paddingTop', 'token'],
    data() {
        return {
            isLoading: false,
            src: src,
            message: '',
            media_url: ''
        }
    },
    methods: {
        onClickLeft() {
            var UIInput = api.require('UIInput');
            UIInput.closeKeyboard({
                id: 0
            });
            setTimeout(() => {
                // api.closeWin();
                this.$router.go(-1);
            }, 200)
        },
        onSelect(node) {
            this.$ls.set("currentId", node.id);
            this.onClickLeft();
        },
        postText() {
            Toast.loading();
            postVoice({
                token: this.$ls.get('token'),
                type: 1,
                voice_url: this.media_url,
                text: this.message
            }).then(rep => {
                Toast.clear();
                Toast.success("提交成功");
                setTimeout(() => {
                    Toast.clear();
                    this.onClickLeft();
                }, 500)
            })

        },
        onClickRight() {
            //                var UIInput = api.require('UIInput');
            //
            //                UIInput.value((ret)=> {
            //                    if (ret) {
            //                        this.postText(ret.msg);
            //                    }
            //                });

            this.postText();
        },
        onRead({ file }) {
            this.photoCompress(file, { width: 600 }, base64 => {
                let newFile = this.dataURLtoFile(base64, 'upload.png');
                let formData = new FormData();
                formData.append('token', this.$ls.get('token'));
                formData.append('file', newFile);
                // alert(JSON.stringify(file))
                uploadFile(formData).then(rep => {
                    if (rep) {
                        Toast.clear();
                        // alert(JSON.stringify(rep))
                        this.media_url = rep.src;
                    }
                }).catch(e => {
                    // alert(e);
                })

            })

        },
        photoCompress(file, w, objDiv) {
            var ready = new FileReader();
            ready.readAsDataURL(file);
            var self = this;
            ready.onload = function () {
                var re = this.result;
                self.canvasDataURL(re, w, objDiv)
            }
        },
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },
        canvasDataURL(path, obj, callback) {
            var img = new Image();
            img.src = path;
            img.onload = function () {
                var that = this;
                // 默认按比例压缩
                var w = that.width,
                    h = that.height,
                    scale = w / h;
                w = obj.width || w;
                h = obj.height || (w / scale);
                var quality = 0.5;  // 默认图片质量为0.7
                //生成canvas
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
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
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64);
            }
        }
    },

    mounted() {
    }
}
</script>
