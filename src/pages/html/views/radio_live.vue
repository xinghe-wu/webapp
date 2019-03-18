<template>
    <div>
        <div class="my-fm-list">
            <van-nav-bar :style="{paddingTop:paddingTop}" id="header" @click-left="onClickLeft"  left-arrow :title="session.name"  >

            </van-nav-bar>
            <div class="content">
                <img :src="src + session.head" alt="">
                <p>{{session.introduce?session.introduce:'暂无介绍'}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="sass" type="text/scss"  scoped>
    @import "../../../public/px2rem.scss";
    .content{
        text-align: center;
        font-size: 0;
        padding-top: px2rem(40);
        img {
            width: 90%;
        }
        p {
            color: #333;
            font-size: px2rem(32);
            margin-top: px2rem(40);
            padding: 0 px2rem(40);
        }
    }
</style>
<script>
    import {src} from '../index/services';
    export default {
        store:['paddingTop'],
        data(){
            return {
                session:{
                },
                src:src
            }
        },
        methods:{
            onClickLeft() {
                api.closeWin();
            }
        },
        created(){
           this.session = api.pageParam.session;
        },
        mounted(){

        }
    }
</script>
