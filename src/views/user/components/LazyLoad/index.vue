<template>
	<div id="lazy_load">
		<div class="title">
			<i class="iconfont icon-loading"></i>
			<h2>LazyLoad</h2>
			<i class="iconfont icon-refresh" @click="refresh" title="refresh"></i>
		</div>
		<div class="lazy_loading" v-loading.lock="isRefresh"  :style="`column-count: ${column_count};`">
			<div  v-lazy-container="{ selector: 'img' }" class="img" v-for="(src, index) in imgs" :key="index">
				<img :data-src="src" :title="src" />
			</div>
		</div>
	</div>
</template>

<script>
import lazy from "@/api/lazy/lazy";
export default {
	name: "LazyLoad",
	data() {
		return {
			isLock: false,
			remainTime: 0,
			isRefresh: false,
			imgs: [],
			column_count: 6
		};
	},
	methods: {
		async refresh() {
			if (!this.isLock) {
				this.isLock = true;
				this.remainTime = 3;
				this.isRefresh = true;
				const { data: { imgs } } = await lazy({
					method: 'GET',
					url: '/lazy'
				})
				this.imgs = imgs
				setTimeout(() => {
					this.isRefresh = false;
				}, 500);
				setTimeout(() => {
					this.isLock = false;
					clearInterval(this.timer);
				}, 3000);
			} else {
				this.$notify({
					type: "warning",
					title: "点击过快",
					message: `请${this.remainTime}秒后再试`,
				});
			}
		},
	},
	watch: {
		isLock(bool) {
			if (bool) {
				this.timer = setInterval(() => this.remainTime--, 1000);
			}
		},
	},
	async mounted() {
		const { data: { imgs } } = await lazy({
			method: "GET",
			url: "/lazy",
		});
		this.imgs = imgs;
		// 监听尺寸变化
		this.$bus.$on('lazy', count => {
			this.column_count = count
		})
	},
};
</script>

<style scoped lang="scss">
#lazy_load {
	width: 100%;
	height: auto !important;
	padding: 20px 5px 0 !important;
	.title {
		position: relative;
		width: 100%;
		height: 80px;
		display: flex;
		border-top: 3px solid #0094ff;
		border-bottom: 3px solid #0094ff;
		border-left: 2px solid #eee;
		border-right: 2px solid #eee;
		align-items: center;
		.icon-loading {
			font-size: 25px;
			margin: 0 8px;
		}
		.icon-refresh {
			cursor: pointer;
			position: absolute;
			font-size: 25px;
			top: 50%;
			right: 2%;
			transform: translateY(-50%);
			transition: all 0.3s;
			&:hover {
				color: #0094ff;
			}
		}
	}
	.lazy_loading {
		width: 100%;
		height: auto;
		padding: 10px;
		column-gap: 10px;
		border-left: 2px solid #eee;
		border-right: 2px solid #eee;
		border-bottom: 2px solid #eee;
	}
}
</style>