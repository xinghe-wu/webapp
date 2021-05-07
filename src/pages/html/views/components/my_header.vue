<template>
    <div class="head-list">
        <van-nav-bar :style="{paddingTop:paddingTop}"  id="header" @click-left="onBack" left-arrow
                     right-text=""  title="活动"  >
        </van-nav-bar>
    </div>
</template>
<style lang="scss" type="text/scss">
@import "../../../../public/px2rem.scss";
.head-list {
  overflow-y: hidden;
  background-color: #efefef;
  overflow: hidden;

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
    height: 45px;
    background-color: #fff !important;
  }
}
</style>
<script>
import { Toast } from 'vant';
export default {
  store: ['paddingTop', 'token'],
  data() {
    return {

    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    }
  }

}
</script>
