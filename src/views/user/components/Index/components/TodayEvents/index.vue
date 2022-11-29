<template>
	<div id="events">
		<div class="unfinished_events">
			<div class="title">
				<i class="icon iconfont icon-weiwancheng"></i>
				<span>未完成事项</span>
			</div>
			<div class="search">
				<i class="iconfont icon-sousuo"></i>
				<input
					v-model="unfinished_value"
					type="text"
					placeholder="请输入你想搜索的内容"
				/>
			</div>
			<div class="events">
				<div v-if="events.unfinished_events.length" class="events_item">
					<ul>
						<transition-group
							enter-active-class="animated fadeInRight"
							leave-active-class="animated fadeOutRight"
							name="event"
						>
							<li
								v-for="(event, index) in search_unfinished"
								:key="event.value"
							>
								<span>{{ event.value }}</span>
								<div class="mark-icon">
									<i
										class="iconfont icon-star"
										title="重要"
										@click="cherished(index, event)"
									></i>
									<i
										class="iconfont icon-duigou1"
										title="已完成"
										@click="finished(index, event)"
									></i>
									<i
										class="iconfont icon-fault"
										title="删除"
										@click="delEvent(index, 0)"
									></i>
								</div>
							</li>
						</transition-group>
					</ul>
				</div>
				<div v-else class="tips">
					<i class="iconfont icon-duigou1"></i>
					<span>今日待办事项已全部完成</span>
				</div>
			</div>
			<transition-group
				enter-active-class="animated fadeInUp"
				leave-active-class="animated fadeOutDown"
				name="addEvent"
			>
				<div v-show="!isFull" class="add_events" key="add">
					<input
						type="text"
						placeholder="请输入你想添加的事项"
						ref="unfinished_event"
					/>
					<button
						class="add"
						@click="addUnfinishedEvent"
						@keyup.enter="addUnfinishedEvent"
					>
						添加
					</button>
				</div>
				<div v-show="isFull" class="full" key="full">
					今日可添加的待办事项已上限
				</div>
			</transition-group>
		</div>
		<div class="important_events">
			<div class="title">
				<i class="iconfont icon-important"></i>
				<span>重要待办事项</span>
			</div>
			<div class="search">
				<i class="iconfont icon-sousuo"></i>
				<input
					v-model="important_value"
					type="text"
					placeholder="请输入你想搜索的内容"
				/>
			</div>
			<div class="events">
				<div v-if="events.important_events.length" class="events_item">
					<ul>
						<transition-group
							enter-active-class="animated fadeInRight"
							leave-active-class="animated fadeOutRight"
							name="event"
						>
							<li
								v-for="event in search_important"
								:key="event.value"
							>
								<span>{{ event.value }}</span>
								<div class="mark-icon">
									<i
										class="iconfont icon-star"
										title="重要"
										@click="cherished(index, event)"
										style="color: #ffd500"
									></i>
									<i
										class="iconfont icon-fault"
										title="删除"
										@click="delEvent(index, 1)"
									></i>
								</div>
							</li>
						</transition-group>
					</ul>
				</div>
				<div v-else class="tips">
					<i class="iconfont icon-emptybox"></i>
					<span>今日暂无重要事件</span>
				</div>
			</div>
		</div>
		<div class="finished_events">
			<div class="title">
				<i class="iconfont icon-yiwancheng"></i>
				<span>已完成事项</span>
			</div>
			<div class="search">
				<i class="iconfont icon-sousuo"></i>
				<input
					v-model="finished_value"
					type="text"
					placeholder="请输入你想搜索的内容"
				/>
			</div>
			<div class="events">
				<div v-if="events.finished_events.length" class="events_item">
					<ul>
						<transition-group
							enter-active-class="animated fadeInRight"
							leave-active-class="animated fadeOutRight"
							name="event"
						>
							<li
								v-for="event in search_finished"
								:key="event.value"
							>
								<span>{{ event.value }}</span>
								<div class="mark-icon">
									<i
										class="iconfont icon-duigou1"
										title="已完成"
										@click="finished(index, event)"
										style="color: #2bff00"
									></i>
									<i
										class="iconfont icon-fault"
										title="删除"
										@click="delEvent(index, 2)"
									></i>
								</div>
							</li>
						</transition-group>
					</ul>
				</div>
				<div v-else class="tips">
					<i class="iconfont icon-emptybox"></i>
					<span>今日还没有已完成事件，加油吧！</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import events from "@/api/events/events";
export default {
	name: "TodayEvents",
	data() {
		return {
			username: "",
			events: {
				unfinished_events: [],
				important_events: [],
				finished_events: [],
			},
			isFull: false,
			unfinished_value: "",
			important_value: "",
			finished_value: "",
		};
	},
	methods: {
		// 获取事件
		async getEvents(username) {
			const {
				data: {
					events: { unfinished_events, important_events, finished_events },
				},
			} = await events({
				method: "GET",
				url: "/events",
				params: {
					username,
				},
			});
			this.events = {
				unfinished_events,
				important_events,
				finished_events,
			};
		},
		async updateEvents(event) {
			const { username } = this;
			const { data } = await events({
				method: "POST",
				url: "/events",
				data: {
					username,
					...event,
				},
			});
			this.$message({
				type: data.status == 200 ? "success" : "error",
				message: data.message,
			});
		},
		// 添加待办事件
		addUnfinishedEvent() {
			const {
				events: { unfinished_events },
			} = this;
			const value = this.$refs.unfinished_event.value.trim();
			if (value) {
				if (unfinished_events.includes(value)) {
					this.$message({
						type: "error",
						message: "Duplicate",
					});
					return;
				} else {
					const event = {
						value,
						cherished: false,
						finished: false,
					};
					unfinished_events.push(event);
					this.$nextTick(function () {
						this.updateEvents({ unfinished_events });
					});
				}
			} else {
				this.$notify({
					type: "warning",
					title: "警告",
					message: "添加的的待办事件不能为空",
				});
			}
			this.$refs.unfinished_event.value = "";
			this.isFull = unfinished_events.length == 10;
		},
		// 删除待办事件
		delEvent(index, signal) {
			const {
				events: { unfinished_events, important_events, finished_events },
			} = this;
			if (signal == 0) {
				unfinished_events.splice(index, 1);
				this.$nextTick(function () {
					this.updateEvents({ unfinished_events });
				});
			} else if (signal == 1) {
				important_events.splice(index, 1);
				this.$nextTick(function () {
					this.updateEvents({ important_events });
				});
			} else {
				finished_events.splice(index, 1);
				this.$nextTick(function () {
					this.updateEvents({ finished_events });
				});
			}
		},
		// 标记重要事件
		cherished(index, event) {
			const {
				events: { unfinished_events, important_events },
			} = this;
			event.cherished = !event.cherished;
			if (!event.cherished) {
				important_events.splice(index, 1);
				unfinished_events.push(event);
			} else {
				unfinished_events.splice(index, 1);
				important_events.push(event);
			}
			this.$nextTick(function () {
				this.updateEvents({ unfinished_events, important_events });
			});
		},
		// 标记已完成事件
		finished(index, event) {
			const {
				events: { unfinished_events, finished_events },
			} = this;
			event.finished = !event.finished;
			if (!event.finished) {
				finished_events.splice(index, 1);
				unfinished_events.push(event);
			} else {
				unfinished_events.splice(index, 1);
				finished_events.push(event);
			}
			this.$nextTick(function () {
				this.updateEvents({ unfinished_events, finished_events });
			});
		},
	},
	computed: {
		search_unfinished() {
			return this.events.unfinished_events.filter(event => {
				return event.value.includes(this.unfinished_value)
			})
		},
		search_important() {
			return this.events.important_events.filter(event => {
				return event.value.includes(this.important_value)
			})
		},
		search_finished() {
			return this.events.finished_events.filter(event => {
				return event.value.includes(this.finished_value)
			})
		}
	},
	watch: {
		events: {
			deep: true,
			immediate: true,
			handler(event) {
				if (event.unfinished_events.length <= 10) this.isFull = false;
				else this.isFull = true;
			},
		},
	},
	mounted() {
		// 获取用户名
		this.username = localStorage.getItem('username')
	},
};
</script>

<style scoped lang="scss">
#events {
	width: 100%;
	height: 45%;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;
	> div {
		position: relative;
		height: 100%;
		border-radius: 10px;
		box-shadow: 0 0 10px 5px rgba(245, 234, 234, 0.6);
		animation: events 2s;
		@keyframes events {
			0% {
				height: 0;
			}
			100% {
				height: 100%;
			}
		}
		.title {
			width: 100%;
			height: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			vertical-align: middle;
			border-bottom: 1px solid #eee;
			.iconfont {
				margin-right: 0.5vw;
			}
			.icon-weiwancheng {
				color: #ccc;
			}
			.icon-important {
				color: #ffd500;
			}
			.icon-yiwancheng {
				color: #2bff00;
			}
			span {
				margin-top: 1px;
				font-size: 1vw;
			}
		}
		.search {
			width: 100%;
			height: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 7px 0px;
			border-bottom: 1px solid #eee;
			i {
				font-size: 1.2vw;
				margin-right: 5px;
				color: #ccc;
			}
			input {
				width: 80%;
				height: 2vw;
				border: 1px solid #ccc;
				outline: 0;
				border-radius: 15px;
				padding-left: 0.5vw;
				font-size: 1vw;
				color: #ccc;
				transition: all 0.3s;
				&:focus {
					border: 1px solid #0094ff;
					color: #000;
				}
			}
		}
		.events {
			width: 100%;
			height: 55%;
			overflow: hidden;
			.events_item {
				width: 100%;
				height: 100%;
				ul {
					width: calc(100% + 15px);
					height: 100%;
					padding: 0;
					margin: 0;
					overflow-y: auto;
					overflow-x: hidden;
					li {
						display: flex;
						justify-content: space-between;
						align-items: center;
						width: 100%;
						height: 20%;
						padding: 0 10px;
						list-style: none;
						font-size: 1vw;
						border-bottom: 1px solid #eee;
						transition: all 0.1s;
						.mark-icon {
							display: none;
							margin-right: 10px;
							i {
								cursor: pointer !important;
								font-size: 1vw;
								color: #ccc;
							}
							.icon-star {
								margin-right: 5px;
								&:hover {
									color: #ffd500;
								}
							}
							.icon-duigou1 {
								margin-right: 5px;
								&:hover {
									color: #2bff00;
								}
							}
							.icon-fault {
								font-weight: bold;
								&:hover {
									color: red;
								}
							}
						}
						&:hover {
							background-color: #0095ff63;
							.mark-icon {
								display: block;
								i {
									color: #fff;
								}
							}
						}
					}
				}
			}
			.tips {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				color: rgb(214, 212, 212);
				font-size: 1vw;
				i {
					font-size: 3vw;
				}
			}
		}
		.add_events,
		.full {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 15%;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 7px 0px;
			border-top: 1px solid #eee;
			color: #ccc;
			input {
				cursor: text;
				width: 60%;
				height: 2vw;
				border: 1px solid #ccc;
				outline: 0;
				padding-left: 0.5vw;
				font-size: 1vw;
				color: #ccc;
				transition: all 0.3s;
				border-radius: 5px;
				&:focus {
					border: 1px solid #0094ff;
					color: #000;
				}
			}
			.add {
				width: 20%;
				height: 2vw;
				border-radius: 5px;
				border: 1px solid #ccc;
				font-size: 1vw;
				margin-left: 5px;
				transition: all 0.3s;
				background-color: #0094ff;
				&:hover {
					border: 1px solid #0094ff;
					color: #fff;
				}
			}
		}
	}
	.important_events {
		margin: 0 20px;
	}
	.unfinished_events {
		flex: 30%;
	}
	.important_events {
		flex: 40%;
	}
	.finished_events {
		flex: 30%;
	}
}
</style>