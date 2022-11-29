<template>
	<div id="Novel_buttons">
		<div class="title">
			<h2>Novel Button</h2>
			<span>These are novel button components.</span>
		</div>
		<div class="buttons">
			<div class="icon_button">
				<div class="title">
					<h3>Icon Button</h3>
				</div>
				<IconButton />
			</div>
			<div class="colorful_button">
				<div class="title">
					<h3>Colorful Button</h3>
				</div>
				<ColorfulButton />
			</div>
			<div class="confirm_button">
				<div class="title">
					<h3>Confirm Button</h3>
				</div>
				<ConfirmButton />
			</div>
		</div>
	</div>
</template>
    
<script>
import IconButton from "@/EncapComponents/Buttons/components/NovelButtons/components/IconButton";
import ColorfulButton from "@/EncapComponents/Buttons/components/NovelButtons/components/ColorfulButton";
import ConfirmButton from "@/EncapComponents/Buttons/components/NovelButtons/components/ConfirmButton";
export default {
	name: "NovelButtons",
	components: {
		IconButton,
		ColorfulButton,
		ConfirmButton,
	},
};
</script>

<style scoped lang="scss">
#Novel_buttons {
	width: 100%;
	height: 100%;
	> .title {
		position: relative;
		height: 50px;
		margin: 0;
		padding: 12px 0 0 10px;
		border-bottom: 1px solid #eee;
		display: flex;
		&:hover {
			> span {
				opacity: 1;
				left: 170px;
			}
		}
		> h2 {
			margin: 0;
			background-color: #fff;
		}
		> span {
			opacity: 0;
			position: absolute;
			left: 0px;
			bottom: 10px;
			font-size: 15px;
			color: #777;
			transition: all 0.3s;
		}
	}
	.buttons {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		> div {
			flex: 260px;
			height: 200px;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-direction: column;
			.title {
				margin-bottom: 10px;
				h3 {
					margin: 0;
				}
			}
		}
		.icon_button {
			background-color: #179fc196;
		}
		.colorful_button {
			color: #fff;
			background-color: #000;
		}
		.confirm_button {
			color: #fff;
			background-color: rgb(103, 53, 221);
		}
	}
}
</style>