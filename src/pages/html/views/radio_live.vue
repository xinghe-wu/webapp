<template>
  <div>
    <van-nav-bar
      style="padding-top:30px"
      @click-left="onClickLeft"
      right-text=""
      title="直播"
    >
      <van-icon name="arrow-left" slot="left" style="color:#292726" />
    </van-nav-bar>
  </div>
</template>
<script>
import { getPath } from "../index/services";
import { stringify } from "querystring";
export default {
  data() {
    return {
      show: false,
      url: "",
      session: {
        roomId: "",
        password: "",
        nickname: ""
      },
      core: {}
    };
  },
  methods: {
    render() {
      var player = api.require("gotyeLivePlayer");

      player.init({
        session: this.session
      });
      player.play({ playView: "live_frm" });

      player.addEventListener({ name: "connected" }, function(ret, err) {
        api.toast({ msg: "connected" });
      });

      player.addEventListener({ name: "error" }, function(ret, err) {
        api.toast({ msg: JSON.stringify(ret) });
      });
    },
    init() {
      this.core.authRoomSession(this.session, function(ret, err) {
        var msg = JSON.stringify(err);
        // api.toast({
        //   msg: ret
        // });

        var player = api.require("gotyeLivePlayer");

        player.init({
          session: this.session
        });

        player.play({ playView: "frm_mine" });

        //chat.login(loginCallback);
        // core.getLiveContext(this.session, function(ret, err) {
        //   api.alert({ title: "getLiveContext", msg: JSON.stringify(ret) });
        // });
        // core.getClientUrl(this.session, function(ret, err) {
        //   api.alert({ title: "getClientUrl", msg: JSON.stringify(ret) });
        // });
      });
    },
    onClickLeft() {
      api.closeFrame({
        name: "frm_mine"
      });

      this.$router.go(-1);
    }
  },
  mounted() {
    this.session = this.$route.query.session;

    api.openFrame({
      name: "frm_mine",
      bgColor: "#0a202e",
      // url: getPath() + "/public/win.html",

      rect: {
        x: 0,
        y: 80,
        h: "auto",
        w: api.winWidth
      },
      bounces: false
    });

    var core = api.require("gotyeLiveCore");

    core.setDebugLogEnabled({
      enabled: true
    });

    core.authRoomSession(this.session, (ret, err) => {
      if (ret) {
        this.render();
      } else {
        alert(JSON.stringify(err));
      }
    });

    // this.core = api.require("gotyeLiveCore");
    // this.core.setDebugLogEnabled({ enabled: true });
    // this.session = this.$route.query.session;
    // alert(JSON.stringify(session));
    // this.init();
  }
};
</script>
