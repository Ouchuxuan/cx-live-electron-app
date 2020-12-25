<template>
	<div class="main-layout">
		<div class="header"></div>
		<div class="mian-layout-content">
			<!-- <router-view/> -->
			<video></video>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
const { desktopCapturer } = require("electron");
@Component
export default class Layout extends Vue {
	mounted() {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => devices.filter((d) => d.kind === "videoinput"))
			.then((devices) => console.log("--", devices)); // devices 为摄像头数组);

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
}
</script>
<style lang="scss" scoped>
.main-layout {
	width: 100%;
	height: 100%;
	.header {
		width: 100%;
		height: 40px;
		-webkit-app-region: drag;
	}
	.mian-layout-content {
		min-height: calc(100% - 40px);
	}
}
</style>