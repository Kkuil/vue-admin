<template>
	<div class="box">
		<button id="colorful_button">ColorfulButton</button>
	</div>
</template>

<script>
export default {
	name: "ColorfulButton",
};
</script>

<style scoped lang="scss">
.box {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 146px;
	height: 56px;
	overflow: hidden;
	border-radius: 8px;
	&:hover {
		box-shadow: 0 0 10px 5px #eaa10ed9;
	}
	#colorful_button {
		cursor: pointer;
		z-index: 1;
		width: 140px;
		height: 50px;
		font-size: 15px;
		border-radius: 8px;
		border: 0;
		background-color: #000000;
		color: #fff;
		transition: all 0.3s;
		&:hover {
			box-shadow: 0 0 10px 5px #eaa10ed9;
		}
	}
	&::before {
		z-index: 0;
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		width: 200%;
		height: 200%;
		background-image: linear-gradient(
			to bottom right,
			rgba(32, 166, 196),
			rgba(27, 215, 186)
		);
		animation: infiniteRotate 1s linear infinite;
		transform-origin: top left;
		@keyframes infiniteRotate {
			to {
				transform: rotate(1turn);
			}
		}
	}
}
</style>