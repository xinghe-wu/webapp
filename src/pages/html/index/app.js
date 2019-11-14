import Vue from 'vue';

import App from './app.vue';
import VueRouter from 'vue-router';
import routes from './router';
import 'swiper/dist/css/swiper.css'
import VueLocalStorage from 'vue-ls';
import './tools';
import '../../../assets/css/aui.2.0.css';
import Ripple from 'vue-ripple-directive';

require('vue2-animate/dist/vue2-animate.min.css')


import vueTouch from 'vue-plugin-touch';
Vue.use(vueTouch);

import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage)

import FastClick from 'fastclick';

FastClick.attach(document.body);
const options = {
    namespace: 'tingdao__'
};

import VueStash from 'vue-stash';

Vue.use(VueStash);

Vue.use(VueLocalStorage, options);
Ripple.color = 'rgba(255, 255, 255, 0.35)';
Vue.directive('ripple', Ripple);
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.use(VueRouter);
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
Vue.use(Vant);

let isFirst = true;

router.beforeEach((to, from, next) => {

    if (to.path == '/login') {
        return next();
    }
    return next();


    // if (Vue.ls.get('token')) {

    //     return next();
    // } else {

    //     // return next('/login');
    //     if (to.path == '/login') {
    //         return next();
    //     }

    // }
});


// import vuex from 'vuex'
// Vue.use(vuex);

// var store = new vuex.Store({ //store对象
//     state: {
//         states: 'turn-on'
//     },
//     mutations: {
//         setTransition(state, states) {
//             state.states = states
//         }
//     }
// })


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}



window.apiready = function () {



    new Vue({
        router,
        el: '#app',
        data: {
            store: {
                token: '',
                paddingTop: api.systemType == 'ios' ? '30px' : '30px',
                interact_status: 'play',
                fm_playing: false,
                fm_list: []
            }
        },
        render: h => h(App),
        // template: `

        //  <router-view></router-view>

        //    `,

        created() {
            if (this.$ls.get("token")) {

                var path = GetQueryString('path');

                if (path) {

                    this.$router.replace('/' + path);
                } else if (this.$route.path == '' || this.$route.path == '/') {
                    this.$router.push('/app');
                }
                if (!this.store.token) {

                    return this.$router.push('/login');
                }
            } else {
                return this.$router.push('/login');
            }


            api.setStatusBarStyle({
                style: 'dark',
                color: '#000'
            });

            var ci = 0;
            var time1, time2;
            var self = this;
            // api.addEventListener({
            //     name: 'keyback'
            // }, function (ret, err) {
            //     const url = self.$route.path;
            //     alert(JSON.stringify(url))
            //     if (url == '/index' || url == '/index/fm' || url == '/index/live' || url == '/index/my' || url == '/login') {
            //         alert("1")
            //         time1 = new Date().getTime();
            //         if (ci == 0) {
            //             ci = 1;
            //             api.toast({
            //                 msg: '再按一次返回键退出1'
            //             })

            //         } else if (ci == 1) {
            //             alert("2")
            //             time2 = new Date().getTime();
            //             if (time2 - time1 < 3000) {
            //                 var audioPlayer = api.require('audioStreamer');
            //                 audioPlayer.stop();
            //                 api.closeWidget({
            //                     id: api.appId,
            //                     retData: {
            //                         name: 'closeWidget'
            //                     },
            //                     silent: true
            //                 });
            //             } else {
            //                 ci = 0;

            //                 api.toast({
            //                     msg: '再按一次返回键退出2'
            //                 });
            //             }
            //         }
            //     } else {
            //         alert("3")
            //         self.$router.go(-1) //返回
            //     }
            // })

            const perms = ['camera', 'location', 'microphone', 'storage']
            api.requestPermission({
                list: perms,
                code: 100001
            }, function (ret, err) {

            });


        }
    })


}



Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}