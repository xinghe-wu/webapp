<template>
  <div class="new-body">
    <van-nav-bar :style="{paddingTop:paddingTop}" @click-left="onClickLeft" right-text="" title="资讯">
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>

    <!-- 资讯内容     -->
    <pull-to :bottom-load-method="refresh">
      <div class="news-cont">
        <div class="title">
          {{news.title}}
        </div>

        <div class="aui-row brief">
          <div class="aui-col-xs-3">
            {{news.radio_name}}
          </div>

          <div class="aui-col-xs-3">
            {{formatDateTime(news.time)}}
          </div>
        </div>

        <div class="introduction">
          <p v-html="news.cont"></p>
        </div>
      </div>

      <!-- 推荐资讯 -->
      <div class="news">
        <div class="title">
          推荐资讯
        </div>
      </div>
      <div class="aui-content aui-margin-b-15 ">

        <ul class="aui-list aui-media-list new_list">
          <li class="aui-list-item" v-for="n in newList">
            <div class="aui-media-list-item-inner info-list">
              <div class="aui-list-item-inner">
                <div class="aui-list-item-title cont">{{n.title}}</div>
                <div class="aui-list-item-text">
                  <span class="brief_title">{{n.radio_name}}</span>
                  <span class="brief">{{n.comments}}评论</span>
                  <span class="brief">{{getDateDiff(n.time)}}</span>
                </div>
              </div>
              <div class="aui-list-item-media">
                <img :src="src + n.img" alt="" class="img">
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 评论 -->
      <div class="comment">
        <div class="title">
          评论{{news.comments}}
        </div>

        <div class="aui-content aui-margin-b-15 ">
          <ul class="aui-list aui-media-list " v-for="c in commentList">
            <li class="aui-list-item">
              <div class="aui-media-list-item-inner">
                <div class="aui-list-item-media" style="width: 2rem;">
                  <!-- <img :src="src+c.head" style="width:60px" alt="" > -->
                  <img :src="src + c.head" class="aui-img-round aui-list-img-sm">

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

        <!-- 
 <div class="aui-card-list-footer aui-border-t">
   <div class="aui-searchbar-input aui-border-radius input-class" />
   <input type="text"  >
   </div>
     <div><van-icon name="like-o"/> 66</div>
     <div><i class="aui-iconfont aui-icon-comment"></i> 88</div>
     <div><i class="aui-iconfont aui-icon-forward"></i> </div>
 </div> -->

      </div>

    </div>

  </div>

</template>

<script>
import PullTo from 'vue-pull-to';
import { getNews, src, getNewsComment, postNewsComment, postNewsZan } from '../../index/services';
import { Toast } from 'vant';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      news: {},
      newList: [],
      commentList: [],
      src: src,
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
      this.paramComment.typeId = this.news.id
      getNewsComment(this.paramComment).then(rep => {
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
    getNews() {
      getNews(this.param).then(rep => {
        this.newList = rep.data
      });
    },
    getComment() {
      this.paramComment.typeId = this.news.id
      getNewsComment(this.paramComment).then(rep => {
        this.commentList = rep.data
      });
    },
    postComment() {
      if (this.content.length == 0) {
        Toast.fail('请输入评论内容');

      } else {
        Toast.loading();
        postNewsComment({ 'token': this.$ls.get('token'), 'type': 1, 'typeId': this.news.id, 'content': this.content }).then(rep => {
          Toast.clear();
          Toast.success('评论成功');
          this.getComment();
        })
      }
    },
    postZan(id) {
      postNewsZan({ 'token': this.$ls.get('token'), 'type': 2, 'typeId': id }).then(rep => {
        this.getComment();
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

    this.news = this.$route.query.new
    this.getNews()
    this.getComment()


  }

}
</script>

<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.new-body {
  height: 100%;
  overflow-y: auto;
  background-color: #efefef;
  padding-bottom: px2rem(90);

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
    padding-top: px2rem(30);
    padding-bottom: px2rem(30);
    color: #454647;
    font-weight: bold;
    font-size: px2rem(34);
    line-height: px2rem(60);
    .img {
      width: px2rem(690);
    }
  }

  .introduction {
    padding-top: px2rem(20);
    color: #454647;
    font-size: px2rem(34);
    width: 100%;
  }

  .introduction img {
    width: 100%;
    object-fit: fill;
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
    .info-list {
      .cont {
        color: #292726;
        font-size: px2rem(30);
        font-weight: bold;
      }
      .brief_title {
        font-size: px2rem(24);
        color: #9d9a99;
      }
      .brief {
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
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem(80);
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
}
</style>

