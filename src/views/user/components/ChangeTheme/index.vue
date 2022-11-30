<template>
	<div id="change_theme" :style="`background-color: ${theme_color};`">
		<div class="upper">
			<div class="card" v-for="i in 4" :key="i">
				<div class="bgi">
					<div class="backImg" :style="`background-image: url(${avatar});`"></div>
					<div class="avatar">
						<img :src="avatar" :title="username">
						<div>{{ username }}</div>
					</div>
					<div class="name">
						<span>{{ username }}</span>
						<div class="bar"></div>
					</div>
				</div>
				<div class="skills_info">
					<div class="html">
						<span>HTML</span>
						<el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
					</div>
					<div class="css">
						<span>CSS</span>
						<el-progress :text-inside="true" :stroke-width="20" :percentage="100" status="success">
						</el-progress>
					</div>
					<div class="js">
						<span>Javascript</span>
						<el-progress :text-inside="true" :stroke-width="20" :percentage="80" status="warning">
						</el-progress>
					</div>
					<div class="vue">
						<span>Vue</span>
						<el-progress :text-inside="true" :stroke-width="20" :percentage="50" status="exception">
						</el-progress>
					</div>
				</div>
			</div>
			<el-switch @change="changeColor" v-model="value" active-icon-class="iconfont icon-Daytimemode"
				inactive-icon-class="iconfont icon-Star-Night" active-color="#ffc0cb" inactive-color="#777">
			</el-switch>
		</div>

		<div class="wave">
			<svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path fill="#0094ff" fill-opacity="0.5"
					d="M0,128L30,133.3C60,139,120,149,180,144C240,139,300,117,360,96C420,75,480,53,540,80C600,107,660,181,720,176C780,171,840,85,900,80C960,75,1020,149,1080,181.3C1140,213,1200,203,1260,197.3C1320,192,1380,192,1410,192L1440,192L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z">
				</path>
			</svg>
		</div>
	</div>
</template>

<script>

export default {
	name: "ChangeTheme",
	data() {
		return {
			username: localStorage.getItem('username'),
			avatar: localStorage.getItem('avatar'),
			value: true,
			theme_color: '#fff'
		}
	},
	methods: {
		changeColor(value) {
			this.theme_color = value ? '#fff' : '#000'
		}
	}
};
</script>

<style scoped lang="scss">
#change_theme {
	cursor: pointer;
	width: 100%;
	height: 830px;
	border-radius: 30px;
	transition: all 1s ease;
	padding: 20px;
	box-shadow: 0 2px 6px 0 rgb(169, 165, 165);

	&:hover {
		box-shadow: 0 2px 30px 0 rgb(244, 197, 205);
	}

	.upper {
		position: relative;
		width: 100%;
		height: 450px;
		display: flex;
		align-items: center;

		.card {
			width: 250px;
			height: 450px;
			border-radius: 15px;
			transition: all 1s ease;
			background-color: #fff;
			overflow: hidden;
			margin-right: 25px;
			box-shadow: 0 2px 6px 0 rgb(169, 165, 165);

			&:hover {
				box-shadow: 0 2px 30px 0 rgb(244, 197, 205);
			}

			.bgi {
				position: relative;
				width: 100%;
				height: 50%;
				overflow: hidden;

				.backImg {
					z-index: 0;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-size: cover;
					background-position: center;
					transition: all .5s ease;

					&:hover {
						transform: scale(1.2);
					}
				}

				.avatar {
					z-index: 2;
					position: absolute;
					bottom: 0;
					left: 20px;
					width: 75px;
					height: 75px;
					border-radius: 50%;
					padding: 3px;
					background-color: #c9e4f7;

					&:hover img {
						transform: rotate(-60deg);
					}

					img {
						z-index: 1;
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						transition: all .3s ease;
						transform-origin: 0 0;

					}

					div {
						z-index: -1;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						width: 90%;
						height: 90%;
						border-radius: 50%;
						border: 2px dotted #000;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

				.name {
					position: absolute;
					bottom: 0;
					left: 0;
					width: 100%;
					height: 15%;
					padding-left: 100px;
					background-color: #c9e4f7;
					font-weight: bold;
					display: flex;
					align-items: center;

					span {
						color: #0094ff;
						position: relative;
						transition: all .3s ease;

						&:hover {
							color: rgb(109, 230, 29);
						}
					}

					&:hover .bar {
						animation: right 1.5s linear alternate-reverse;

						@keyframes right {
							to {
								right: -100%;
								background-color: rgb(109, 230, 29);
							}
						}
					}
					
					.bar {
						z-index: 2;
						display: block;
						position: absolute;
						top: 50%;
						left: -100%;
						transform: translateY(-50%);
						width: 100%;
						height: 10px;
						transition: right .1s ease;
						background-color: #0094ff;
					}
				}
			}

			.skills_info {
				padding: 10px;
				width: 100%;
				height: 50%;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				flex-direction: column;

				>div {
					flex: 25%;
					display: flex;
					justify-content: space-around;
					align-items: flex-start;
					flex-direction: column;

					span {
						width: 30px;
						margin-right: 5px;
						font-size: 13px;
					}

					.el-progress {
						width: 180px;
					}
				}
			}
		}

		.el-switch {
			position: absolute;
			top: 30px;
			right: 30px;
		}

	}

	.wave {
		width: 100%;
		height: 400px;

		.svg {
			width: 100%;
			height: 100%;
		}
	}
}
</style>