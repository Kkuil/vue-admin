<template>
	<div id="tab">
		<div class="tabs">
			<div class="tab">
				<Basic />
			</div>
			<div class="tab">
				<HoverMoving />
			</div>
			<div class="tab">
				<Square />
			</div>
			<div class="tab">
				<NavTab />
			</div>
			<div class="tab">
				<HoverFoldable />
			</div>
			<div class="tab">
				<CircleTab />
			</div>
		</div>
	</div>
</template>

<script>
import Basic from '@/views/user/components/Tab/components/Basic'
import HoverMoving from '@/views/user/components/Tab/components/HoverMoving'
import Square from '@/views/user/components/Tab/components/Square'
import NavTab from '@/views/user/components/Tab/components/NavTab'
import HoverFoldable from '@/views/user/components/Tab/components/HoverFoldable'
import CircleTab from '@/views/user/components/Tab/components/CircleTab'
export default {
	name: "Tab",
	components: {
		Basic,
		HoverMoving,
		Square,
		NavTab,
		HoverFoldable,
		CircleTab
	}
};
</script>

<style scoped lang="scss">
#tab {
	width: 100%;
	height: 100%;

	.tabs {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		.tab {
			width: 400px;
			height: 300px;
			padding: 20px;
			border-radius: 25px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}
	}
}
</style>