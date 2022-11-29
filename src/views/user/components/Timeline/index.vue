<template>
	<div id="timeline">
		<div class="title">
			<i class="iconfont icon-record"></i>
			<h2>User Operation Record</h2>
			<i class="iconfont icon-refresh" @click="refresh" title="refresh"></i>
		</div>
		<div class="time_line" v-loading.lock="isRefresh">
			<el-timeline v-show="records.length">
				<el-timeline-item v-for="(record, index) in records" :key="index" :timestamp="record.time"
					placement="top">
					<el-card>
						<h4>{{ record.message }}</h4>
						<p>{{ record.operator }} 提交于 {{ record.time }}</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<div v-show="!records.length" class="no_records">
				<span>No Records</span>
			</div>
			<div v-show="needLoadCount" class="goLoad" ref="load" @click="goLoad">
				<i class="el-icon-caret-bottom"></i>
				<span>点击加载剩余日志</span>
			</div>
			<div v-show="isLoading" class="goLoad loading" ref="loading">
				<i class="el-icon-loading"></i>
				<span>加载中，请稍后</span>
			</div>
		</div>
	</div>
</template>

<script>
import timeline from '@/utils/timeline'
export default {
	name: "Timeline",
	data() {
		return {
			records: [],
			isRefresh: false,
			// 节流
			isLock: false,
			// 剩余时间
			remainTime: 0,
			// 计时器
			timer: "",
			// 是否需要加载
			isNeedLoad: false,
			// 总加载次数
			totalLoadCount: 0,
			// 需要加载次数
			needLoadCount: 0,
			// 是否处于加载中
			isLoading: false,
		};
	},
	methods: {
		// 刷新纪录
		async refresh() {
			if (!this.isLock) {
				this.isLock = true;
				this.remainTime = 3;
				this.isRefresh = true;
				const { data } = await timeline({
					method: 'GET',
					url: '/timeline',
					params: {
						username
					}
				})
				if (data.ok) this.records = data.timeline;
				setTimeout(() => {
					this.isRefresh = false;
				}, 1000);
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
		async goLoad() {
			this.isNeedLoad = false;
			this.isLoading = true;
			const { records, totalLoadCount, needLoadCount } = this;
			console.log(totalLoadCount - needLoadCount)
			const { data } = await timeline({
				method: 'GET',
				url: '/timeline',
				params: {
					username: localStorage.getItem('username'),
					pageNo: totalLoadCount - needLoadCount + 1
				}
			});
			console.log(data.timeline)
			records.push(...data.timeline);
			this.isNeedLoad = true;
			this.isLoading = false;
			this.$nextTick(function () {
				--this.needLoadCount ? "" : (this.isNeedLoad = false);
			});
		},
	},
	async mounted() {
		const { data } = await timeline({
			method: 'GET',
			url: '/timeline',
			params: {
				username: localStorage.getItem('username'),
				pageNo: 1,
			}
		})
		if (data.ok) {
			const records = data.timeline;
			if (data.sum_records > 10) {
				// 记录还要加载多少次
				this.needLoadCount = Math.ceil(data.sum_records / 10) - 1;
				// 总次数
				this.totalLoadCount = this.needLoadCount + 1;
				this.isNeedLoad = true;
			}
			this.records = records;
		}
	},
	watch: {
		isLock(bool) {
			if (bool) {
				this.timer = setInterval(() => this.remainTime--, 1000);
			}
		},
	},
};
</script>

<style scoped lang="scss">
#timeline {
	width: 100%;
	height: auto !important;
	margin-bottom: 20px !important;

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

		.icon-record {
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

	.time_line {
		position: relative;
		width: 100%;
		height: auto;
		padding: 30px;
		border-left: 2px solid #eee;
		border-right: 2px solid #eee;
		border-bottom: 2px solid #eee;

		.el-timeline {
			padding: 0;
		}

		.no_records {
			width: 100%;
			height: auto;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #ccc;
		}

		.goLoad {
			cursor: pointer;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 13px;
			color: #ccc;
			transition: all 0.3s;
			box-shadow: 0 3px 10px 5px #eee;
			background-color: #fff;

			i {
				margin-right: 10px;
			}

			&:hover {
				color: #0094ff;
			}
		}

		.loading {
			cursor: default;
			position: sticky;

			&:hover {
				color: #ccc;
			}
		}
	}
}
</style>