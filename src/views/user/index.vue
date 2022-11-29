<template>
	<el-container id="user">
		<el-aside>
			<!-- 侧边栏 -->
			<SideBar />
		</el-aside>
		<el-container>
			<el-header>
				<!-- 菜单栏 -->
				<TopMenu :userInfo="userInfo" />
			</el-header>
			<el-main :style="'background-color:' + rgbaColor + ';'">
				<!-- 导航栏 -->
				<BreadCrumb />
				<transition name="route" appear enter-active-class="animated fadeInLeft"
					leave-active-class="animated fadeOutRight" duration="700">
					<div class="main_content">
						<keep-alive>
							<router-view></router-view>
						</keep-alive>
					</div>
				</transition>
			</el-main>
			<Drawer />
		</el-container>
		<WelcomeMask :name="userInfo.username" />
	</el-container>
</template>
<script>
import authToken from "@/utils/authToken";

import WelcomeMask from "@/components/WelcomeMask/index";
import SideBar from "@/components/SideBar/index";
import TopMenu from "@/components/TopMenu/index";
import BreadCrumb from "@/components/BreadCrumb/index";
import Drawer from "@/layout/index";
import weather from '@/store/modules/weather';
export default {
	name: "user",
	data() {
		return {
			userInfo: {},
			locationInfo: {},
			rgbaColor: "#fff",
		};
	},
	components: {
		SideBar,
		TopMenu,
		BreadCrumb,
		Drawer,
		WelcomeMask,
	},
	methods: {
		updateWeather() {
			const locationTime = localStorage.getItem('locationTime')
			const weatherInfo = localStorage.getItem('weatherInfo')
			const now = Date.now()
			if (locationTime && +locationTime - now >= 60 * 1000 * 60 * 2) {
				localStorage.setItem('locationTime', now)
				if (weatherInfo) {
					const { lng, lat } = JSON.parse(weatherInfo)
					this.$store.dispatch('weather/location', { lng, lat, self: this })
					setTimeout(() => {
						this.$bus.$emit('getWeatherInfo')
					}, 800)
				}
			} else {
				this.$store.commit('weather/saveWeatherInfo', JSON.parse(weatherInfo))
				this.$bus.$emit('getWeatherInfo')
			}
		}
	},
	watch: {
		$route: {
			immediate: true,
			deep: true,
			async handler(route) {
				window.document.title = 'vue-' + route.name
				// validate
				const auth = localStorage.getItem("auth");
				if (!auth) {
					this.$message({
						type: "error",
						showClose: true,
						message: "您还未登录",
						onClose: () => {
							this.$router.replace({
								path: "/login",
							});
						},
					});
				} else {
					// 验证token
					debugger;
					const { data } = await authToken();
					if (!data.ok) {
						this.$message({
							type: "error",
							showClose: true,
							message: "登录信息已过期，请重新登录",
							onClose: () => {
								this.$router.replace({
									path: "/login",
								});
							},
						});
					} else {
						this.userInfo = data.userInfo;
						this.$bus.$emit('userInfo', data.userInfo)
						// 记录操作记录
						const record = {
							operator: data.userInfo.username,
							message: `查看了${route.name}的信息`,
							time: `${this.$moment(Date.now()).format(
								"YYYY/MM/DD"
							)} ${this.$moment(Date.now()).format("HH : mm : ss")}`,
						};
						this.$store.commit("timeline/ADDRECORD", record);
						// 本地存储
						const origin = localStorage.getItem("records");
						if (origin) {
							const oriRecords = JSON.parse(origin);
							const nowRecords = JSON.stringify([...oriRecords, record]);
							localStorage.setItem("records", nowRecords);
						} else {
							const striRecord = JSON.stringify([record]);
							localStorage.setItem("records", striRecord);
						}
					}
				}
			},
		},
	},
	mounted() {
		// changeTheme
		this.$bus.$on("changeTheme", (rgbaColor) => {
			this.rgbaColor = rgbaColor;
		});
		// 监听浏览器屏幕变化
		window.onresize = () => {
			const scrWid = document.documentElement.clientWidth;
			this.$bus.$emit("isCollapseCenter", scrWid <= 800);
			this.$bus.$emit("isCollapseSideBar", scrWid <= 800);
			this.$bus.$emit(
				"lazy",
				scrWid <= 600
					? 1
					: scrWid <= 800
						? 2
						: scrWid <= 1120
							? 3
							: scrWid <= 1340
								? 4
								: scrWid <= 1500
									? 5
									: 6
			);
		};
		// 重新获取最新天气信息
		this.updateWeather()
	},
};
</script>

<style scoped lang="scss">
#user {
	position: relative;
	height: 100%;
	overflow: hidden;

	.el-header {
		width: auto;
		text-align: center;
		padding: 0;
		height: 57px !important;
		transition: all 0.3s;
	}

	.el-aside {
		width: auto !important;
		max-width: 185px !important;
		height: 100%;
		padding: 0;
		color: #333;
		text-align: center;
		background-color: rgba(243, 250, 252, 0.3);
	}

	.el-main {
		padding: 0px;
		transition: all 0.3s;
		width: calc(100% + 16px);
		overflow-x: hidden;

		.main_content {
			padding: 20px 25px 0;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
			margin-left: -50px;
		}

		100% {
			opacity: 1;
			margin-left: 0;
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
			margin-left: 0;
		}

		100% {
			opacity: 0;
			margin-left: 50px;
		}
	}

	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}

	background-color: rgba(243, 250, 252, 0.3);
}
</style>