<template>
	<div id="table">
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
	name: "Table",
};
</script>

<style scoped lang="scss">
#table {
	width: 100%;
	height: 100%;
}
</style>