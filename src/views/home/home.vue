<template>
	<div class="home-layout">
		<div class="player-container">
			<video-player />
		</div>
		<div class="operation-bar">
			<a-button
				primary="default"
				class="btn screen-capture-button"
				@click="openScreenCaptrue"
				>开启录屏</a-button
			>
			<a-button primary="default" class="btn live-push-button" @click="openLivePush"
				>开启摄像头推流</a-button
			>
			<a-button primary="default" class="btn local-video-button"
				>本地视频播放</a-button
			>
			<a-button primary="default" class="btn live-pull-button"
				>拉流播放</a-button
			>
		</div>
	</div>
</template>
<script lang="ts">
import { Button } from "ant-design-vue";
import { Component, Vue } from "vue-property-decorator";
import VideoPlayer from "@/components/video-player.vue";
import { ipcRenderer } from "electron";
import FFmpegUtils from '@/utils/ffmpeg'

@Component({
	components: {
		VideoPlayer,
		AButton: Button,
	},
})
export default class Home extends Vue {
	openScreenCaptrue() {
    ipcRenderer.send('start:screen capture')
	}
	openLivePush(){
		// 检测当前是否有摄像头
		FFmpegUtils.checkCameraExist()
	}
	mounted() {}
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
.player-container {
	width: 75%;
	height: 100%;
}
.operation-bar {
	height: 100%;
	flex: 1;
	background-color: #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	.btn {
		margin-top: 20px;
	}
}
</style>