<template>
	<div id="components">
		<transition
			name="compRoute"
			appear
			enter-active-class="animated fadeInLeft"
			leave-active-class="animated fadeOutRight"
			duration="800"
		>
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
export default {
	name: "Components",
};
</script>

<style scoped lang="scss">
#components {
	width: 100%;
	height: 100%;
}
</style>