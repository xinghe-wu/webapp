<template>
  <!-- <keep-alive>
    <router-view> </router-view>
  </keep-alive> -->

  <!-- <router-view v-if="!$route.meta.keepAlive"> </router-view> -->

  <div id="app" class="app">
    <keep-alive>
      <router-view v-if="$route.path == '/index'"> </router-view>
    </keep-alive>

    <!-- 这里是不被缓存的视图组件，比如 page3 -->
    <router-view v-if="$route.path != '/index'"> </router-view>
  </div>
</template>
<style lang="scss" type="text/scss">
.app {
  height: 100%;
}
</style>

