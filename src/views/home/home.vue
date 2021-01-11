<template>
  <div class="home-layout">
    <div class="player-container">
      <video-player/>
    </div>
		<div class="operation-bar">
			<a-button primary='default' class="btn screen-capture-button" click='openScreenCaptrue'>开启录屏推流</a-button>
			<a-button primary='default' class="btn live-push-button">开启摄像头推流</a-button>
			<a-button primary='default' class="btn local-video-button">本地视频播放</a-button>
			<a-button primary='default' class="btn live-pull-button">拉流播放</a-button>
		</div>
  </div>
</template>
<script lang="ts">
const { desktopCapturer } = require("electron");
import {Button} from 'ant-design-vue'
import { Component, Vue } from "vue-property-decorator";
import VideoPlayer from "@/components/video-player.vue";

@Component({
  components: {
		VideoPlayer,
		AButton:Button
  },
})
export default class Home extends Vue {
	private video: HTMLVideoElement | null = document.querySelector("video");
	openScreenCaptrue(){
		
	}
  mounted() {
    this.$nextTick().then(() => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => devices.filter((d) => d.kind === "videoinput"))
        .then((devices) => console.log("devices", devices)); // devices 为摄像头数组);
      setTimeout(() => {
        this.openScan();
      }, 3000);
    });
  }
  screenCaptrue() {
    desktopCapturer
      .getSources({ types: ["window", "screen"] })
      .then(async (sources: any) => {
        console.log(123, sources);
        for (const source of sources) {
          if (source.name === "Entire Screen") {
            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                  mandatory: {
                    chromeMediaSource: "desktop",
                    chromeMediaSourceId: source.id,
                    minWidth: 1280,
                    maxWidth: 1280,
                    minHeight: 720,
                    maxHeight: 720,
                  },
                },
              } as any);
              handleStream(stream);
            } catch (e) {
              handleError(e);
            }
            return;
          }
        }
      });

    function handleStream(stream: any) {
      const video: any = document.querySelector("video");
      video.srcObject = stream;
      video.onloadedmetadata = (e: Event) => video.play();
    }

    function handleError(e: Event) {
      console.log(e);
    }
  }
  openScan() {
    const constraints = {
      audio: false,
      // video: { width: { min: 1280 }, height: { min: 720 } },
      video: true,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        console.log("检测到视频流");
        console.log("stream", stream);
        // this.video!.srcObject = stream;
        // this.video!.setAttribute("playsinline", "true"); // required to tell iOS safari we don't want fullscreen
        // this.video!.play();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>
<style lang="scss" scoped>
@import "@/style/variable.scss";
.home-layout {
  width: 100%;
  height: calc(100vh - #{$menuHeight});
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.player-container{
	width: 75%;
	height: 100%;
}
.operation-bar{
	height: 100%;
	flex: 1;
	background-color: #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	.btn{
		margin-top: 20px;
	}
}
</style>