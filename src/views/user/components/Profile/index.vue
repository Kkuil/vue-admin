<template>
	<div id="profile">
		<div class="avatar" :style="`background: url(${userInfo.index_bgi})`" title="check preview image">
			<!-- tags -->
			<div class="border-bottom"></div>
			<!-- 头像信息 -->
			<div class="avatar_info">
				<!-- 头像 -->
				<PreviewAvatar v-show="isPreview" :image="{ 'src': userInfo.avatar, 'title': userInfo.username }">
					<div slot="close">
						<i class="iconfont icon-fault" @click="isPreview = false"></i>
					</div>
				</PreviewAvatar>
				<div class="avatar_img" @click="isPreview = true" :style="`background: url(${userInfo.avatar})`"
					title="check preview image">
				</div>
				<!-- 用户名 -->
				<div class="username">
					<h2>{{ userInfo.username }}</h2>
				</div>
				<!-- 身份 -->
				<el-tag class="role" type="danger">{{ userInfo.role }}</el-tag>
				<!-- 年龄 -->
				<div class="age">
					<span>{{ userInfo.age }}岁</span>
				</div>
				<!-- 星座 -->
				<el-tag class="constellation">{{ constellation }}</el-tag>
				<!-- 个性签名 -->
				<div class="characteristic">
					<input type="text" class="chaInput" placeholder="留下点什么吧..." @blur="saveComments"
						:value="userInfo.comments" />
				</div>
				<!-- 标签信息 -->
				<div class="tags">
					<el-tag :key="tag" v-for="tag in tags" closable :disable-transitions="false"
						@close="handleClose(tag)">
						{{ tag }}
					</el-tag>
					<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput"
						size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
					</el-input>
					<el-button v-show="isShowAdd" v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签
					</el-button>
					<div class="confirmTags">
						<el-button type="primary" icon="el-icon-check" circle @click="dialogVisible = true"></el-button>
						<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
							<span>是否更新个性标签</span>
							<span slot="footer" class="dialog-footer">
								<el-button @click="confirmUpdate">是</el-button>
								<el-button type="primary" @click="cancelUpdate">否</el-button>
							</span>
						</el-dialog>
					</div>
				</div>
			</div>
			<div class="change_bgi">
				<el-upload class="upload-demo" action="http://127.0.0.1:3000/bgi" :limit="1" list-typ="picture"
					:auto-upload="false" :on-change="upload" :on-exceed="handleExceed" :show-file-list="false">
					<el-button size="small" type="primary">
						<i class="iconfont icon-refresh"></i>
					</el-button>
				</el-upload>
			</div>
		</div>
		<div class="main_content">
			<!-- tabs -->
			<div class="tabs">
				<div class="main_page" @click="changeRoute('mainPage')"
					:class="`${$route.name == 'mainPage' ? 'active' : ''}`">
					<i class="iconfont icon-zhuye"></i>
					<span>主页</span>
				</div>
				<div class="image_wall" @click="changeRoute('imageWall')"
					:class="`${$route.name == 'imageWall' ? 'active' : ''}`">
					<i class="iconfont icon-zhaopianqiang"></i>
					<span>照片墙</span>
				</div>
				<div class="setting" @click="changeRoute('setting')"
					:class="`${$route.name == 'setting' ? 'active' : ''}`">
					<i class="iconfont icon-setting-fill"></i>
					<span>设置</span>
				</div>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import postTags from "@/api/tags/tags";
import postComments from "@/api/comments/comments";
import postBgi from "@/api/bgi/bgi";
import PreviewAvatar from '@/EncapComponents/PreviewAvatar'
export default {
	name: "Profile",
	data() {
		return {
			userInfo: {},
			tags: [],
			inputVisible: false,
			inputValue: "",
			isShowAdd: true,
			dialogVisible: false,
			isPreview: false
		};
	},
	components: {
		PreviewAvatar
	},
	methods: {
		handleClose(tag) {
			const index = this.tags.indexOf(tag);
			this.tags.splice(index, 1);
			this.$nextTick(async function () {
				const { username, tags } = this.userInfo;
				const { data } = await postTags({
					method: "POST",
					url: "/updateInfo",
					data: {
						username,
						tags,
					},
				});
				this.$message({
					type: data.ok ? "success" : "error",
					message: data.ok ? "删除成功" : "删除失败",
				});
			});
		},

		showInput() {
			this.inputVisible = true;
			this.$nextTick((_) => {
				this.$refs.saveTagInput.$refs.input.focus();
			});
		},

		handleInputConfirm() {
			let inputValue = this.inputValue.trim();
			if (inputValue) {
				if (this.tags.includes(inputValue)) {
					this.$message({
						type: "error",
						message: "请不要重复添加标签",
					});
				} else {
					this.tags.push(inputValue);
				}
			}
			this.inputVisible = false;
			this.inputValue = "";
		},
		// 切换路由
		changeRoute(route) {
			this.$router.push({
				name: route,
			});
		},
		cancelUpdate() {
			this.dialogVisible = false;
			this.$message({
				type: "success",
				message: "取消成功",
			});
		},
		// 更新标签
		async confirmUpdate() {
			if (this.tags.length) {
				const { username, tags } = this.userInfo;
				const { data } = await postTags({
					method: "POST",
					url: "/updateInfo",
					data: {
						username,
						tags,
					},
				});
				if (data.ok) {
					this.$message({
						type: "success",
						message: "修改成功",
					});
				}
				this.dialogVisible = false;
			}
		},
		// 更新留言
		async saveComments(e) {
			const { username } = this.userInfo;
			const { data } = await postComments({
				method: "POST",
				url: "/updateInfo",
				data: {
					username,
					comments: e.target.value,
				},
			});
			this.$message({
				type: data.ok ? "success" : "error",
				message: data.ok ? "修改留言成功" : "修改留言失败",
			});
		},
		async upload(file) {
			const bgi = file.raw;
			const type = bgi.type.slice(6);
			const data = new FormData();
			const filename = `${this.userInfo.username}.${type == "jpeg" ? "jpg" : "png"
				}`;
			data.append("index_bgi", bgi, filename);
			// 更新服务器图库
			const data1 = await postBgi({
				method: "POST",
				url: "/bgi",
				data,
			});
			// 更新数据库图片地址
			const data2 = await postBgi({
				method: "POST",
				url: "/updateInfo",
				data: {
					username: this.userInfo.username,
					index_bgi: `http://127.0.0.1:3000/index_bgi/${filename}`,
				},
			});
			this.$nextTick(function () {
				this.userInfo.index_bgi = `http://127.0.0.1:3000/index_bgi/${filename}`;
			});
		},
		handleExceed() {
			this.$notify({
				title: "Number exceed",
				message: "Uploading a picture is only available.",
			});
		},
	},
	computed: {
		constellation() {
			// 月份
			const month = this.userInfo.birthday.slice(5, 7);
			// 天数
			const day = +this.userInfo.birthday.slice(9);
			switch (month) {
				case "01":
					if (day > 19) {
						return "水瓶座";
					} else return "摩羯座";
					break;
				case "02":
					if (day > 18) {
						return "双鱼座";
					} else return "水瓶座";
					break;
				case "03":
					if (day > 20) {
						return "白羊座";
					} else return "双鱼座";
					break;
				case "04":
					if (day > 19) {
						return "金牛座";
					} else return "白羊座";
					break;
				case "05":
					if (day > 20) {
						return "双子座";
					} else return "金牛座";
					break;
				case "06":
					if (day > 21) {
						return "巨蟹座";
					} else return "双子座";
					break;
				case "07":
					if (day > 22) {
						return "狮子座";
					} else return "巨蟹座";
					break;
				case "08":
					if (day > 22) {
						return "处女座";
					} else return "狮子座";
					break;
				case "09":
					if (day > 22) {
						return "天秤座";
					} else return "处女座";
					break;
				case "10":
					if (day > 23) {
						return "天蝎座";
					} else return "天秤座";
					break;
				case "11":
					if (day > 20) {
						return "射手座";
					} else return "天蝎座";
					break;
				case "12":
					if (day > 21) {
						return "摩羯座";
					} else return "射手座";
					break;
			}
		},
	},
	watch: {
		tags: {
			immediate: true,
			handler(tags) {
				if (tags.length == 5) this.isShowAdd = false;
				else this.isShowAdd = true;
			},
		},
	},
	mounted() {
		this.$bus.$on("userInfo", (userInfo) => {
			this.userInfo = userInfo;
			this.tags = userInfo.tags;
		});
	},
};
</script>

<style scoped lang="scss">
#profile {
	width: 100%;
	height: 100%;
	background-color: #eee;
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

	.avatar {
		position: relative;
		width: 100%;
		height: 50%;
		background-color: #0094ff;
		background-size: cover !important;
		background-position: center !important;
		background-repeat: no-repeat !important;
		transition: all .3s;

		.border-bottom {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 45px;
			padding: 7px 0 0 160px;
			background-color: #fff;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		}

		.avatar_info {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 150px;

			.avatar_img {
				cursor: pointer;
				width: 140px;
				height: 140px;
				margin: 5px;
				border-radius: 50%;
				overflow: hidden !important;
				background-size: contain !important;
				background-position: center !important;
				background-repeat: no-repeat !important;
			}

			.username {
				position: absolute;
				top: 8%;
				left: 160px;
				color: #fff;
				text-shadow: #ccc;
			}

			.role,
			.constellation,
			.age {
				cursor: default;
				position: absolute;
				top: 26%;
				left: 235px;
				width: auto;
				height: 15px;
				font-size: 8px;
				line-height: 15px;
				color: #0094ff;
				border: 1px solid #eee;
			}

			.age {
				top: 42%;
				left: 160px;
				color: #fff;
				font-weight: bold;
				border: 0;
				font-size: 16px;
			}

			.constellation {
				top: 42%;
				left: 200px;
			}

			.characteristic {
				position: absolute;
				top: 55%;
				left: 160px;
				width: auto;
				height: auto;

				.chaInput {
					border: 1px solid rgb(53, 53, 53);
					border-radius: 3px;
					outline: none;
					background-color: transparent;
					color: #eee;
					font-size: 8px;
					padding-left: 5px;
					transition: all 0.3s;

					&:focus {
						color: #000;
						border-color: #eee;
						background-color: #fff;
					}
				}
			}

			.tags {
				position: absolute;
				bottom: 0;
				left: 0;
				display: flex;
				align-items: center;
				width: 100%;
				height: 45px;
				padding-left: 150px;

				.el-tag {
					margin-top: 7;
					margin-left: 10px;
				}

				.button-new-tag {
					margin-left: 10px;
					height: 30px;
					line-height: 30px;
					padding-top: 0;
					padding-bottom: 0;
				}

				.input-new-tag {
					width: 90px;
					margin-left: 10px;
					vertical-align: bottom;
				}

				.confirmTags {
					margin-left: 5px;
				}
			}
		}

		.change_bgi {
			position: absolute;
			top: 8px;
			right: 8px;
			width: auto;
			height: auto;

			.el-button--primary {
				width: 45px;
				height: 45px;
				border-radius: 50%;
				border: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #0095ff52;

				i {
					cursor: pointer;
					font-size: 25px;
					color: rgba(255, 255, 255, 0.489);
					transition: all 0.3s;

					&:hover {
						color: #fff;
					}
				}
			}
		}
	}

	.main_content {
		width: 100%;
		height: 70%;
		margin-top: 15px;
		background-color: #fff;

		.tabs {
			width: auto;
			height: 10%;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #eee;

			>div {
				cursor: pointer;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100px;
				height: 100%;
				transition: all 0.3s;

				i {
					font-size: 15px;
					margin-right: 3px;
				}

				&:hover {
					color: #0095ff6f;
				}
			}

			.active {
				border-bottom: 3px solid #0094ff;
				color: #0094ff;
			}
		}

		.content {
			width: 100%;
			height: 90%;
		}
	}
}
</style>