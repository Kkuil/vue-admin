<template>
	<div id="drawer">
		<div class="openDrawer" @click="drawer = !drawer">
			<i class="el-icon-arrow-left"></i>
		</div>
		<div class="drawer">
			<el-drawer
				title="Page Setting"
				:visible.sync="drawer"
				:with-header="true"
				:show-close="false"
				size="300px"
			>
				<div class="content">
					<div id="change_theme">
						<i class="iconfont icon-clothes"></i>
						<span class="words">Theme</span>
						<ChangeTheme />
					</div>
					<div id="logo">
						<i class="iconfont icon-logo-vimeo"></i>
						<span class="words">Logo</span>
						<Logo />
					</div>
					<div id="nav">
						<i class="iconfont icon-nav"></i>
						<span class="words">NavBar</span>
						<NavBar />
					</div>
				</div>
				<a target="_blank" href="https://github.com/PanJiaChen" class="thanks">
					<i class="iconfont icon-github-fill"></i>
					<span>鸣谢github作者PanJiaChen</span>
				</a>
			</el-drawer>
		</div>
	</div>
</template>

<script>
import ChangeTheme from "@/layout/ChangeTheme/index";
import Logo from "@/layout/Logo/index";
import NavBar from "@/layout/NavBar/index";

export default {
	name: "drawer",
	components: {
		ChangeTheme,
		Logo,
		NavBar,
	},
	data() {
		return {
			drawer: false,
			rgbaColor: "#fff",
		};
	},
};
</script>

<style scoped lang="scss">
#drawer {
	z-index: 9999;
	.openDrawer {
		cursor: pointer;
		position: fixed;
		right: 0;
		top: 50%;
		width: 20px;
		height: 60px;
		font-size: 20px;
		background-color: #0094ff;
		border-top-left-radius: 15px;
		border-bottom-left-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s;
		&:hover {
			background-color: rgba(0, 147, 251, 0.8);
		}
	}
	.drawer {
		position: relative;
		.content {
			> div {
				padding-left: 20px;
				height: 40px;
				display: flex;
				font-size: 15px;
				justify-content: flex-start;
				align-items: center;
				i {
					margin-right: 5px;
				}
				.words {
					margin-right: 5px;
				}
			}
		}
		.thanks {
			cursor: pointer;
			position: absolute;
			display: block;
			bottom: 0;
			width: 100%;
			height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			color: #ccc;
			transition: all 0.3s;
			&:hover {
				color: #0094ff;
			}
			i {
				font-size: 50px;
			}
			span {
				font-size: 15px;
				a:hover {
					color: #2e9eee;
				}
			}
		}
	}
}
</style>