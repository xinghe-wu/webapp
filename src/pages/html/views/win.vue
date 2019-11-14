<template>
    <div class="win-list">
        <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft"  left-arrow title="中奖纪录"  >

        </van-nav-bar>
        <div class="content">
            <van-pull-refresh style="height: 100%" v-model="isLoading" @refresh="onRefresh">
            <ul class="list" v-show="list.length>0">
                <li class="item" v-for="l in list" @click="onSelect(l)">
                    <a href="javascript:;" v-ripple>
                        <div class="left">
                            <h5>{{l.win_notice}}</h5>
                            <p>{{getTime(l.win_time)}}</p>
                        </div>
                        <!--<div class="right">-->
                            <!--<van-icon name="arrow"></van-icon>-->
                        <!--</div>-->
                    </a>
                </li>
            </ul>
                <p style="text-align: center;color: #666;font-size: 14px;margin-top: 30px;" v-show="list.length == 0">暂无中奖纪录</p>
            </van-pull-refresh>
        </div>

    </div>
</template>
<style lang="sass" type="text/scss" >
    @import "../../../public/px2rem.scss";
    .win-list{
        height: 100%;
        overflow-y: hidden;
        .van-hairline--bottom::after{
            border: none;
        }

        >.content{
            overflow: hidden;
            padding-bottom: px2rem(188);
            padding-left: px2rem(40);
            padding-right: px2rem(40);
            height: 100%;
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
                    border-right:px2rem(1) solid rgba(0,0,0,.1);
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
import { getActivity, src, getWin } from '../index/services';
import { Toast } from 'vant';
import vDialog from '../components/vDialog.vue';
export default {
    store: ['paddingTop', 'token'],
    data() {
        return {
            list: [],
            src: src,
            isLoading: false,
            pushInfo: {},
            dialog: false

        }
    },
    methods: {
        onRefresh() {
            setTimeout(() => {
                getWin(this.token).then((rep) => {
                    this.list = rep;
                    this.isLoading = false;
                })
            }, 500)
        },
        onClickLeft() {
            api.closeWin();
        },
        onSelect(node) {
            //                this.pushInfo = node;
            //                this.dialog = true;
        },
        getTime(d) {
            return new Date(d).format('yyyy-MM-dd hh:ss');
        }
    },
    components: {
        PullTo,
        vDialog
    },
    mounted() {
        //            getActivity({id:1||api.pageParam.id}).then( (rep) =>{
        //                this.list = rep.data;
        //            })
        getWin(this.token).then(rep => {
            this.list = rep;
        })
    }
}
</script>