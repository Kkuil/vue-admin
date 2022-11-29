<template>
	<el-switch
		v-model="value"
		active-color="#0094ff"
		inactive-color="#ccc"
		active-value="Show"
		inactive-value="Hide"
		@change="showNav"
	>
	</el-switch>
</template>

<script>
export default {
	name: "NavBar",
	data() {
		return {
			value: 'Show',
		};
	},
	methods: {
		showNav(isShowNav) {
			this.$bus.$emit('isShowNav', isShowNav == 'Show')
		}
	}
};
</script>

<style scoped lang="scss">
</style>