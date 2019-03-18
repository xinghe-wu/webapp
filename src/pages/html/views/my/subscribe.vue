<template>
<div class="my-subscribe-view">
    <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onClickLeft" 
            right-text=""   title="我的订阅"  >
               <van-icon name="arrow-left" slot="left" style="color:#292726"/>
    </van-nav-bar>

<div class="content" v-if="subscribeList">
<div class="subscribe">
  <div class="aui-content aui-margin-b-15" >
  <ul class="aui-list aui-media-list ad_list" v-for="(s,index) in subscribeList" :key="index" >
  <li class="aui-list-item"  @click="programList(s)">
              <div class="aui-media-list-item-inner ad-list-cont">
                  <div class="aui-list-item-media">
                      <img :src="src +s.img" class="aui-list-img-sm anchor-head" >
                  </div>
                  <div class="aui-list-item-inner">
                      <div class="aui-list-item-text">
                          <div class="aui-list-item-title ad_title">{{s.name}}</div>
                      </div>
                         <div class="aui-list-item-text  ad_anchor">
                       主播:{{s.comprpe.name}} 
                      </div>
                      <div class="aui-list-item-text  ad_cont">
                       {{s.brief}}
                      </div>
                 
                  </div>
              </div>
          </li>
      </ul>
   </div> 
</div>  

<!-- 暂无订阅 -->
<div class="aui-row kong" v-if="subscribeList.lenght==0">
 <img class="img" src="../../../../assets/images/my/kong@3x.png" >
 <div class="title">
   暂无订阅
 </div>
 <div class="cont">
   订阅喜欢的电台到这里吧~
 </div>
</div>

<div class="interval"></div>

  <div class="like">
		<div class="title">
		  	 你可能喜欢
		</div>
    <section class="aui-grid">
      <div class="aui-row">
            <div class="aui-col-xs-4" v-for="l in columnList" @click="programList(l)">
                <img class="img" :src="src+l.img" >
                <div class="aui-grid-label cont">{{l.name}}</div>
            </div>
       </div>
    </section>
   </div>


      <div style=" text-align: center;">
            <div class="aui-btn aui-btn-danger  aui-btn-outlined aui-btn-sm change-btn" @click="changeCoumns()"><span>换一批</span></div>
       </div>
 </div>
</div>
  
</template>

<script>
import { getSubscribes, getColumn, src } from '../../index/services';

export default {
  store: ['paddingTop', 'token'],
  data() {
    return {
      src: src,
      subscribeList: [],
      columnList: [],
      query: {
        page: 1,
        size: 6,
        id: 1
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getSubscribes() {
      getSubscribes(this.$ls.get('token')).then(rep => {
        this.subscribeList = rep;
      })
    },
    getCoumns() {
      getColumn(this.query).then(rep => {
        if (rep.data.length > 0) {
          this.columnList = rep.data;
        }
      })
    },
    changeCoumns() {
      this.query.page++
      this.getCoumns()
    },
    programList(data) {
      alert(JSON.stringify(data))

      this.$router.push({ path: '/program/list', query: { column: data } })

    }
  },
  mounted() {
    this.getSubscribes()
    this.getCoumns()
  }

}
</script>


<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.my-subscribe-view {
  height: 100%;
  overflow-y: hidden;
  text-align: center;
  background-color: #fff;
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
    height: px2rem(88);
    background-color: #fff !important;
  }

  .content {
    overflow-y: auto;
    height: 100%;
    padding-bottom: px2rem(160);
    .van-pull-refresh__track {
      height: 100%;
    }
    .subscribe {
      .ad_list {
        margin-top: -1px;
      }
      .ad-list-cont {
        padding-top: px2rem(10);
        padding-bottom: px2rem(10);
        .ad-img {
          width: px2rem(160);
          height: px2rem(160);
        }
        .ad_title {
          color: #292726;
          font-size: px2rem(30);
          font-weight: bold;
        }
        .ad_cont {
          text-align: left;
          font-size: px2rem(26);
          color: #646261;
        }
        .ad_anchor {
          color: #646261;
          font-size: px2rem(26);
        }
      }
    }
  }

  .kong {
    padding-bottom: px2rem(50);
    .img {
      width: px2rem(400);
      height: px2rem(290);
    }
    .title {
      color: #646261;
      font-size: px2rem(28);
      text-align: center;
      font-weight: bold;
    }
    .cont {
      padding-top: px2rem(10);
      font-size: px2rem(24);
      color: #9d9a99;
    }
  }

  .interval {
    background-color: #f2f4f5;
    height: px2rem(30);
  }

  .like {
    background-color: #fff;
    padding: px2rem(30);

    .title {
      font-size: px2rem(34);
      font-weight: bold;
      float: left;
    }
    .img {
      width: px2rem(216);
      height: px2rem(216);
    }
    .cont {
      color: #292726;
      font-size: px2rem(26);
      font-weight: bold;
    }
  }

  .change-btn {
    width: px2rem(180);
    height: px2rem(56);
    font-size: px2rem(28);
    text-align: center;
    display: inline-block;
  }
}
</style>

