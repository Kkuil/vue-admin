<template>
	<transition
		name="mask"
		appear
		enter-active-class="animated fadeIn"
		leave-active-class="animated fadeOut"
		duration="1500"
	>
		<div v-if="isShowWelcome" id="mask">
			<svg :class="`icon ${iconClass}`">
				<use :xlink:href="icon" />
			</svg>
			<h1>{{ name }}，{{ timeSection }}</h1>
			<h1>{{ sentence }}</h1>
		</div>
	</transition>
</template>

<script>
export default {
	name: "WelcomeMask",
	props: ["name"],
	data() {
		return {
			isShowWelcome: true,
			curDateTime: this.$moment(Date.now()).format("YYYY年MM月DD日 HH:mm:ss"),
			curTime: Number(this.$moment(Date.now()).format("H")),
			icon: "",
			iconClass: "",
		};
	},
	methods: {
		closeWelcome() {
			setTimeout(() => {
				this.isShowWelcome = false;
			}, 2000);
		},
		// 时间段图标
		getIcon() {
			if (this.curTime <= 6) return "#icon-tq_04duoyun";
			else if (this.curTime < 12) return "#icon-Sunny";
			else if (this.curTime == 12) return "#icon-Rice";
			else if (this.curTime <= 18) return "#icon-mbefengge_kafei";
			else if (this.curTime <= 21) return "#icon-yewan";
			else return "#icon-shuijue";
		},
	},
	computed: {
		// 时间段问候语
		timeSection() {
			const curTime = this.curTime;
			return curTime <= 7
				? "早上好"
				: curTime < 12
				? "上午好"
				: curTime == 12
				? "中午好"
				: curTime <= 18
				? "下午好"
				: curTime <= 21
				? "晚上好"
				: "深夜了";
		},
		// 时间段语句
		sentence() {
			const curTime = this.curTime;
			return curTime <= 7
				? "一年之计在于晨，业精于勤荒于嬉"
				: curTime < 12
				? "今天依旧光芒万丈呀"
				: curTime == 12
				? "干饭人，干饭魂，干饭都是人上人"
				: curTime <= 13
				? "中午小睡，下午精神百倍"
				: curTime <= 18
				? "再坚持一下，今天的工作就快结束了"
				: curTime <= 21
				? "我们仰望同一片星空"
				: "早点歇息吧，打工人";
		},
	},
	mounted() {
		// 关闭
		this.closeWelcome();
		// 设置icon图标
		this.icon = this.getIcon();
		// 设置icon类
		this.iconClass = this.getIcon().slice(6);
	},
};
</script>

<style scoped lang="scss">
#mask {
	z-index: 9999;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	font-size: 25px;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgb(65, 62, 62, 0.3);
	.icon {
		position: absolute;
		top: 0;
		left: 42%;
		width: 250px;
		height: 250px;
	}
	.Sunny {
		transform-origin: center;
		animation: Sunny 1.5s ease-in-out alternate infinite;
	}
	.tq_04duoyun {
		animation: icon 1.5s ease-in-out alternate infinite;
	}
	.Rice {
		animation: icon 1.5s ease-in-out alternate infinite;
	}
	.mbefengge_kafei {
		animation: icon 1.5s ease-in-out alternate infinite;
	}
	.yewan {
		animation: icon 1.5s ease-in-out alternate infinite;
	}
	.shuijue {
		animation: icon 1.5s ease-in-out alternate infinite;
	}
}
@keyframes cord {
	0% {
		transform: translateY(-100%);
	}
	100% {
		transform: translateY(0);
	}
}
@keyframes Sunny {
	0% {
		transform: translateY(-100%) rotate(0deg);
	}
	100% {
		transform: translateY(200px) rotate(360deg);
	}
}
@keyframes icon {
	0% {
		transform: translateY(-100%);
	}
	100% {
		transform: translateY(200px);
	}
}
</style>