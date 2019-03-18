<template>
    <div id="view-my">

    <header class="aui-bar aui-bar-nav">
     
	    <div class="my-header">
				<div class="aui-row" >
					<div class="aui-col-xs-1" @click="radio_list">
						   <img src="../../../assets/images/radio/diantailiebiao@3x.png" class="img">
					</div>
					<div class="aui-col-xs-8" >
						&nbsp
					</div>
					<div class="aui-col-xs-1" @click="msg" v-show="info.message>0">
						  <img src="../../../assets/images/radio/xiaoxi@3x.png" class="img">
						<div class="aui-badge">{{info.message}}</div>
					</div>
                     <div class="aui-col-xs-2" @click="open_fm">
					     <img src="../../../assets/images/radio/shezhi@3x.png" class="img">
	    	        </div>
				</div>
	     </div>
	</header>

    <div class="head">
		<ul class="aui-list aui-media-list " >
			 <li class="aui-list-item aui-list-item-middle">
				 <div class="aui-media-list-item-inner ">
					<div class="aui-list-item-media head-media-list head-list-text" >
						<img :src="src+info.head" class="aui-img-round aui-list-img-sm img">
					</div>
					 <div class="aui-list-item-inner ">
						 <div class="aui-list-item-text " style="margin-left">
							  <div class="aui-list-item-title aui-font-size-14 name">{{info.nick_name}}</div>
                                <!-- <div class="aui-list-item-right">08:00</div> -->
                         <div v-if="info.compere_id==0" class="btn" @click="reg">成为主播</div>
                          	<img v-if="info.compere_id>0" class="btn-gengduo"  src="../../../assets/images/radio/gengduo.png" > 
                    
						 </div>
						<div class="aui-list-item-text title">
								查看个人主页
						 </div>
					</div>
					 </div>
			     </li>
		 </ul>
	</div>


 <div class="listen">
		<div class="title">
		  	<img  class="img-icon"  src="../../../assets/images/radio/zuijinshpouting@3x.png" > 最近收听
		</div>
     <div class="listen-swiper">
		<swiper  :options="swiperOption" >
            
			<swiper-slide v-for="p in programList">
				<div class="aui-card-list">
				<div class="aui-card-list-content">
            <div style="position: relative;">
                <div style="position: absolute;">
                    <img src="../../../assets/images/radio/play@2x.png" class="paly-btn" @click="fmClick(p)">
                 </div>  
                    <img :src="src+p.img" class="img" >
                 </div>
							 </div>
							 <div class="swiper-title">{{p.name}}</div>
							 <div class="swiper-cont"> {{p.brief}}</div>
					 </div>
			</swiper-slide>
		</swiper>
	</div>
</div>


    
    <div class="my">
       <div class="aui-content aui-margin-b-15">
            <ul class="aui-list aui-list-in">
                <li class="aui-list-item list" @click="subscribe">
                     <div class="aui-list-item-label-icon">
                     	<img  class="img" src="../../../assets/images/radio/gengduo@3x.png" >
                     </div>
                     <div class="aui-list-item-inner title">
                      我的订阅
                     </div>
                </li>
        <li class="aui-list-item list"  @click="onLogout">
            <div class="aui-list-item-label-icon">
              	<img  class="img"  src="../../../assets/images/radio/wodegoumia@3x.png" >
            </div>
            <div class="aui-list-item-inner title">
                我的购买
            </div>
        </li>
        <li class="aui-list-item  list" @click="wallet()">
            <div class="aui-list-item-label-icon">
                	<img   class="img"  src="../../../assets/images/radio/wodeqianbao@3x.png" >
            </div>
            <div class="aui-list-item-inner title">
                我的钱包
            </div>
        </li>
    </ul>
     </div>
</div>


    <!-- <van-nav-bar  :style="{paddingTop:paddingTop}" @click-right="onConfig" title="我的" >
            <van-icon slot="right" name="setting" />
        </van-nav-bar>
        <div class="container">
       
            <section class="my-info">
                <van-cell-group>
                    <van-cell  icon="clock" @click="onMyTime"  isLink>
                        <template>
                            <span style="color: #7ade81">{{getTime(time)}}</span>
                        </template>
                        <template slot="title">
                        <span class="van-cell-text">
                            定时关闭
                        </span>
                        </template>
                    </van-cell>
                    <van-cell value="内容" icon="like-o" @click="onMyFm" isLink>
                        <template>
                            <span style="color: #ddd">{{info.radio_name}}</span>
                        </template>
                        <template slot="title">
                        <span class="van-cell-text">
                            我的默认电台
                        </span>
                        </template>
                    </van-cell>
                    <van-cell icon="success" @click="onMyActivity(info.activity)" isLink>
                        <template >
                            <span  class="active-badge">{{info.activity}}</span>
                        </template>
                        <template slot="title">
                        <span class="van-cell-text">
                            我的参与
                        </span>
                        </template>
                    </van-cell>

                </van-cell-group>
            </section>
            <section class="other-block">
                <van-cell-group>

                </van-cell-group>
            </section>
            <section class="btn-block">
                <button v-ripple @click="onLogout" v-if="token">退出登录</button>
                <button v-ripple @click="onLogin" v-else>登录</button>
            </section>
        </div>    -->
    </div>
</template>
<style lang="scss"  type="text/scss" >
@import "../../../public/px2rem.scss";
#view-my {
  background-color: #f2f4f5;
  margin-bottom: 55px;
  height: 100%;
  .my-header {
    padding: px2rem(40);
    background-color: #fff;
    height: px2rem(108);
    overflow-y: auto;
    position: fixed;
    width: 100%;
    min-height: px2rem(108);
    line-height: px2rem(108);

    .img {
      width: px2rem(44);
      height: px2rem(44);
    }
    .title {
      color: #292726;
      font-weight: bold;
    }
  }

  .head {
    color: #292726;
    .head-media-list {
      padding-top: px2rem(50);
      padding-bottom: px2rem(50);

      .head-media-list-inner {
        margin-left: px2rem(-60);
      }
    }
    .btn {
      margin-top: px2rem(36);
      text-align: center;
      padding-top: px2rem(8);
      background-color: #ff5f53;
      color: #fff;
      width: px2rem(160);
      height: px2rem(56);
      font-size: px2rem(26);
      border-radius: 15px;
    }
    .btn-gengduo {
      margin-top: px2rem(56);
      //   padding-top: px2rem(-50);
      width: px2rem(24);
      height: px2rem(24);
    }
    img {
      width: px2rem(120);
    }
    .name {
      font-size: px2rem(36);
      font-weight: bold;
    }
    .title {
      margin-top: px2rem(-20);
      font-size: px2rem(26);
    }
  }

  .my {
    margin-bottom: px2rem(-35);
    .img {
      width: px2rem(44);
    }
    .list {
      padding-top: px2rem(20);
      padding-bottom: px2rem(10);
    }

    .title {
      font-size: px2rem(30);
      color: #292726;
      font-weight: bold;
    }
  }
  .listen {
    background-color: #fff;
    margin-top: px2rem(30);
    margin-bottom: px2rem(30);
    .title {
      font-size: px2rem(30);
      font-weight: bold;
      padding: px2rem(30);
      .img-icon {
        vertical-align: middle;
        width: px2rem(44);
        height: px2rem(44);
      }
    }
    .img {
      //   position: absolute;
      width: px2rem(200);
      height: px2rem(200);
    }
    .paly-btn {
      margin: px2rem(48);
      width: px2rem(102);
      height: px2rem(102);
    }
    .swiper-title {
      font-size: px2rem(28);
      font-weight: bold;
    }
    .swiper-cont {
      color: #646261;
      font-size: px2rem(24);
    }
  }

  .van-hairline--top-bottom::after {
    border-width: 0;
  }
  .van-hairline--bottom::after {
    border-width: 0;
  }
  .container {
    /*left: 0;*/
    position: relative;
    /*right: 0;*/
    /*bottom:px2rem(98);*/
  }

  .van-nav-bar {
    height: px2rem(88) !important;
    background-color: #fce76c !important;
    font-size: px2rem(34);
    .van-icon {
      color: #000;
    }
  }
  //   header {
  //     height: px2rem(480-40-88);
  //     background-color: #fce76c;
  //     position: relative;
  //     .avatar {
  //       top: px2rem(32);
  //       left: px2rem(80);
  //       position: absolute;
  //       width: px2rem(160);
  //       height: px2rem(160);
  //       border-radius: 50%;
  //       z-index: 2000;
  //       background-repeat: no-repeat;
  //       background-size: cover;
  //     }
  //     .username {
  //       position: absolute;
  //       z-index: 2000;
  //       left: px2rem(260);
  //       top: px2rem(141);
  //       font-size: px2rem(28);
  //       color: #777;
  //     }
  //   }

  .head-list-text {
    margin-right: px2rem(-60);
  }

  .my-info {
    position: absolute;
    top: px2rem(220 - 40-88);
    background-color: #fff;
    left: px2rem(40);
    right: px2rem(40);
    height: px2rem(463);
    box-shadow: 0px px2rem(20) px2rem(50) 0px rgba(0, 0, 0, 0.1);
    padding-top: px2rem(100);
    z-index: 1000;
  }

  .van-cell {
    height: px2rem(120);
    padding: 0;
    line-height: px2rem(120);
    color: #262628;
    font-size: px2rem(34);
    .van-cell-text {
      padding-left: px2rem(16);
    }
  }
  .van-cell__title .van-icon {
    font-size: px2rem(36);
    color: #ddd;
    margin-left: px2rem(2);
  }
  .van-cell__right-icon {
    font-size: px2rem(20);
    color: #ddd;
  }
  .van-cell__value--link {
    padding-right: px2rem(60);
  }
  .van-cell__value {
    font-size: px2rem(28);
    .active-badge {
      color: #fff;
      background-color: #ff6a71;
      border-radius: 20px;
      padding: 0 px2rem(10);
    }
  }
  .van-cell-group {
    padding-left: px2rem(34);
    padding-right: px2rem(30);
  }

  .other-block {
    padding-top: px2rem(223);
    padding-left: px2rem(18);
    padding-right: px2rem(40);
  }
  .btn-block {
    padding-top: px2rem(35);
    text-align: center;
    button {
      width: px2rem(248);
      height: px2rem(88);
      background-color: #fce76c;
      border-radius: px2rem(43);
      border: none;
      font-size: px2rem(26);
      color: #262628;
    }
  }
}
</style>
<script>
import { Dialog } from 'vant';
import { getUserInfo, src, getPath, getProgramListen } from '../index/services';
import { Toast } from 'vant';
const head = require('../../../assets/images/head.jpg')
export default {
    store: ['view', 'token', 'paddingTop', 'interact_status', 'fm_playing'],
    data() {
        return {
            swiperOption: {
                slidesPerView: 4,
                slidesOffsetBefore: 20,
                spaceBetween: 40,
            },
            isLoading: false,
            src: src,
            info: {
                nick_name: '',
                activity: 0,
                head: '',
                radio_name: ''
            },
            time: '',
            ios: false,
            programList: []
        }
    },
    methods: {
        onLogout() {
            Dialog.confirm({
                title: '提示',
                message: '确定要退出当前登录用户吗？'
            }).then(() => {
                this.$ls.set("token", "");
                this.token = null;
                this.fm_playing = false;
                this.interact_status = 'play';
                this.$nextTick(() => {
                    this.$router.push('/login');
                })
            }).catch(() => {
                // on cancel
            });
        },

        getProgramListen() {
            getProgramListen(this.$ls.get('token')).then(rep => {
                this.programList = rep;
            })
        },
        reg() {
            this.$router.push('/anchor/reg');
        },
        subscribe() {
            this.$router.push('/my/subscribe');
        },
        msg() {
            this.$router.push('/my/msg');
        },
        wallet() {
            this.$router.push('/my/wallet');
        },
        radio_list() {
            this.$router.push('/radio/radio_select');
        },
        open_fm() {
            this.$router.push('/radio/tag');
        },
        fmClick(data) {
            // alert(JSON.stringify(data))
            this.$router.push('/index/fm');
        },
        render() {
            if (this.token) {
                Toast.loading();
                getUserInfo(this.token).then(rep => {
                    this.info = rep;
                    Toast.clear();
                })
            }
        },
        onMyActivity(v) {
            if (v) {
                if (this.token) {
                    api.openWin({
                        name: 'my-activity',
                        url: getPath() + '/html/index.html?path=my-activity'
                    });
                } else {
                    this.onLogin();
                }

            }
        },
        onMyFm() {
            if (this.token) {
                api.openWin({
                    name: 'my-fm',
                    url: getPath() + '/html/index.html?path=list',
                    pageParam: {
                        name: 'test'
                    }
                });
            } else {
                this.onLogin();
            }

        },
        onMyTime() {
            api.openWin({
                name: 'my-time',
                url: getPath() + '/html/index.html?path=my-time',
                pageParam: {
                    name: 'test'
                }
            });
        },
        closeTime(v) {
            if (v == 0 && this.timer) {
                clearInterval(this.timer);
            }
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.time = v * 60;
            this.timer = setInterval(() => {
                this.time = this.time - 1;
                if (this.time == 0) {
                    api.closeWidget();
                }
            }, 1000);
        },
        getTime(t) {
            if (t == 0) {
                return '不开启';
            }
            return new Date(t * 1000).Format('mm:ss');
        },
        onConfig() {

            if (this.token) {
                api.openWin({
                    name: 'config',
                    url: getPath() + '/html/index.html?path=config',
                });
            } else {
                this.onLogin();
            }

        },
        onShowWallet() {
            if (this.token) {
                api.openWin({
                    name: 'config',
                    url: getPath() + '/html/index.html?path=wallet',
                });
            } else {
                this.onLogin();
            }

        },
        onShowWin() {
            if (this.token) {
                api.openWin({
                    name: 'config',
                    url: getPath() + '/html/index.html?path=win',
                });
            } else {
                this.onLogin();
            }

        },
        getSrc() {
            if (this.token) {
                if (this.info.head.indexOf('http') > -1) {
                    return this.info.head
                } else {
                    return this.src + this.info.head;
                }
            } else {
                return head;
            }


        },
        onLogin() {
            this.interact_status = 'play';
            this.$nextTick(() => {
                this.$router.push('/login')
            })
        }
    },
    mounted() {
        this.render();
        this.$ls.on('close-time', this.closeTime)

        this.ios = api.systemType == 'ios';
        this.getProgramListen()
    },
    watch: {
        isLoading(b) {
            if (this.isLoading) {
                setTimeout(() => {
                    this.isLoading = false;
                    this.count++;
                }, 500);
            }
        }
    }
}
</script>
