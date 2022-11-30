<template>
	<div id="permission">
		<div class="title">
			<h1>Permission Setting</h1>
		</div>
		<div class="info_table">
			<el-table ref="multipleTable" :data="user_info" tooltip-effect="dark" style="width: 100%"
				@selection-change="handleSelectionChange" @row-dblclick="edit">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="id" label="id" width="auto">
				</el-table-column>
				<el-table-column prop="username" label="username" width="auto">
				</el-table-column>
				<el-table-column prop="age" width="auto" label="age" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="gender" width="auto" label="gender" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="role" width="auto" label="role" show-overflow-tooltip>
				</el-table-column>
			</el-table>
			<div style="margin-top: 20px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
				<el-button @click="allSelected">全选</el-button>
				<el-button @click="cancel_allSelected">取消全选选择</el-button>
			</div>
			<div class="operation" style="padding-top: 15px;">
				<el-button type="danger" plain @click="del_selected">删除选中用户</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import authToken from '@/utils/authToken'
import userInfos from '@/api/userInfos/userInfos'
import updateInfo from '@/api/updateInfo/updateInfo'
export default {
	name: "Permission",
	data() {
		return {
			user_info: [],
			selected_info: []
		}
	},

	methods: {
		// 请求数据
		async getData() {
			const { data } = await userInfos({
				method: 'GET',
				url: '/userInfos'
			})
			if (data.ok) {
				this.user_info = data.userInfos
			} else {
				this.$router.replace({
					name: 'index'
				})
			}
		},
		allSelected() {
			this.$refs.multipleTable.toggleAllSelection()
		},
		cancel_allSelected() {
			this.$refs.multipleTable.clearSelection()
		},
		handleSelectionChange(val) {
			this.selected_info = val
		},
		edit(value) {
			const { id, username, age, gender } = value
			const h = this.$createElement;
			this.$msgbox({
				title: '编辑信息',
				message: h('div', { style: 'width: 400px; display: flex; flex-direction: column; justify-content: center; align-items: center;' }, [
					h('div', { style: 'width: 350px; display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px;' }, [
						h('span', { style: 'margin-right: 5px;' }, 'username: '),
						h('input', { style: 'width: 300px; height: 30px;', attrs: { value: username }, class: 'user_name' }, null),
					]),
					h('div', { style: 'width: 350px; display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px;' }, [
						h('span', { style: 'margin-right: 5px;' }, 'age: '),
						h('input', { style: 'width: 300px; height: 30px;', attrs: { value: age }, class: 'user_age' }, null),
					]),
					h('div', { style: 'width: 350px; display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px;' }, [
						h('span', { style: 'margin-right: 5px;' }, 'gender: '),
						h('input', { style: 'width: 300px; height: 30px;', attrs: { value: gender }, class: 'user_gender' }, null),
					]),
				]),
				showCancelButton: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				beforeClose: async (action, instance, done) => {
					if (action === 'confirm') {
						instance.confirmButtonLoading = true;
						instance.confirmButtonText = '修改中...';
						const { data: { status, message } } = await updateInfo({
							method: 'POST',
							url: '/update',
							data: {
								id,
								username: document.querySelector('.user_name').value,
								age: document.querySelector('.user_age').value,
								gender: document.querySelector('.user_gender').value
							}
						})
						instance.confirmButtonLoading = false;
						this.$message({
							type: status == 200 ? 'success' : 'error',
							message
						})
						status == 200 && this.getData()
					} else {
						this.$message({
							type: 'success',
							message: '取消成功'
						})
					}
					done()
				}
			}).then(action => {
				this.$message({
					type: 'info',
					message: 'action: ' + action
				});
			}).catch(err => { })
		},
		async del_selected() {
			if (this.selected_info.length) {
				const usernames = this.selected_info.map(info => info.username)
				var { data: { status, message } } = await updateInfo({
					method: 'GET',
					url: '/update',
					params: {
						usernames
					}
				})
				this.$message({
					type: status == 200 ? 'success' : 'error',
					message
				})
				this.getData()
			} else {
				this.$message({
					type: 'info',
					message: 'Empty'
				})
			}

		}
	},
	async beforeRouteEnter(to, from, next) {
		if (to.name == 'permission') {
			// 验证身份
			const { data: { ok, userInfo } } = await authToken({
				method: 'GET',
				url: '/authToken',
				params: {
					auth: localStorage.getItem('auth')
				}
			})
			if (ok && userInfo.role == 'su') {
				next()
			} else {
				next(vm => {
					vm.$message({
						type: 'error',
						message: 'No Right'
					})
					vm.$router.replace({
						name: '404'
					})
				})

			}
		} else next()
	},
	mounted() {
		this.getData()
	}
};
</script>

<style scoped lang="scss">
#permission {
	width: 100%;
	height: 100%;

	.title {
		width: 100%;
		height: 15%;
		display: flex;
		align-items: center;
		border-top: 3px solid #0094ff;
		border-bottom: 1px solid #ccc;
	}

	.info_table {
		width: 100%;
	}
}
</style>