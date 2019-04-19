<template>
  <div>
    <keep-alive>
      <!-- <transition name="slide-right"> -->
      <transition>
        <router-view></router-view>
      </transition>
    </keep-alive>

  </div>
</template>
<style lang="scss" type="text/scss"  >
* {
  margin: 0;
  padding: 0;
}
.btn {
  width: 50%;
}
html,
body,
#app {
  height: 100%;
}
.turn-on-enter {
  transform: translate3d(0, 0, 100%);
  opacity: 0;
}
.turn-on-leave-to {
  //   transform: translate3d(-100%, 0, 0);
  //   opacity: 0;
}
.turn-on-enter-active,
.turn-on-leave-active {
  transition: transform 0.1s ease;
}
.turn-off-enter {
  /* transform: translate3d(-20%, 0, 0); */
}
.turn-off-leave-to {
  transform: translate3d(100%, 0, 0);
}
.turn-off-enter-active,
.turn-off-leave-active {
  transition: transform 0.6s ease;
}
.turn-off-leave-active {
  z-index: 2;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 300ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>

<script>
export default {

  data() {
    return {


    }
  },
  methods: {


  },


}
</script>
