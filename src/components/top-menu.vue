<template>
	<div class="top-menu-layout">
		<div class="minimize-button" @click="handleMinimizeClick"></div>
		<div class="exit-button" @click="handleExitClick"></div>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ipcRenderer } from "electron";
@Component
export default class TopMenu extends Vue {
	handleExitClick() {
		ipcRenderer.send("quitApp");
	}
	handleMinimizeClick() {
		ipcRenderer.send("minimizeApp");
	}
}
</script>
<style scoped lang='scss'>
.top-menu-layout {
	height: $menuHeight;
	width: 100%;
	position: relative;
	.minimize-button {
		-webkit-app-region: no-drag;
		position: absolute;
		width: 16px;
		height: 16px;
		top: 50%;
		transform: translateY(-50%);
		right: 35px;
		background: url("~@/assets/minimize.png") center no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
		&:hover {
			background: url("~@/assets/minimize-active.png") center no-repeat;
			background-size: 100% 100%;
		}
	}
	.exit-button {
		-webkit-app-region: no-drag;
		position: absolute;
		width: 16px;
		height: 16px;
		top: 50%;
		transform: translateY(-50%);
		right: 10px;
		background: url("~@/assets/exit.png") center no-repeat;
		background-size: 100% 100%;
		cursor: pointer;
		&:hover {
			background: url("~@/assets/exit-active.png") center no-repeat;
			background-size: 100% 100%;
		}
	}
}
</style>