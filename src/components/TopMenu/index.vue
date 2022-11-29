<template>
	<div id="TopMenu" :style="'background-color:' + rgbaColor + ';'">
		<div class="fold" @click="isFold">
			<i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
		</div>
		<h2 class="title">
			{{ $route.name }}
		</h2>
		<Center :userInfo="userInfo" />
	</div>
</template>

<script>
import Center from '@/components/TopMenu/components/Center'
export default {
	name: "TopMenu",
	props: ["userInfo"],
	components: {
		Center
	},
	data() {
		return {
			isCollapse: false,
			rgbaColor: "#fff",
		};
	},
	methods: {
		// 折叠导航栏
		isFold() {
			this.isCollapse = !this.isCollapse;
			this.$bus.$emit("collapse", this.isCollapse);
		},
	},
	mounted() {
		// changeTheme
		this.$bus.$on("changeTheme", (rgbaColor) => {
			this.rgbaColor = rgbaColor;
		});
	},
};
</script>

<style scoped lang="scss">
#TopMenu {
	position: relative;
	height: 57px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15px;
	border-bottom: 1px solid rgba(102, 145, 188, 0.1);

	.fold {
		cursor: pointer;

		[class^="el-icon-s"] {
			font-size: 22px;
		}
	}

	.title {
		position: absolute;
		top: 10%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		line-height: 20px;
		color: #0094ff;
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	}
}
</style>