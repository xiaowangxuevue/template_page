<template>
  <div id="app">
    <router-view />

  </div>
</template>

<script>
import Vconsole from "vconsole";

export default {
  name: "App",
  mixins: [loginMixin],
  mounted() {
    this.$bus.$on("openVconsole", () => {
      new Vconsole();
    });
  },
};
</script>

<style lang="scss">
@import url("./assets/css/base.css");
@import url("./assets/css/quill.core.css");
@import url("./assets/css/quill.snow.css");
@import url("./assets/css/quill.bubble.css");

.app-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  background: #f5f6fd;

  img {
    width: 100vw;
    height: auto;
  }

  .progress {
    position: absolute;
    top: 330px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    border: 2px solid #fddd70;
    border-radius: 10px;
  }

  .text {
    position: absolute;
    top: 358px;
    width: 100%;
    font-size: 15px;
    text-align: center;
    color: #6f8594;
    font-weight: 700;
  }
}

.retry-toast {
  width: 200px;
}
</style>
