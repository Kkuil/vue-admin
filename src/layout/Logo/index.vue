<template>
	<el-switch
		v-model="tips"
		active-color="#0094ff"
		inactive-color="#ccc"
		active-value="Show"
		inactive-value="Hide"
		@change="showLogo"
	>
	</el-switch>
</template>

<script>
export default {
	name: "Logo",
	data() {
		return {
			tips: "Show",
		};
	},
	methods: {
		showLogo(isShowLogo) {
			this.$bus.$emit('isShowLogo', isShowLogo == 'Show')
		},
	},
};
</script>

<style scoped lang="scss">
</style>