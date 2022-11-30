<template>
	<div class="today_news">
		<div class="yaowen">
			<span class="title">今日要闻</span>
		</div>
		<div class="news">
			<el-collapse v-if="newsInfos.length" v-model="activeNames">
				<el-collapse-item
					v-for="newsInfo in newsInfos"
					:key="newsInfo.cid"
					:title="newsInfo.title"
					:name="newsInfo.cid"
				>
					<div class="digest">
						<div
							v-show="newsInfo.imgsrc"
							class="appendImg"
							:style="`background-image: url(${newsInfo.imgsrc});`"
							:title="newsInfo.title"
						></div>
						<span>{{ newsInfo.digest }}</span>
					</div>
					<span class="source">来源：{{ newsInfo.source }}</span>
				</el-collapse-item>
			</el-collapse>
			<div v-else class="empty">
				<span class="tips">今日暂无要闻</span>
			</div>
		</div>
	</div>
</template>

<script>
import getNews from "@/api/news/getNews";
export default {
	name: "News",
	data() {
		return {
			newsInfos: [],
			activeNames: [],
		};
	},
	async mounted() {
		const {
			data: { T1467284926140 },
		} = await getNews({
			method: "GET",
			url: `http://localhost:${this.$port}/getNews`,
		});
		this.newsInfos = T1467284926140;
	},
};
</script>

<style scoped lang="scss">
.today_news {
	padding: 0 15px;
	overflow: hidden;
	.yaowen {
		width: 100%;
		height: 15%;
		padding-top: 7px;
		.title {
			font-size: 13px;
			font-weight: bold;
			color: rgba(12, 157, 241, 0.671);
		}
	}
	.news {
		position: relative;
		width: calc(100% + 30px);
		height: 100%;
		overflow: auto;
		.digest {
			padding-right: 5px;
			display: flex;
			justify-content: space-between;
			.appendImg {
				width: 100%;
				height: 120px;
				margin-right: 5px;
				overflow: hidden;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: 0 0;
			}
		}
		.source {
			display: flex;
			justify-content: flex-end;
			margin-right: 5px;
			font-size: 12px;
			color: #ccc;
		}
		.empty {
			.tips {
				font-size: 12px;
				color: #ccc;
			}
		}
	}
}
</style>