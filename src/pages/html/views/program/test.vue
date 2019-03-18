<template>
<div id="container">
            <div class="main_box">
                <div class="audio_box "><!--audio1-->
                    <div class="audio_detail">
                        <audio src="../../../../assets/images/1.mp3" controls id="audio"></audio>
                        <b :class="{pause:!pause}" @click="play()"></b>
                        <div class="audio_p">
                            <div class="progress">
                                <div class="circle" v-bind:style="{ left: circle_w}"></div>
                                <div class="progress_g" v-bind:style="{ width: progress_g_w }"></div>
                            </div>
                            <div class="time clearfix">
                                <span>{{current_time | time}}</span>
                                <span><!--音频的时长--></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
</template>

<script>


export default {
  data() {
    return {
      progress_g_w: 0,
      circle_w: 0,
      pause: true,
      current_time: 0,
      audio_w: '',
      audio_w_g: '',
      nowAudioTime: 0,
    }
  },
  methods: {

    audio_p() {
      var that = this;
      var audio_l = document.getElementById('audio');
      that.audio_w = document.querySelector('.progress').offsetWidth;
      var that = this;
      audio_l.addEventListener("timeupdate", function () {
        that.current_time = (audio_l.currentTime <= 1) ? 1 : audio_l.currentTime;
        var scales = (audio_l.currentTime / 136) >= 1 ? 1 : (audio_l.currentTime / 136);
        that.progress_g_w = scales * 100 + '%';
        that.audio_w_g = document.querySelector('.progress_g').offsetWidth;
        //如果绿色进度条的宽度小于5px
        if (that.audio_w_g <= 5) {
          that.circle_w = 0;
        } else if (that.audio_w_g >= (that.audio_w - 5)) {
          that.circle_w = 'calc(100% - 10px)';
        } else {
          that.circle_w = 'calc(' + (scales * 100) + '% - 5px)';
        }
      }, false)
      audio_l.addEventListener("ended", function () {
        that.pause = true;
        audio_l.currentTime = 0;
        that.progress_g_w = 0;
        that.current_time = 0;
        that.circle_w = 0;
      }, false)
    },
    play() {//点击播放
      var that = this;
      var audio_l = document.getElementById('audio');
      if (audio_l.paused) {
        audio_l.play();
        that.audio_p();
        that.pause = false;
      } else {
        audio_l.pause();
        that.pause = true;
      }
    },
    touch_move() {  //拖拉进度条     
      var that = this;
      var width = document.querySelector('.progress').offsetWidth;
      var audio = document.querySelector('audio');
      /*audio.addEventListener("loadedmetadata", function() {*/
      // 拖拽事件
      var touch = document.querySelector('.circle');
      touch.addEventListener("touchstart", handleStart, false);
      touch.addEventListener("touchmove", handleMove, false);
      touch.addEventListener("touchend", handleEnd, false);
      var x1, y1, oldTime, newTime, olfLeft, newLeft;
      function handleStart(e) {
        e.preventDefault();
        var touches = e.changedTouches;
        x1 = touches[0].pageX;
        y1 = touches[0].pageY;
        olfLeft = document.querySelector('.circle').offsetLeft;
        document.getElementById("audio").pause();
        that.pause = true;
      }
      function handleMove(e) {
        e.preventDefault();
        var x2 = e.changedTouches[0].pageX;
        var y2 = e.changedTouches[0].pageY;
        newLeft = x2 - x1;
        nowLeft = olfLeft + newLeft;
        if (nowLeft < 0) {
          nowLeft = 0;
        }
        if (nowLeft > width) {
          nowLeft = width;
        }
        document.querySelector('.progress_g').style.width = nowLeft + "px";
        document.querySelector('.circle').style.left = (nowLeft - (nowLeft > (width - 10) ? 10 : 5)) + "px";
        var per = nowLeft / width;
        that.nowAudioTime = 136 * per;//音频应该显示的时间
        that.current_time = that.nowAudioTime;
        audio.currentTime = that.nowAudioTime;
      }
      function handleEnd(e) {
        touch.removeEventListener("touchmove", handleEnd, false);
        document.querySelector('audio').currentTime = that.nowAudioTime;
        console.log(document.querySelector('audio').currentTime);
        document.querySelector('audio').play();
        that.pause = false;
      }
    }

  }
}
</script>


<style lang="scss" type="text/scss">
.audio {
  width: 200px;
  height: 200px;
}
.audio_box {
  width: 500px;
  height: 10px;
  /*background: url(../images/audio_2_03.png) no-repeat;*/
  background-size: 100% 100%;
  margin-top: 1.6rem;
}
.audio_box.audio1 {
  height: 0.92rem;
  background: url(../../../../assets/images/radio/xiayijiemu@2x.png) no-repeat;
  background-size: 100% 100%;
}
.audio_box.audio1 .audio_txt {
  padding-top: 0.13rem;
}
.audio_box .audio_txt {
  font-size: 0.17rem;
  color: #ffffff;
  padding: 0.18rem 0.25rem 0 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.audio_detail {
  padding-left: 0.5rem;
  position: relative;
  padding-right: 0.13rem;
  padding-top: 0.16rem;
}
.audio_detail b {
  display: block;
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  background: url(../../../../assets/images/radio/shangyishou@2x.png) no-repeat
    0 0;
  background-size: 2.5rem;
  left: 0.12rem;
  top: 0.04rem;
}
.audio_detail b.pause {
  background: url(../../../../assets/images/radio/shangyishou@2x.png) no-repeat
    0 -0.4rem;
  background-size: 2.5rem;
}
.audio_p {
  position: absolute;
  left: 0.5rem;
  top: 0.2rem;
  width: calc(100% - 0.63rem);
}
.progress {
  width: 100%;
  height: 0.02rem;
  border-radius: 0.02rem;
  background-color: white;
  position: relative;
}
.progress .circle {
  width: 0.1rem;
  height: 0.1rem;
  background: #41ff9d;
  position: absolute;
  border-radius: 50%;
  left: calc(30% - 0.05rem);
  top: -0.04rem;
  position: relative;
}
.progress .circle:after {
  width: 0.3rem;
  height: 0.3rem;
  display: block;
  content: "";
  position: absolute;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
.progress_g {
  position: absolute;
  left: 0;
  top: 0;
  width: 30%;
  height: 0.02rem;
  border-radius: 0.02rem;
  background-color: #41ff9d;
}
.time span {
  float: left;
  font-size: 0.11rem;
  color: #45a08e;
  margin-top: 0.1rem;
}
.time span:nth-of-type(2) {
  float: right;
}
</style>

