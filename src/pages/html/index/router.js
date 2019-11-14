import interact from '../views/interact.vue';
import fm from '../views/appfm.vue'
import my from '../views/my.vue'
import live from '../views/live.vue'
import login from '../views/login.vue'
import vlist from '../views/vlist.vue';
import textarea from '../views/textarea.vue';
import index from '../index/index.vue';
import my_activity from '../views/my-activity.vue';
import my_fm from '../views/my-fm.vue';
import my_time from '../views/my-time.vue';
import activity from '../views/activity.vue';
import config from '../views/config.vue';
import radio_live from '../views/radio_live.vue';
import edit from '../views/edit.vue';
import fm_list from '../views/fm_list.vue';
import fm_list_select from '../views/fm_list_select.vue';
import openfm from '../views/openfm.vue';
import win from '../views/win.vue';

import anchor_detail from '../views/anchor/detail.vue'; //主播详情
import interaction_ad from '../views/interact/ad.vue' //活动
import interaction_vote from '../views/interact/vote.vue' //投票
import interaction_news from '../views/interact/new.vue' //资讯

import anchor_column from '../views/anchor/column.vue'
import anchor_column_comment from '../views/anchor/column-comment.vue'
import anchor_anchor from '../views/anchor/anchor.vue'
import anchor_column_follow from '../views/anchor/follow.vue'
import anchor_reg from '../views/anchor/reg.vue'
import anchor_edit from '../views/anchor/edit.vue'



import my_subscribe from '../views/my/subscribe.vue'
import my_msg from '../views/my/msg.vue'
import my_msg_detail from '../views/my/msg_detail.vue'
import my_wallet from '../views/my/wallet.vue'
import my_buy from '../views/my/buy.vue'

import radio_list from '../views/radio/radio_list.vue'
import radio_select from '../views/radio/radio_select.vue'
import radio_tag from '../views/radio/tag.vue'

import program_list from '../views/program/list.vue'
import program_play from '../views/program/play.vue'
import program_test from '../views/program/test.vue'


export default [{
        path: '/index',
        component: index,
        meta: {
            keepAlive: false, //此组件不需要被缓存
        },
        children: [{
            path: '',
            component: interact,
            meta: {
                keepAlive: false, //此组件不需要被缓存
            },
        }, {
            path: 'fm',
            component: fm,
        }, {
            path: 'my',
            component: my,
        }, {
            path: 'live',
            component: live,
        }]
    },
    {
        path: '/list',
        component: vlist
    },
    {
        path: '/login',
        alias: '/',
        component: login
    },
    {
        path: '/textarea',
        component: textarea,
        meta: {
            keepAlive: true, //此组件需要被缓存
            isBack: false, //用于判断上一个页面是哪个
        }
    },
    {
        path: '/my-activity',
        component: my_activity
    },
    {
        path: '/activity',
        component: activity
    },
    {
        path: '/config',
        component: config
    },
    {
        path: '/my-fm',
        component: my_fm
    },
    {
        path: '/my-time',
        component: my_time
    },
    {
        path: '/radio-live',
        component: radio_live
    },
    {
        path: '/edit',
        component: edit
    },
    {
        path: '/fm-list',
        component: fm_list
    },
    {
        path: '/fm-list-select',
        component: fm_list_select
    },
    {
        path: '/openfm',
        component: openfm
    },
    {
        path: '/win',
        component: win
    },
    {
        path: '/anchor/detail',
        component: anchor_detail
    },
    {
        path: '/interaction/ad',
        component: interaction_ad
    },
    {
        path: '/interaction/vote',
        component: interaction_vote
    },
    {
        path: '/interaction/news',
        component: interaction_news
    },
    {
        path: '/anchor/column',
        component: anchor_column
    },
    {
        path: '/anchor/columnComment',
        component: anchor_column_comment
    },
    {
        path: '/anchor/columnFollow',
        component: anchor_column_follow
    },
    {
        path: '/anchor/reg',
        component: anchor_reg
    },
    {
        path: '/anchor/edit',
        component: anchor_edit
    },

    {
        path: '/anchor/anchor',
        component: anchor_anchor
    },
    {
        path: '/my/subscribe',
        component: my_subscribe
    },
    {
        path: '/my/msg',
        component: my_msg
    },
    {
        path: '/my/msg_detail',
        component: my_msg_detail
    },
    {
        path: '/my/wallet',
        component: my_wallet
    },
    {
        path: '/my/buy',
        component: my_buy
    },
    {
        path: '/radio/radio_list',
        component: radio_list
    },
    {
        path: '/radio/radio_select',
        component: radio_select
    },
    {
        path: '/radio/tag',
        component: radio_tag
    },
    {
        path: '/program/list',
        component: program_list
    },
    {
        path: '/program/play',
        component: program_play
    },
    {
        path: '/program/test',
        component: program_test
    }

]