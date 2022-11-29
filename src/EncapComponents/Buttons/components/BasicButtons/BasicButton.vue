<template>
	<button :class="`${type} ${size}`">{{ text }}</button>
</template>

<script>
export default {
	name: "BasicButton",
	props: {
		type: {
			required: false,
			default: "primary",
			type: String,
		},
		text: {
			required: false,
			default: "Button",
			type: String,
		},
		size: {
			required: false,
			default: "normal",
			type: String,
		},
	},
};
</script>

<style scoped lang="scss">
button {
	position: relative;
	cursor: pointer;
	border-radius: 5px;
	border-width: 0;
	transition: all 0.3s;
	overflow: hidden;
	&::before,
	&::after {
		content: "";
		display: block;
		width: 100%;
		position: absolute;
	}
	&::before {
		top: 0;
		height: 4px;
		left: 100%;
	}
	&::after {
		bottom: 0;
		height: 2px;
		left: -100%;
	}
	&:hover {
		opacity: 0.8;
		border: 2px solid;
		background-color: #fff;
		&::before,
		&::after {
			animation: slideIn 0.3s forwards;
		}
		@keyframes slideIn {
			0% {
			}
			100% {
				left: 0;
			}
		}
	}
}
.normal {
	width: 80px;
	height: 35px;
	font-size: 15px;
}
.small {
	width: 100px;
	height: 60px;
	font-size: 15px;
}
.mini {
	width: 100px;
	height: 60px;
	font-size: 15px;
}
.primary {
	border-color: #70b2e182 !important;
	background-color: #0095ff82;
	&::before,
	&::after {
		background-color: #0095ff;
	}
}
.default {
	border-color: #bac5ce82 !important;
	background-color: #eee;
	&::before,
	&::after {
		background-color: #242526;
	}
}
.correct {
	border-color: #70e18c88 !important;
	background-color: #00ff7b82;
	&::before,
	&::after {
		background-color: #00ff95;
	}
}
.error {
	border-color: #e1877082 !important;
	background-color: #f1181882;
	&::before,
	&::after {
		background-color: #f3482a;
	}
}
.magic {
	border-color: #75b1dc82 !important;
	background-image: linear-gradient(
		to right,
		rgba(0, 255, 255, 0.386),
		rgba(0, 179, 255, 0.505)
	);
    &:hover {
        background-image: linear-gradient(
		to right,
		rgba(255, 255, 255, 0.386),
		rgba(255, 255, 255, 0.505)
	);
    }
	&::before,
	&::after {
		background-color: #38f5ef;
	}
}
</style>