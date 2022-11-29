<template>
	<div id="login">
		<el-form ref="loginForm" class="login-form" autocomplete="on" label-position="left">
			<div class="title-container">
				<h3 class="title">后台管理系统</h3>
			</div>

			<el-form-item prop="username">
				<span class="icon-container">
					<i class="iconfont icon-yonghu"></i>
				</span>
				<el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"
					tabindex="1" autocomplete="on" />
			</el-form-item>

			<el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
				<el-form-item prop="password">
					<span class="icon-container">
						<i class="iconfont icon-mima1"></i>
					</span>
					<el-input :type="isShowPwd ? 'text' : 'password'" ref="password" v-model="loginForm.password"
						placeholder="请输入密码" name="password" tabindex="2" autocomplete="on" />
					<span class="show-pwd" @click="isShowPwd = !isShowPwd">
						<i :class="isShowPwd ? 'iconfont icon-eye' : 'iconfont icon-no_eye'"></i>
					</span>
				</el-form-item>
			</el-tooltip>

			<el-button :loading="isLoading" type="primary" style="width: 100%; margin-bottom: 30px"
				@click.native="handleLogin" @keyup.enter.native="handleLogin">登录</el-button>
			<el-link :underline="false" class="noAccount" @click="createAccount">还没账号?去创建一个吧</el-link>
		</el-form>
	</div>
</template>

<script>
import auth from "@/api/login/auth";
import timeline from '@/utils/timeline'

export default {
	name: "Login",
	data() {
		return {
			loginForm: {
				username: "",
				password: "",
			},
			isShowPwd: false,
			capsTooltip: false,
			isLoading: false,
		};
	},
	methods: {
		// 登录
		async handleLogin() {
			const username = this.$refs.username.value.trim();
			const password = this.$refs.password.value.trim();
			if (!username && !password) {
				this.$message({
					showClose: true,
					message: "用户名与密码不能为空",
					type: "error",
				});
			} else if (username && password) {
				const { data } = await auth({
					method: "POST",
					url: "/login",
					data: {
						username,
						password,
					},
				});
				if (data.ok) {
					this.$message({
						showClose: true,
						message: "登录成功",
						type: "success",
					});
					this.$router.replace({
						path: "/user/index",
					});
				} else {
					this.$message({
						type: "error",
						message: "登录失败，请检查用户名密码是否正确",
					});
				}
			} else if (!username) {
				this.$message({
					showClose: true,
					message: "用户名不能为空",
					type: "error",
				});
			} else if (!password) {
				this.$message({
					showClose: true,
					message: "密码不能为空",
					type: "error",
				});
			}
		},
		// 创建账户
		createAccount() {
			this.$router.push({
				path: "/registry",
			});
		},
	},
	mounted() {
		if (this.loginForm.username === "") {
			this.$refs.username.focus();
		} else if (this.loginForm.password === "") {
			this.$refs.password.focus();
		}
	},
	async beforeRouteLeave(to, from, next) {
		if (to.name == "index") {
			localStorage.setItem('username', this.loginForm.username)
			const record = {
				operator: this.loginForm.username,
				message: "登录了后台管理系统",
				time: `${this.$moment(Date.now()).format("YYYY/MM/DD")} ${this.$moment(
					Date.now()
				).format("HH : mm : ss")}`,
			};
			const { data } = await timeline({
				method: 'POST',
				url: '/timeline',
				data: {
					username: this.loginForm.username,
					timeline: record
				}
			})
			if(!data.ok) {
				this.$message({
					type: 'error',
					message: 'Invalid Error'
				})
			}
		}
		next();
	},
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
#login {
	.el-input {
		display: inline-block;
		height: 47px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		color: #454545;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

#login {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100%;
	width: 100%;
	background-color: $bg;
	overflow: hidden;

	.login-form {
		position: relative;
		width: 520px;
		max-width: 100%;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.icon-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}

	.thirdparty-button {
		position: absolute;
		right: 0;
		bottom: 6px;
	}

	.noAccount {
		float: right;
	}

	@media only screen and (max-width: 470px) {
		.thirdparty-button {
			display: none;
		}
	}
}
</style>