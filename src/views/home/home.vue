<template>
	<div class="home-layout">
		<video
			width="600"
			id="live"
		></video>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
const { desktopCapturer } = require("electron");
@Component
export default class Home extends Vue {
	private video: HTMLVideoElement | null = document.querySelector("video");
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
}
</style>