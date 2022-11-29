<template>
	<div class="today_weather" :style="'background-color: ' + wea_bgc">
		<div v-if="weatherInfo" class="weather">
			<div class="info">
				<span class="area">今日{{ weatherInfo.cityName }}</span>
				<span class="temp">{{ weatherInfo.temp }}°C</span>
				<span class="text">{{ weatherInfo.text }}</span>
				<span class="wind_direction">风向{{ weatherInfo.windDir }}</span>
				<span class="wind_speed">风速{{ weatherInfo.windSpeed }}</span>
				<span class="vis">能见度{{ weatherInfo.vis }}</span>
				<span class="humidity">湿度{{ weatherInfo.humidity }}</span>
				<i :class="`qi-${weatherInfo.icon}${dayOrNight}`"></i>
			</div>
			<div class="bg_icon">
				<div v-show="icon == 'rain'" class="rain">
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
					<i class="iconfont icon-yushui"></i>
				</div>
				<div v-show="icon == 'cloud'" class="cloud">
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
					<i class="iconfont icon-Cloud"></i>
				</div>
				<div v-show="icon == 'winter'" class="winter">
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
					<i class="iconfont icon-xuehua"></i>
				</div>
				<div v-show="icon == 'sand'" class="sand">
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
					<i class="iconfont icon-cq-sandiantu"></i>
				</div>
			</div>
		</div>
		<div v-else class="today_noLocated">
			<span class="tips">您还未定位哦！</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "Weather",
	data() {
		return {
			// 天气信息
			weatherInfo: {},
			icon: "rain",
			// dayOrNight
			dayOrNight:
				Number(this.$moment(Date.now()).format("H")) >= 18 ? "-fill" : "",
		};
	},
	methods: {
		getWeatherInfo() {
			// 获取天气信息
			const weatherInfo = this.$store.state.weather.weatherInfo
			if (weatherInfo) {
				this.weatherInfo = weatherInfo;
				// 取消显示定位中
				this.$bus.$emit("noLocated");
			}
		}
	},
	computed: {
		// 天气背景
		wea_bgc() {
			const iconNo = +this.weatherInfo.icon;
			if (
				(iconNo >= 100 && iconNo <= 104) ||
				(iconNo >= 150 && iconNo <= 153)
			) {
				this.icon = "cloud";
				return "rgba(0, 148, 255, 0.2)";
			} else if (iconNo >= 300 && iconNo <= 399) {
				this.icon = 'rain'
				return "rgba(15, 97, 219, 0.3)";
			} else if (iconNo >= 400 && iconNo <= 499) {
				this.icon = 'winter'
				return "rgba(246, 247, 226, 0.539)";
			}
			else if (
				(iconNo >= 500 && iconNo <= 502) ||
				(iconNo >= 509 && iconNo <= 515)
			) {
				this.icon = 'sand'
				return "rgba(239, 245, 244, 0.539)";
			}
			else if (iconNo >= 503 && iconNo <= 508)
				return "rgba(235, 188, 86, 0.539)";
			else if (iconNo >= 800 && iconNo <= 807) return "rgba(0, 89, 255, 0.539)";
			else if (iconNo == 900) return "rgba(255, 115, 0, 0.539)";
			else if (iconNo == 901) return "rgba(0, 145, 255, 0.539)";
			else return "rgba(0, 255, 251, 0.539)";
		},
	},
	mounted() {
		this.$bus.$on('getWeatherInfo', this.getWeatherInfo)
	},
};
</script>

<style scoped lang="scss">
.today_weather {
	position: relative;
	font-weight: bold;

	.weather {
		.info {
			[class^="qi"] {
				position: absolute;
				top: 20%;
				left: 10%;
				font-size: 8vw;
			}

			.area {
				position: absolute;
				top: 18%;
				left: 42%;
				font-size: 2vw;
			}

			.temp {
				position: absolute;
				top: 30%;
				left: 42%;
				font-size: 4vw;
			}

			.text {
				position: absolute;
				top: 35%;
				left: 80%;
				font-size: 2vw;
			}

			.wind_direction,
			.wind_speed {
				position: absolute;
				top: 60%;
				left: 42%;
				font-size: 1vw;
			}

			.wind_speed {
				top: 68%;
			}

			.vis,
			.humidity {
				position: absolute;
				top: 60%;
				left: 70%;
				font-size: 1vw;
			}

			.humidity {
				top: 68%;
			}
		}

		.bg_icon {
			position: relative;

			i {
				position: absolute;
				font-size: 2vw;
				color: rgba(190, 187, 187, 0.3);
			}

			i:nth-child(1) {
				top: 30px;
				left: 20%;
				animation: drop_down1 2s;

				@keyframes drop_down1 {
					0% {
						top: -50px;
					}

					100% {
						top: 30px;
					}
				}
			}

			i:nth-child(2) {
				top: 60px;
				left: 36%;
				animation: drop_down2 2s;

				@keyframes drop_down2 {
					0% {
						top: -50px;
					}

					100% {
						top: 60px;
					}
				}
			}

			i:nth-child(3) {
				top: 100px;
				left: 46%;
				animation: drop_down3 2s;

				@keyframes drop_down3 {
					0% {
						top: -50px;
					}

					100% {
						top: 100px;
					}
				}
			}

			i:nth-child(4) {
				top: 70px;
				left: 59%;
				animation: drop_down4 2s;

				@keyframes drop_down4 {
					0% {
						top: -50px;
					}

					100% {
						top: 70px;
					}
				}
			}

			i:nth-child(5) {
				top: 30px;
				left: 69%;
				animation: drop_down5 2s;

				@keyframes drop_down5 {
					0% {
						top: -50px;
					}

					100% {
						top: 30px;
					}
				}
			}

			i:nth-child(6) {
				top: 150px;
				left: 76%;
				animation: drop_down6 2s;

				@keyframes drop_down6 {
					0% {
						top: -50px;
					}

					100% {
						top: 150px;
					}
				}
			}

			i:nth-child(7) {
				top: 86px;
				left: 80%;
				animation: drop_down7 2s;

				@keyframes drop_down7 {
					0% {
						top: -50px;
					}

					100% {
						top: 86px;
					}
				}
			}

			i:nth-child(8) {
				top: 150px;
				left: 90%;
				animation: drop_down8 2s;

				@keyframes drop_down8 {
					0% {
						top: -50px;
					}

					100% {
						top: 150px;
					}
				}
			}
		}
	}

	.today_noLocated {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.tips {
			font-size: 3vw;
			font-weight: bold;
		}
	}
}
</style>