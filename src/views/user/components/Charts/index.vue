<template>
	<div id="charts">
		<transition
			name="charts"
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
	name: "Charts",
};
</script>

<style scoped lang="scss">
#charts {
	width: 85%;
	height: 100%;
}
</style>