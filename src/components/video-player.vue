<template>
  <div class="video-player-layout">
    <video id="cx-video" class="video" playsinline controls></video>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class VideoPlayer extends Vue {
  private video: HTMLVideoElement | null = document.querySelector("video");
  mounted() {}
}
</script>
<style lang="scss" scoped>
.video-player-layout {
  width: 100%;
  height: 100%;
  .video {
    width: 100%;
    height: 100%;
		outline: none;
  }
}
</style>