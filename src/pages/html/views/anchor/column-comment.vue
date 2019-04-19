<template>
  <div class="new-body">
    <van-nav-bar :style="{paddingTop:paddingTop}" @click-left="onClickLeft" right-text="" :title="title">
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <!-- 资讯内容     -->
    <pull-to :bottom-load-method="refresh">
      <div class="comment-dynamic" v-show="type==1">
        <div class="aui-card-list-header aui-card-list-user aui-border-b">
          <div class="aui-card-list-user-avatar">
            <img :src="src+comment.head" class="aui-img-round" />
          </div>
          <div class="aui-card-list-user-name">
            <div class="name">{{comment.name}}</div>
            <div v-if="comment.follow" class="aui-btn btn">已关注</div>

            <div v-else class="aui-btn btn-follow" @click="compereFollow(comment.compereId)">关注</div>
          </div>
          <div class="aui-card-list-user-info time">11-25 09:12</div>
        </div>
        <div class="aui-card-list-content-padded">
          <p class="cont">{{comment.cont}}</p>

          <img :src="src+comment.img + '?t='+getTime()" style="width:260px" />
        </div>
        <div class="comment-dynamic-foot">
        </div>
      </div>

      <div class="comment-list" v-show="type==2">
        <div class="aui-media-list-item-inner ad-list-cont">
          <div class="aui-list-item-media">

            <img :src="src+comment.img" class="img">
          </div>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-text">
              <div class="aui-list-item-title comment-title">{{comment.brief}}</div>
            </div>
            <div class="aui-list-item-text  comment-anchor">
              主播：{{comment.name}}
            </div>
          </div>
        </div>
      </div>

      <!-- 评论 -->
      <div v-show="type==3" style="margin-top:70px">
      </div>
      <div class="comment">
        <div class="title">评论 {{this.commentList.length}}</div>
        <div class="aui-content aui-margin-b-15 ">
          <ul class="aui-list aui-media-list " v-for="c in commentList">
            <li class="aui-list-item">
              <div class="aui-media-list-item-inner">
                <div class="aui-list-item-media" style="width: 2rem;">

                  <img :src="src + c.head+'?t='+getTime()" class="aui-img-round aui-list-img-sm">
                </div>
                <div class="aui-list-item-inner">
                  <div class="aui-list-item-text">
                    <div class="aui-list-item-title">
                      <p class="name">{{c.name}}</p>
                      <p class="time">{{formatDateTime(c.time)}}</p>
                    </div>
                    <div class="aui-list-item-right" @click='postZan(c.id)'>
                      <img src="../../../../assets/images/radio/x.png" class="zan-img">
                      <span class="count">{{c.zan}}</span>
                    </div>
                  </div>
                  <!-- <div class="aui-list-item-text cont">
                      @颜渊:生命的意义在于坚持，有一些人往往离成功只差一步，却没有坚持下来，你行的，加油！
                  </div> -->
                  <div class="aui-info aui-margin-t-5 reply" style="padding:0">
                    {{c.content}}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </pull-to>

    <div class="sumbit footer">
      <div class="aui-row row">
        <div class="aui-col-xs-10">
          <div class="aui-searchbar-input aui-border-radius input-class">
            <input type="text" placeholder="快和大家一起讨论吧" v-model="content" />
          </div>
        </div>
        <div class="aui-col-xs-2" @click="postComment">
          <img src="../../../../assets/images/radio/send.png" class="send-btn">
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import PullTo from 'vue-pull-to';
import { getNews, src, postInfoComment, postInfoZan, getInfoComment, compereFollow, postCompereFollow } from '../../index/services';
import { Toast } from 'vant';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      comment: {},
      newList: [],
      commentList: [],
      isLoading: false,
      src: src,
      type: 1,
      title: '动态详情',
      content: '',
      param: {
        'id': 1,
        'type': 1,
        'page': 0,
        'size': 2
      },
      paramComment: {
        'type': 1,
        'typeId': 0,
        'page': 0,
        'size': 10
      },
      postParamComment: {
        'token': '',
        'type': 1,
        'typeId': 0,
        'content': ''
      }
    }
  },
  methods: {
    render(loaded) {
      this.isLoading = true;
      this.paramComment.typeId = this.comment.id
      getInfoComment(this.paramComment).then(rep => {
        this.data = rep.data;
        this.isLoading = false;
        if (loaded) {
          loaded('done');
        }
      })

    },
    onClickLeft() {
      this.$router.go(-1);
    },
    refresh(loaded) {
      this.render(loaded);
    },
    getComment() {
      this.paramComment.typeId = this.comment.id
      getInfoComment(this.paramComment).then(rep => {
        this.commentList = rep.data

      });
    },
    getTime() {
      return Math.random();
    },
    postComment() {
      Toast.loading();
      postInfoComment({ 'token': this.$ls.get('token'), 'type': 1, 'typeId': this.comment.id, 'content': this.content }).then(rep => {
        // alert(JSON.stringify(rep))
        Toast.clear();
        Toast.success('评论成功');
        this.content = '';
        this.getComment();
      })
    },
    postZan(id) {
      postInfoZan({ 'token': this.$ls.get('token'), 'type': 2, 'typeId': id }).then(rep => {
        this.getComment();
      })
    },
    compereFollow(id) {
      Toast.loading();
      postCompereFollow({ 'token': this.$ls.get('token'), 'compereId': id }).then(rep => {
        Toast.clear();
        Toast.success('关注成功');
        this.comment.follow = 1
        // this.getComment();
      })
    },
    formatDateTime(timeStamp) {
      var date = new Date();
      date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return m + '-' + d + ' ' + h + ':' + minute
    },
    getDateDiff(dateTimeStamp) {
      var result;
      var minute = 1000 * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var halfamonth = day * 15;
      var month = day * 30;
      var now = new Date().getTime();
      var diffValue = now - dateTimeStamp * 1000;

      if (diffValue < 0) {
        return;
      }
      var monthC = diffValue / month;
      var weekC = diffValue / (7 * day);
      var dayC = diffValue / day;
      var hourC = diffValue / hour;
      var minC = diffValue / minute;
      if (monthC >= 1) {
        if (monthC <= 12)
          result = "" + parseInt(monthC) + "月前";
        else {
          result = "" + parseInt(monthC / 12) + "年前";
        }
      }
      else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
      }
      else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
      }
      else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
      }
      else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    }

  },
  components: {
    PullTo
  },
  mounted() {
    this.comment = this.$route.query.comment
    this.type = this.$route.query.type
    if (this.type == 2) {
      this.title = "栏目评论"
    }
    this.getComment()
  }

}
</script>

<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.new-body {
  height: 100%;
  overflow-y: auto;
  background-color: #fff;

  .van-pull-refresh__track {
    height: 100%;
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
    color: #292726;
    height: px2rem(88);
    background-color: #fff !important;
    border-bottom: 1px solid #e6eaed;
    overflow-y: auto;
    position: fixed;
    width: 100%;
    min-height: px2rem(88);
    line-height: px2rem(88);
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem(130);
  }

  .comment1 {
    // margin-left: px2rem(30);
    // margin-right: px2rem(30);
    background-color: #f2f4f5;
    padding: px2rem(30);
    // margin-top: px2rem(56);

    .img {
      width: px2rem(100);
      height: px2rem(100);
    }
    .comment-title {
      padding-left: px2rem(30);
      color: #292726;
      font-size: px2rem(28);
      font-weight: bold;
    }
    .comment-anchor {
      padding-top: px2rem(15);
      padding-left: px2rem(30);
      color: #646261;
      font-size: px2rem(26);
    }
  }

  .news-cont {
    margin-top: px2rem(126);
    background-color: #fff;
    padding: px2rem(30) px2rem(30) 0 px2rem(30);
    .title {
      color: #292726;
      font-weight: bold;
      font-size: px2rem(40);
    }
    .brief {
      color: #9d9a99;
      font-size: px2rem(26);
    }
  }

  .cont {
    margin-top: px2rem(-40);

    padding-bottom: px2rem(10);
    color: #454647;
    font-weight: bold;
    font-size: px2rem(34);
    line-height: px2rem(40);
    .img {
      width: px2rem(690);
    }
  }

  .news {
    margin-top: px2rem(30);
    background-color: #fff;
    .title {
      padding: px2rem(30);
      font-size: px2rem(34);
      color: #292726;
      font-weight: bold;
    }
  }

  .new_list {
    margin-top: -1px;
    .info {
      .cont {
        margin-top: px2rem(-30);
        color: #292726;
        font-size: px2rem(30);
        font-weight: bold;
      }
      .brief_title {
        margin-top: px2rem(-25);
        font-size: px2rem(24);
        color: #9d9a99;
      }
      .brief {
        margin-top: px2rem(-25);
        padding-left: 20px;
        font-size: px2rem(24);
        color: #9d9a99;
      }
      .img {
        width: px2rem(200);
        height: px2rem(130);
      }
    }
  }

  .comment {
    background-color: #fff;
    .title {
      padding: px2rem(30);
      font-size: px2rem(34);
      color: #292726;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .name {
      color: #646261;
      font-size: px2rem(28);
      font-weight: bold;
    }
    .time {
      color: #9d9a99;
      font-size: px2rem(24);
    }

    .cont {
      color: #9d9a99;
      font-size: px2rem(26);
      font-weight: bold;
    }
    .reply {
      color: #292726;
      font-size: px2rem(28);
      font-weight: bold;
    }
    .zan-img {
      vertical-align: middle;
      display: inline-block;
      width: px2rem(50);
    }
    .count {
      font-size: px2rem(26);
    }
  }

  .sumbit {
    border-top: 1px solid #e6eaed;
    background-color: #fff;
    padding-bottom: px2rem(30);
    font-size: px2rem(26);
    input::-webkit-input-placeholder {
      color: #9d9a99;
      font-size: px2rem(26);
      text-align: left;
    }
    .row {
      padding-top: px2rem(30);
    }
    .input-class {
      border: none;
      width: px2rem(500);
      background: #f5f7f7;
      outline: none;
      height: 35px;
      font-size: px2rem(10);
      color: #9d9a99;
    }
    .send-btn {
      width: px2rem(120);
    }
  }

  .comment-dynamic {
    margin-top: px2rem(156);
    .name {
      font-size: px2rem(28);
      font-weight: bold;
    }
    .follow-btn {
      width: px2rem(140);
      height: px2rem(60);
      font-size: px2rem(26);
    }
    .time {
      color: #9d9a99;
      font-size: px2rem(24);
    }
    .cont {
      color: #292726;
      font-size: px2rem(30);
      font-weight: bold;
    }
    .btn {
      width: px2rem(140);
      height: px2rem(60);
      font-size: px2rem(26);
    }
    .btn-follow {
      background-color: #ff5f53;
      color: #fff;
      width: px2rem(100);
      height: px2rem(56);
      font-size: px2rem(26);
    }

    .comment-dynamic-foot {
      height: px2rem(30);
      background-color: #f2f4f5;
    }

    .footer-list {
      padding-left: px2rem(80);
      padding-right: px2rem(80);

      .img {
        vertical-align: middle;
        display: inline-block;
        width: px2rem(40);
        height: px2rem(36);
      }
      .title-check {
        color: #ff5f53;
        font-size: px2rem(28);
      }
      .title {
        color: #646261;
        font-size: px2rem(28);
      }
    }
  }
}
</style>

