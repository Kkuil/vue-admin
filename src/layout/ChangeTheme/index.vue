<template>
	<el-color-picker 
    v-model="color" 
    show-alpha :predefine="predefineColors"
    size="mini"
    @active-change="active_change"
	class="changeTheme"
    >
	</el-color-picker>
</template>
<script>
export default {
    name: 'ChangeTheme',
	data() {
		return {
			color: "rgba(255, 69, 0, 0.68)",
			predefineColors: [
                "#0094ff",
				"#ff4500",
				"#ff8c00",
				"#ffd700",
				"#90ee90",
				"#00ced1",
				"#1e90ff",
				"#c71585"
			],
		};
	},
    methods: {
        active_change(rgbaColor) {
            this.$bus.$emit('changeTheme', rgbaColor)
        }
    }
};
</script>

<style lang="scss">
.changeTheme {
	z-index: 99999;
}
</style>
