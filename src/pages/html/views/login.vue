<template>
    <div class="view-login iPad" :class="{iPad: iPad}">

  <div class="hi">
    您好，
  </div>
  <div class="title">
    欢迎来到听到
  </div>

  <div class="aui-row ">
    <div class="login-list">
    <div class="aui-col-xs-8">
  <van-row class="register-name">
      <van-field
              v-model="form.mobile"
              icon="clear"
              placeholder="输入手机号"
              @click-icon="form.mobile = ''"
              color="#000"
      />
     </van-row>
    </div>
    <div class="aui-col-xs-4">
     <div class="login-code" @click="onGetCode">
     获取验证码
     </div>
    </div>
    </div>
  </div>

<div class="aui-row" >
  <div class="login-list">
    <van-field 
            v-model="form.code"
            icon="clear"
            type="text"
            placeholder="输入短信验证码"
            @click-icon="form.code = ''"           
    />

  </div>
</div>


<div class="aui-content aui-text-center aui-margin-t-15">
      <div class="aui-btn aui-font-size-16 cblue-bg white-font button-height login-btn"
            @click="onLogin()" >
          <span>登录</span>
      </div>
  </div>

<div class="login-visitor" @click="onNoLogin">
       <span class="title"> 游客试用</span>
</div>

        <div v-show="hasWeixin" class="div-title">
            <p>社交账号登录</p>
        </div>
        <div class="div-apps">
            <a v-show="hasWeixin" href="javascript:;" @click="onWxLogin">
                <img src="../../../assets/images/radio/weixin@3x.png" alt="">
            </a>
        </div>
    </div>
</template>
<script>
import { login, getCode, loginByWx } from '../index/services';
import { Toast } from 'vant';
export default {
    name: 'login',
    store: ['view', 'token', 'paddingTop'],
    data() {
        return {
            form: {
                mobile: "",
                code: ""
            },
            interval: 0,
            hasWeixin: false,
            iPad: false

        }
    },
    watch: {
        interval(i) {
            if (!this.timer && i > 0) {
                this.timer = setInterval(() => {
                    this.interval = this.interval - 1;
                }, 1000)
            } else if (i == 0) {
                clearInterval(this.timer);
            }
        }
    },
    methods: {
        onLogin() {

            if (!this.form.mobile || !this.form.code) {
                return;
            }

            this.doLogin(this.form);

        },
        onWxLogin() {
            let self = this;
            let wx = api.require('wx');
            wx.auth({
            }, function (ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function (ret, err) {
                        wx.getUserInfo({
                            accessToken: ret.accessToken,
                            openId: ret.openId
                        }, function (rep) {

                            self.wxLogin({
                                open_id: rep.openid,
                                nick_name: rep.nickname,
                                type: 1,
                                head: rep.headimgurl
                            });

                        })

                    });

                } else {
                    // alert(JSON.stringify(err))
                }
            });
        },
        doLogin(form) {
            Toast.loading({
                forbidClick: true
            });
            var push = api.require('push');
            login(form).then(rep => {
                if (rep) {

                    this.$ls.set("token", rep.token);
                    this.$ls.set("userName", rep.userName);
                    this.$ls.set("userId", rep.userId);
                    this.token = rep.token;
                    push.bind({
                        userName: rep.userName,
                        userId: rep.userId
                    }, (ret) => {
                        Toast.clear();
                        this.$router.push('/index');
                    });
                }
            })
        },
        wxLogin(form) {
            Toast.loading({
                forbidClick: true
            });
            var push = api.require('push');
            loginByWx(form).then(rep => {
                if (rep) {
                    this.$ls.set("token", rep.token);
                    this.$ls.set("userName", rep.userName);
                    this.$ls.set("userId", rep.userId);
                    this.token = rep.token;
                    push.bind({
                        userName: rep.userName,
                        userId: rep.userId
                    }, (ret) => {
                        Toast.clear();
                        this.$router.push('/index');
                    });
                }
            }).catch((e) => {
                alert(JSON.stringify(e))
            })
        },
        onNoLogin() {
            this.$router.push('/index');
        },
        onGetCode() {
            if (this.interval > 0) {
                return;
            }
            if (!(/^1[0-9][0-9]\d{4,8}$/.test(this.form.mobile))) {
                return Toast.fail("请输入正确手机格式");
            }
            this.interval = 60;
            getCode({ mobile: this.form.mobile }).then(rep => {
            })
        }
    },
    mounted() {
        let wx = api.require('wx');
        wx.isInstalled(ret => {
            if (ret && ret.installed) {
                this.hasWeixin = true;
            }
        })
        if (this.$ls.get('token')) {

            this.token = this.$ls.get('token');
            alert("token:" + this.token)
            this.$router.push("/index");
        }

        this.iPad = api.deviceModel.indexOf('iPad') > -1;

    }
}
</script>
<style lang="scss" type="text/scss" scoped>
@import "../../../public/px2rem.scss";

.view-login {
  padding: 30px;
  .hi {
    padding-top: 30px;
    color: #292726;
    font-size: px2rem(54);
    font-weight: bold;
  }

  .title {
    color: #646261;
    font-size: px2rem(32);
  }

  .login-list {
    margin-top: px2rem(40);
    height: px2rem(150);
    font-size: px2rem(22);
    border-bottom: 1px solid #e6eaed;
    //  vertical-align:middle;
    .register-name {
      // margin-top: px2rem(-38);
      background-color: #000;
      font-size: px2rem(10);
    }
  }

  .login-code {
    padding-top: 1rem;
    font-size: px2rem(32);
    border-left: 1px solid #e6eaed;
    text-align: right;
    color: #646261;
  }

  .login-btn {
    margin-top: px2rem(70);
    width: 80%;
    height: px2rem(94);
    background-color: #ff5f53;
    padding-top: px2rem(24);
    color: #fff;

    span {
      font-size: px2rem(28);
    }
  }

  .login-visitor {
    padding-top: px2rem(30);
    width: 100%;
    color: #292726;
    text-align: center;
    .title {
      font-size: px2rem(26);
      border-bottom: 1px solid #e6eaed;
    }
  }

  .van-nav-bar {
    background-color: #fce76c;
  }
  .van-hairline--bottom::after {
    border: none;
  }
  .bg-block {
    height: px2rem(480-88-40);
    background-color: #fce76c;
    background-image: url("../../../assets/images/logo.png");
    background-size: px2rem(625) px2rem(140);
    background-repeat: no-repeat;
    background-position: center px2rem(186-88-40);
  }

  .login-form {
    width: px2rem(670);
    height: px2rem(240);
    background-color: #ffffff;
    box-shadow: 0px px2rem(20) px2rem(50) 0px rgba(0, 0, 0, 0.1);
    border: solid px2rem(2) #fce76c;
    position: absolute;
    left: px2rem(40);
    top: px2rem(360);
    padding: 0 px2rem(40);
    box-sizing: border-box;

    .telephone {
      padding-right: px2rem(168);
      position: relative;

      .van-hairline--bottom::after,
      .van-hairline--left::after,
      .van-hairline--right::after,
      .van-hairline--surround::after,
      .van-hairline--bottom::after,
      .van-hairline--top::after,
      .van-hairline::after {
        border-bottom-width: 0;
      }

      a {
        position: absolute;
        right: px2rem(10);
        top: px2rem(46);
        color: #579ffb;
        font-size: px2rem(30);
        &:active {
          color: #0a8ddf;
        }
      }
    }

    .van-cell {
      height: px2rem(118);
      input {
        font-size: px2rem(34);
      }

      input::-webkit-input-placeholder {
        color: #ddd;
      }
    }
  }
  // .login-btn{
  //     position: absolute;
  //     bottom:0;
  //     left: 0;
  //     right: 0;
  //     background-color: #262628;
  // }

  .div-title {
    margin-top: px2rem(250);
    p {
      font-size: px2rem(26);
      text-align: center;
      color: #777;
    }
  }

  .div-apps {
    text-align: center;
    margin-top: px2rem(50);
    img {
      width: px2rem(120);
    }
  }

  .div-nologin {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: px2rem(150);
    font-size: px2rem(24);
  }

  &.iPad {
    .div-title {
      margin-top: px2rem(180);
    }
    .div-nologin {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: px2rem(120);
      font-size: px2rem(24);
    }
  }
}
</style>
