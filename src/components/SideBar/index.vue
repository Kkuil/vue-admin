<template>
	<div id="sidebar" @scroll="isShowInfo = false">
		<el-menu :style="'background-color:' + rgbaColor + ';'" default-active="1-4-1" class="el-menu-vertical-demo"
			:collapse="isCollapse">
			<transition name="logo" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
				<el-menu-item v-if="isShowLogo" :style="'background-color:' + rgbaColor + ';'" class="logo"
					@click="isShowInfo = true">
					<i class="iconfont icon-logo-vimeo"></i>
					<span slot="title">vue-admin</span>
				</el-menu-item>
			</transition>
			<el-menu-item :style="`${isLocation && isShowLogo && !isCollapse && isShowInfo
			? 'top: 55px;'
			: ''
			}`" id="located">
				<transition name="located" enter-active-class="animated fadeInUp"
					leave-active-class="animated fadeOutDown">
					<div v-if="isLocation" id="location">
						<svg class="icon">
							<use xlink:href="#icon-ico_location"></use>
						</svg>
						<div v-if="!locating" class="tipWords">
							<span>
								<span>您还未定位，</span>
							</span>
							<a @click="located">去定位吧！</a>
						</div>
					</div>
				</transition>
			</el-menu-item>
			<el-menu-item :style="`${isShowLogo && !isCollapse && isShowInfo ? 'top: 0;' : ''}`" id="curTime"
				@click="isShowInfo = false">
				{{ curTime }}
			</el-menu-item>
			<el-menu-item :class="currentRoute == 'index' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 0, route: 'index' })" index="1">
				<i class="el-icon-discover"></i>
				<span slot="title">Index</span>
			</el-menu-item>
			<el-menu-item :class="
				currentRoute == 'documentation' ? 'is-active active' : 'clear_color'
			" @click="changeRoute({ index: 1, route: 'documentation' })" index="2">
				<i class="el-icon-folder"></i>
				<span slot="title">Documentation</span>
			</el-menu-item>
			<el-menu-item :class="currentRoute == 'guide' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 2, route: 'guide' })" index="3">
				<i class="el-icon-position"></i>
				<span slot="title">Guide</span>
			</el-menu-item>
			<el-menu-item :class="
				currentRoute == 'permission' ? 'is-active active' : 'clear_color'
			" @click="changeRoute({ index: 3, route: 'permission' })" index="4">
				<i class="el-icon-lock"></i>
				<span slot="title">Permission</span>
			</el-menu-item>
			<el-menu-item :class="currentRoute == 'icons' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 4, route: 'icons' })" index="5">
				<i class="el-icon-platform-eleme"></i>
				<span slot="title">Icons</span>
			</el-menu-item>
			<el-submenu index="1">
				<div slot="title" :style="`width: 100%; ${isCollapse
				? ''
				: 'display: flex; justify-content: flex-start; align-items: center;'
				}`">
					<i class="el-icon-folder-opened" style="margin-top: 3px"></i>
					<span>Components</span>
				</div>
				<el-menu-item :class="currentRoute == 'button' ? 'is-active active' : 'clear_color'"
					@click="changeRoute({ index: 17, route: 'button' })" index="1-1-1">Button</el-menu-item>
				<el-menu-item :class="currentRoute == 'drag' ? 'is-active active' : 'clear_color'"
					@click="changeRoute({ index: 18, route: 'drag' })" index="1-2-1">Drag</el-menu-item>
			</el-submenu>
			<el-submenu index="2">
				<div slot="title" :style="`width: 100%; ${isCollapse
				? ''
				: 'display: flex; justify-content: flex-start; align-items: center;'
				}`">
					<i class="el-icon-setting" style="margin-top: 3px"></i>
					<span>Charts</span>
				</div>
				<el-menu-item :class="
					currentRoute == 'echarts3D' ? 'is-active active' : 'clear_color'
				" @click="changeRoute({ index: 6, route: 'echarts3D' })" index="2-1-1">Echarts3D</el-menu-item>
				<el-menu-item :class="
					currentRoute == 'echartsBar' ? 'is-active active' : 'clear_color'
				" @click="changeRoute({ index: 7, route: 'echartsBar' })" index="2-2-1">EchartsBar</el-menu-item>
			</el-submenu>
			<el-menu-item :class="currentRoute == 'timeline' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 8, route: 'timeline' })" index="8">
				<i class="el-icon-s-operation"></i>
				<span slot="title">Timeline</span>
			</el-menu-item>
			<el-submenu index="3">
				<div slot="title" :style="`width: 100%; ${isCollapse
				? ''
				: 'display: flex; justify-content: flex-start; align-items: center;'
				}`">
					<i class="el-icon-notebook-2" style="margin-top: 3px"></i>
					<span>Table</span>
				</div>
				<el-menu-item :class="
					currentRoute == 'dragTable' ? 'is-active active' : 'clear_color'
				" @click="changeRoute({ index: 20, route: 'dragTable' })" index="3-1-1">DragTable</el-menu-item>
				<el-menu-item :class="
					currentRoute == 'complexTable' ? 'is-active active' : 'clear_color'
				" @click="changeRoute({ index: 21, route: 'complexTable' })" index="3-2-1">ComplexTable</el-menu-item>
			</el-submenu>
			<el-menu-item :class="currentRoute == 'example' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 10, route: 'example' })" index="10">
				<i class="el-icon-coffee"></i>
				<span slot="title">Example</span>
			</el-menu-item>
			<el-menu-item :class="currentRoute == 'tab' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 11, route: 'tab' })" index="11">
				<i class="el-icon-copy-document"></i>
				<span slot="title">Tab</span>
			</el-menu-item>
			<el-submenu index="4">
				<div slot="title" :style="`width: 100%; ${isCollapse
				? ''
				: 'display: flex; justify-content: flex-start; align-items: center;'
				}`">
					<i class="el-icon-document-copy" style="margin-top: 3px"></i>
					<span>Editor</span>
				</div>
				<el-menu-item :class="
					currentRoute == 'richText' ? 'is-active active' : 'clear_color'
				" @click="changeRoute({ index: 12, route: 'richText' })" index="4-1-1">Rich Text</el-menu-item>
				<el-menu-item :class="currentRoute == 'markdown' ? 'is-active active' : 'clear_color'"
					@click="changeRoute({ index: 26, route: 'markdown' })" index="4-2-1">MarkDown</el-menu-item>
				<el-menu-item :class="currentRoute == 'jsonEditor' ? 'is-active active' : 'clear_color'"
					@click="changeRoute({ index: 27, route: 'jsonEditor' })" index="4-2-1">JsonEditor</el-menu-item>
			</el-submenu>
			<el-menu-item :class="currentRoute == 'lazyLoad' ? 'is-active active' : 'clear_color'"
				@click="changeRoute({ index: 13, route: 'lazyLoad' })" index="13">
				<i class="el-icon-refresh-left"></i>
				<span slot="title">Lazy Load</span>
			</el-menu-item>
			<el-menu-item :class="
				currentRoute == 'exportZip' ? 'is-active active' : 'clear_color'
			" @click="changeRoute({ index: 14, route: 'exportZip' })" index="14">
				<i class="el-icon-c-scale-to-original"></i>
				<span slot="title">Export Zip</span>
			</el-menu-item>
			<el-menu-item :class="
				currentRoute == 'changeTheme' ? 'is-active active' : 'clear_color'
			" @click="changeRoute({ index: 15, route: 'changeTheme' })" index="15">
				<i class="el-icon-s-open"></i>
				<span slot="title">Change Theme</span>
			</el-menu-item>
			<el-menu-item :class="
				currentRoute == 'clipboard' ? 'is-active active' : 'clear_color'
			" @click="changeRoute({ index: 16, route: 'clipboard' })" index="16">
				<i class="el-icon-s-claim"></i>
				<span slot="title">Clipboard</span>
			</el-menu-item>
			<el-submenu index="5">
				<div slot="title" :style="`width: 100%; ${isCollapse
				? ''
				: 'display: flex; justify-content: flex-start; align-items: center;'
				}`">
					<i class="el-icon-magic-stick" style="margin-top: 3px"></i>
					<span>Particle</span>
				</div>
				<el-menu-item :class="
					currentRoute == 'dragClick' ? 'is-active active' : 'clear_color'
				" @click="changeRoute({ index: 24, route: 'dragClick' })" index="5-1-1">DragClick</el-menu-item>
				<el-menu-item :class="currentRoute == 'rays' ? 'is-active active' : 'clear_color'"
					@click="changeRoute({ index: 25, route: 'rays' })" index="5-2-1">Rays</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: "SideBar",
	data() {
		return {
			// 定时器
			timer: "",
			// 当前时间
			curTime: this.$moment(Date.now()).format("HH : mm : ss"),
			currentRoute: "index",
			// 折叠
			isCollapse: false,
			// Logo
			isShowLogo: true,
			// 信息
			isShowInfo: true,
			// 主题颜色
			rgbaColor: "#fff",
			// 定位
			isLocation: false,
			// 定位中
			locating: false,
		};
	},
	methods: {
		// 改变路由
		changeRoute({ index, route }) {
			this.currentRoute = route;
			this.$router.push({
				name: route,
			});
			this.$store.dispatch("breadcrumb/findBreadcrumb", { index, route });
		},
		// 定位
		located() {
			// 改变路由
			this.$router.push({
				path: "/user/guide",
			});
		},
	},
	watch: {
		$route: {
			deep: true,
			handler(newRoute) {
				const route = newRoute.name;
				this.currentRoute = route;
			},
		},
	},
	mounted() {
		// 当前index
		const route = this.$route.name;
		this.currentRoute = route;
		// collapse
		this.$bus.$on("collapse", (isCollapse) => {
			this.isCollapse = isCollapse;
		});
		// logo show or hide
		this.$bus.$on("isShowLogo", (isShowLogo) => {
			this.isShowLogo = isShowLogo;
		});
		// changeTheme
		this.$bus.$on("changeTheme", (rgbaColor) => {
			this.rgbaColor = rgbaColor;
		});
		this.timer = setInterval(() => {
			this.curTime = this.$moment(Date.now()).format("HH : mm : ss");
		}, 1000);
		// 判断是否需要定位
		if (localStorage.getItem("weatherInfo")) this.isLocation = false;
		else this.isLocation = true;
		// 取消显示定位
		this.$bus.$on("noLocated", () => {
			this.isLocation = false;
		});
		// 是否处于定位中
		this.$bus.$on("locating", ({ locating, code, message }) => {
			const type = code == 2 ? "info" : code == 1 ? "success" : "error";
			this.$message({
				type,
				message,
			});
			this.locating = locating;
		});
		// 监听屏幕变化
		this.$bus.$on("isCollapseSideBar", (isCollapse) => {
			this.isCollapse = isCollapse;
		});
	},
	beforeDestroy() {
		// 清除定时器
		clearInterval(this.timer);
	},
};
</script>

<style scoped lang="scss">
#sidebar {
	width: 100%;
	height: 100%;
	overflow-x: hidden;
	border-right: 1px solid rgba(215, 229, 243, 0.1);

	.el-menu-vertical-demo {
		height: 100%;
		width: calc(100% + 18px);
		overflow-y: scroll;
		overflow-x: hidden;
		transition: all 0.3s;

		.el-menu-item {
			position: relative;
			width: 100%;
			font-weight: 600;
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}

		.el-submenu {
			position: relative;
			font-weight: 600;
			margin: 0;

			.el-menu-item {
				background-color: rgba(245, 250, 252, 0.705);

				&:hover {
					color: #fff;
					background-color: #89b9dbb0;
				}
			}
		}

		.active {
			background-color: rgba(105, 169, 233, 0.482);
			border-right: 3px solid #55abe8;
		}

		.clear_color {
			color: #000;
		}

		.logo {
			cursor: pointer;
			z-index: 3;
			position: sticky;
			top: 0;
			left: -260px;
			background-color: #fff;
			font-size: 15px;
			box-shadow: 0 0 15px 5px rgba(65, 100, 135, 0.1);
			display: block;

			.icon-logo-vimeo {
				color: #0094ff;
				font-size: 25px;
				margin-right: 7px;
			}

			span {
				font-weight: bold;
			}
		}

		#located {
			padding: 0 !important;
			transition: all 0.3s;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			align-items: center;
			z-index: 2;
			position: absolute;
			top: -300px;
			left: 0;
			width: 100%;
			height: 270px;
			background-color: rgb(145, 192, 214);

			>#location,
			>#whether {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
				height: 100%;
			}

			#location {
				justify-content: center;

				.icon {
					position: absolute;
					top: 10px;
					left: 50%;
					transform: translateX(-50%);
					width: 100px;
					height: 100px;
					transition: all 2s;
					animation: location 1s ease-in-out infinite alternate;
				}

				.tipWords {
					margin-top: 60px;
				}

				@keyframes location {
					0% {
						top: 30px;
					}

					100% {
						top: 50px;
					}
				}
			}
		}

		#curTime {
			transition: all 0.3s;
			z-index: 9;
			position: absolute;
			top: -65px;
			left: 0px;
			width: 100%;
			height: 56px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30px;
			color: #fff;
			background-color: rgb(101, 150, 185);
		}
	}
}
</style>