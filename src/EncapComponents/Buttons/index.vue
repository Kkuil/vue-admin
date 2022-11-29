<template>
	<div id="buttons">
		<!-- Basic Buttons -->
		<div class="basic_buttons">
			<BasicButtons />
		</div>
		<!-- Novel Buttons -->
		<div class="novel_buttons">
			<NovelButtons />
		</div>
	</div>
</template>

<script>
import BasicButtons from "@/EncapComponents/Buttons/components/BasicButtons/index";
import NovelButtons from "@/EncapComponents/Buttons/components/NovelButtons/index";
export default {
	name: "Buttons",
	components: {
		BasicButtons,
		NovelButtons
	},
};
</script>

<style scoped lang="scss">
#buttons {
	width: 100%;
	height: 100%;
	> div {
		width: 100%;
		height: auto;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		overflow: hidden;
		margin: 10px 0;
	}
}
</style>