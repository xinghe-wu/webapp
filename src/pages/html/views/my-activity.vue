<template>
    <div class="my-activity-list">
        <van-nav-bar style="position: fixed;top:0;width: 100%;left: 0;" :style="{paddingTop:paddingTop}" id="header"
                     @click-left="onClickLeft"  left-arrow title="我参与的"  >
        </van-nav-bar>

        <pull-to class="content" :style="{paddingTop:paddingTop}" >
            <ul class="list">
                <li class="item" v-for="l in list" @click="onSelect(l)">
                    <a href="#">

                        <div class="left">
                            <h5>{{l.title}}</h5>
                            <p>{{l.type == 0?'已结束':'正在进行中'}}</p>
                        </div>
                        <div class="right">
                            <van-icon name="arrow"></van-icon>
                        </div>
                    </a>
                </li>
            </ul>
        </pull-to>
        <vDialog v-model="dialog"
                 :type="pushInfo.type"
                 :time="pushInfo.show_time"
                 :url="pushInfo.url"
                 :id="pushInfo.id"
        >
            <div slot="title">
                {{pushInfo.title}}
            </div>
            <span slot="body">
                <img class="pull-info-img" style="width: 100%" :src="src+ pushInfo.img" alt="">
                <p>
                    {{pushInfo.brief}}
                </p>
            </span>
        </vDialog>

    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .my-activity-list{
        height: 100%;
        .van-hairline--bottom::after{
            border: none;
        }

        .van-nav-bar{
            background-color: #fce76c !important;
        }

        .content{
            padding-left: px2rem(40);
            padding-right: px2rem(40);
            margin-top: px2rem(88);
            .van-pull-refresh__track{
                height: 100%;
            }
            ul.list{
                padding-top: px2rem(48);
                li{
                    display: block;
                    height: px2rem(120);
                    background-color: #ffffff;
                    box-shadow: 0 px2rem(20) px2rem(50) 0
                    rgba(0, 0, 0, 0.1);
                    border-right:px2rem(1) solid #f1f1f1;
                    margin-bottom: px2rem(20);
                    padding: 0 px2rem(40);
                    border-left: px2rem(8) solid #ffd164;

                    a{
                        display: flex;
                        .left{
                            flex: 1;
                            height: 100%;
                            h5{
                                margin-top:px2rem(25);
                                margin-bottom: 0;
                                padding: 0;
                                font-size: px2rem(34);
                                font-weight: normal;
                                color: #262628;
                            }
                            p{
                                font-size: px2rem(26);
                                font-weight: normal;
                                font-stretch: normal;
                                line-height: px2rem(32);
                                letter-spacing: 0px;
                                color: #777777;
                            }
                        }
                        .right{
                            width: px2rem(60);
                            text-align: right;
                            padding-top: px2rem(24);
                            .van-icon{
                                color: #dddddd;
                                font-size: px2rem(20);
                            }
                        }
                    }
                }
            }
        }
    }

</style>
<script>
    import PullTo from 'vue-pull-to';
    import {getMyActivity,src} from '../index/services';
    import { Toast } from 'vant';
    import vDialog from '../components/vDialog.vue';

    export default {
        store:['paddingTop','token'],
        data(){
            return {
                list:[],
                src:src,
                refreshing: false,
                loading: false,
                finished: false,
                query:{
                    page:1
                },
                dialog: false,
                pushInfo: {}
            }
        },
        methods:{
            onClickLeft(){
                api.closeWin();
            },
            onSelect(node){
                this.pushInfo = node;
                this.dialog = true;
            },
            onLoad() {
                getMyActivity({token: this.token}).then((rep) =>{
                    this.list = rep;
                    this.loading = false;
                })
            },
            onRefresh() {
                setTimeout(()=>{
                    this.finished = false;
                    this.refreshing = false;
                    window.scrollTo(0, 10);
                },1000)

            }
        },
        components:{
            PullTo,
            vDialog
        },
        mounted(){
            this.onLoad();
        }
    }
</script>