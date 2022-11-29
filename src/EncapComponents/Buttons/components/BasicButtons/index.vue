<template>
	<div id="basic_buttons">
		<div class="title">
			<h2>Basic Button</h2>
			<span>This component 'BasicButton' is a simple,you can deliver three parameters(type / size / text)</span>
		</div>
		<div class="buttons">
			<div class="primary">
				<div class="title">
					<h3>Primary</h3>
				</div>
				<BasicButton type="primary" text="Primary" />
			</div>
			<div class="default">
				<div class="title">
					<h3>Default</h3>
				</div>
				<BasicButton type="default" text="Default" />
			</div>
			<div class="correct">
				<div class="title">
					<h3>Correct</h3>
				</div>
				<BasicButton type="correct" text="Correct" />
			</div>
			<div class="error">
				<div class="title">
					<h3>Error</h3>
				</div>
				<BasicButton type="error" text="Error" />
			</div>
			<div class="magic">
				<div class="title">
					<h3>Magic</h3>
				</div>
				<BasicButton type="magic" text="Magic" />
			</div>
		</div>
	</div>
</template>

<script>
import BasicButton from "@/EncapComponents/Buttons/components/BasicButtons/BasicButton";
export default {
	name: "BasicButtons",
	components: {
		BasicButton,
	},
};
</script>

<style scoped lang="scss">
#basic_buttons {
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
            transition: all .3s;
        }
	}
	.buttons {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		padding: 50px 0;
		> div {
			flex: 260px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			.title {
				margin-bottom: 10px;
				h3 {
					margin: 0;
				}
			}
		}
	}
}
</style>