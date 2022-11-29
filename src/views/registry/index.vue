<template>
	<div id="registry">
		<h1 class="title">注册账号</h1>
		<el-form
			:model="regInfo"
			:rules="rules"
			ref="regInfo"
			label-width="100px"
			class="regForm"
		>
			<el-form-item label="用户ID:" prop="id" required>
				<el-input :value="regInfo.id" :disabled="true"></el-input>
			</el-form-item>
			<el-form-item label="用户名:" prop="username">
				<el-input
					v-model="regInfo.username"
					placeholder="请输入用户名"
				></el-input>
			</el-form-item>
			<el-form-item label="密码:" prop="firstPassword">
				<el-input
					type="password"
					v-model="regInfo.firstPassword"
					placeholder="请输入密码"
				></el-input>
			</el-form-item>
			<el-form-item label="验证密码:" prop="secondPassword">
				<el-input
					type="password"
					v-model="regInfo.secondPassword"
					placeholder="请再次输入密码"
				></el-input>
			</el-form-item>
			<el-form-item label="年龄:" prop="age">
				<el-input
					v-model.number="regInfo.age"
					autocomplete="off"
					placeholder="请输入年龄"
				></el-input>
			</el-form-item>
			<el-form-item label="性别:" prop="gender" class="gender">
				<el-select
					class="gender"
					v-model="regInfo.gender"
					placeholder="请选择性别"
					size="medium"
				>
					<el-option value="男">
						<span style="float: left">男</span>
						<span style="float: right; color: #8492a6; font-size: 13px"
							>Man</span
						>
					</el-option>
					<el-option value="女">
						<span style="float: left">女</span>
						<span style="float: right; color: #8492a6; font-size: 13px"
							>Female</span
						>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="电话号码:" prop="telephone">
				<el-input
					v-model="regInfo.telephone"
					maxlength="11"
					placeholder="请输入电话号码"
				></el-input>
			</el-form-item>
			<el-form-item label="生日:" prop="birthday">
				<div class="birthday">
					<el-date-picker
						type="date"
						value-format="yyyy/MM/dd"
						v-model="regInfo.birthday"
						placeholder="选择日期"
					>
					</el-date-picker>
				</div>
			</el-form-item>
			<el-upload
				v-show="isAllLegal"
				action="http://127.0.0.1:3000/registry"
				list-type="picture-card"
				:auto-upload="false"
				:limit="1"
				:on-change="upload"
				:on-exceed="picExceed"
			>
				<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
				<img width="100%" :src="regInfo.avatar" alt="" />
			</el-dialog>
		</el-form>
		<div class="regBtn">
			<el-button
				type="primary"
				:disabled="isAllLegal ? false : true"
				:loading="isLoading ? true : false"
				@click="createAccount"
				>{{ isLoading ? "加载中" : "注册" }}</el-button
			>
		</div>
		<!-- <input type="file" name="avatar" @change="handle"> -->
	</div>
</template>

<script>
// nanoid
import { nanoid } from "nanoid";
import registry from "@/api/registry/registry";

export default {
	name: "Registry",
	data() {
		return {
			regInfo: {
				id: nanoid(),
				username: "",
				firstPassword: "",
				secondPassword: "",
				telephone: "",
				age: "",
				gender: "",
				birthday: "",
				avatar: "",
			},
			rules: {
				username: [
					{ required: true, message: "用户名不能为空", trigger: "blur" },
					{ min: 6, max: 8, message: "用户名的长度为6-8字符", trigger: "blur" },
				],
				firstPassword: [
					{ required: true, message: "密码不能为空", trigger: "blur" },
					{ min: 6, max: "10", message: "密码最少为6个字符", trigger: "blur" },
				],
				secondPassword: [
					{ required: true, message: "两次密码输入不一致", trigger: "blur" },
					{ min: 6, max: "10", message: "密码最少为6个字符", trigger: "blur" },
				],
				age: [{ type: "number", message: "年龄必须为数字值", trigger: "blur" }],
				gender: [{ type: "String", message: "非法性别", trigger: "blur" }],
				telephone: [
					{ required: true, message: "手机号不能为空", trigger: "blur" },
					{ type: "", message: "手机号只能为数值型" },
					{ max: 11 },
				],
				birthday: [
					{ type: "date", message: "生日必须为数值型", trigger: "blur" },
				],
			},
			isLoading: false,
			isAllLegal: false,
			dialogVisible: false,
			imgData: ''
		};
	},
	methods: {
		// 创建用户成功回调
		async createAccount() {
			this.isLoading = true;
			const {
				id,
				username,
				firstPassword,
				secondPassword,
				telephone,
				age,
				gender,
				birthday,
				avatar,
			} = this.regInfo;
			const data1 = await registry({
				method: "POST",
				url: "/registry",
				data: {
					id,
					username,
					firstPassword,
					secondPassword,
					telephone,
					age,
					gender,
					birthday,
					avatar: !avatar ? gender == "男"
						? "https://i.postimg.cc/52PvS6sP/undraw-Male-avatar-re-y880-1.png"
						: "https://i.postimg.cc/rwyx4SN0/undraw-Female-avatar-re-l6cx-1.png" : avatar,
					role: "cu",
				},
			});
			const data2 = await registry({
				method: "POST",
				url: "/registry/avatar",
				data: this.imgData
			});
			if (data1.data.ok) {
				this.$message({
					type: "success",
					message: "注册成功，现在您可以登录了",
				});
				this.$router.push({
					path: "/login",
				});
			} else {
				setTimeout(() => {
					this.$message({
						type: "error",
						message: "该用户名已经被注册过了，请不要重复注册",
					});
					this.isLoading = false;
				}, 500);
			}
		},
		upload(file) {
			const avatar = file.raw;
			const type = avatar.type.slice(6);
			const data = new FormData();
			const filename = `${this.regInfo.username}.${
				type == "jpeg" ? "jpg" : "png"
			}`;
			data.append("avatar", avatar, filename);
			this.imgData = data;
			this.regInfo.avatar = `http://127.0.0.1:3000/avatars/${filename}`
		},
		picExceed() {
			this.$notify({
				title: "Number exceed",
				message: "Uploading a picture is only available.",
			});
		},
	},
	watch: {
		regInfo: {
			deep: true,
			handler(newValue) {
				const { username, firstPassword, secondPassword, telephone } = newValue;
				// 提交表单检验
				if (
					username.length >= 6 &&
					firstPassword.length >= 6 &&
					secondPassword.length >= 6 &&
					firstPassword == secondPassword &&
					telephone.length == 11
				) {
					this.isAllLegal = true;
				}
			},
		},
	},
};
</script>

<style lang="scss" scoped>
#registry {
	overflow: hidden;
	.title {
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.regForm {
		margin: 0 400px;
		.gender {
			width: 100%;
		}
	}
	.regBtn {
		width: 100% !important;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>