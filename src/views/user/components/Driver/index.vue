<template>
	<div id="driver">
		<el-container>
			<el-aside width="200px" class="aside">Aside</el-aside>
			<el-container>
				<el-header class="header">Header</el-header>
				<el-main class="main">Main</el-main>
				<el-footer class="footer">Footer</el-footer>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
export default {
	name: "Driver",
	data() {
		return {

		}
	},
	methods: {
		driver() {
			const driver = new Driver();
			driver.defineSteps([
				{
					element: '.aside',
					popover: {
						title: 'Aside',
						description: 'This is a aside',
						position: 'right'
					}
				},
				{
					element: '.header',
					popover: {
						title: 'Header',
						description: 'This is a header',
						position: 'bottom'
					}
				},
				{
					element: '.main',
					popover: {
						title: 'Main',
						description: 'This is a main',
						position: 'left'
					}
				},
				{
					element: '.footer',
					popover: {
						title: 'Footer',
						description: 'This is a footer',
						position: 'top'
					}
				},
			]);
			driver.start();
		},
		open() {
			this.$confirm('Open Driver?', 'Tips', {
				confirmButtonText: 'confirm',
				cancelButtonText: 'cancel',
				type: 'success'
			}).then(() => {
				this.driver()
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'cancel'
				});
			});
		}
	},
	mounted() {
		setTimeout(() => this.open(), 3000)
	}
};
</script>

<style scoped lang="scss">
#driver {
	width: 100%;
	height: 100%;

	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.el-container {
		height: 100%;
	}
}
</style>