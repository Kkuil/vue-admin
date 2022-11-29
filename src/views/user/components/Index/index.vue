<template>
	<transition
		name="index"
		enter-active-class="animated fadeInDown"
		leave-active-class="animated fadeOutRight"
	>
		<div id="index">
			<!-- 今日信息 -->
			<div class="todays">
				<Weather />
				<Recommend />
				<News />
			</div>
			<!-- 今日待办事项 -->
			<TodayEvents />
		</div>
	</transition>
</template>

<script>
import Weather from "@/views/user/components/Index/components/Weather";
import Recommend from "@/views/user/components/Index/components/Recommend";
import News from "@/views/user/components/Index/components/News";
import TodayEvents from "@/views/user/components/Index/components/TodayEvents";
export default {
	name: "Index",
	components: {
		Weather,
		Recommend,
		News,
		TodayEvents,
	},
};
</script>

<style scoped lang="scss">
#index {
	width: 100%;
	height: 100%;
	.todays {
		width: 100%;
		height: 35%;
		display: flex;
		justify-content: space-between;
		align-content: center;
		> div[class^="today_"] {
			flex: 1;
			box-shadow: 0 0 10px 5px #eee;
			border-radius: 10px;
			overflow: hidden;
			transition: all 0.3s;
			animation: today 2s;
			@keyframes today {
				0% {
					height: 0px;
				}
				100% {
					height: 100%;
				}
			}
			&:hover {
				box-shadow: 0 0 20px 5px #eee;
			}
		}
	}
}
</style>