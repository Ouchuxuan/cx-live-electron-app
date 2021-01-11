<template>
	<div class="main-layout">
		<div class="header">
			<top-menu />
		</div>
		<!-- <router-view /> -->
	</div>
</template>
<script lang="ts">
import TopMenu from "@/components/top-menu/top-menu.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {
		TopMenu,
	},
})
export default class Layout extends Vue {}
</script>
<style lang="scss" scoped>
@import "@/style/variable.scss";
.main-layout {
	width: 100%;
	height: 100%;
}
.header {
	width: 100%;
	background-color: #dedede;
	-webkit-app-region: drag;
}
</style>