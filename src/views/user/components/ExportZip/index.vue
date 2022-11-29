<template>
	<div id="export_zip">
		<div class="title">
			<h1>Export Zip</h1>
			<span>
				<span>Export Zip is based on </span>
				<a href="https://stuk.github.io/jszip/">jszip</a>
			</span>
		</div>
		<div class="main-content">
			<div class="export_config">
				<el-input placeholder="Zip Name" v-model="zip_name" clearable style="margin-right: 10px; width: 150px;">
				</el-input>
				<el-button :loading="downloadLoading" type="primary" plain @click="exportZip">Export Zip</el-button>
			</div>
			<div class="content">
				<div class="table">
					<table style="width: 100%; border: 1px solid #ccc; border-collapse: collapse">
						<thead style="height: 30px">
							<th style="width: 25%; border-right: 1px solid #eee">Sid</th>
							<th style="width: 10%; border-right: 1px solid #eee">Sname</th>
							<th style="width: 10%; border-right: 1px solid #eee">Sgender</th>
							<th style="width: 10%; border-right: 1px solid #eee">Sage</th>
							<th style="width: 10%; border-right: 1px solid #eee">Stutor</th>
							<th style="width: 25%; border-right: 1px solid #eee">Saddress</th>
							<th style="width: 10%">Shobbies</th>
						</thead>
						<tbody ref="tbody">
							<tr v-for="(row, index) in tableData" :key="row.Sid">
								<td>{{ row.Sid }}</td>
								<td>{{ row.Sname }}</td>
								<td>{{ row.Sgender }}</td>
								<td>{{ row.Sage }}</td>
								<td>{{ row.Stutor }}</td>
								<td>{{ row.Saddress }}</td>
								<td>{{ row.Shobbies }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { nanoid } from 'nanoid'
export default {
	name: "ExportZip",
	data() {
		return {
			zip_name: '',
			downloadLoading: false,
			tableData: [
				{
					Sid: nanoid(),
					Sname: "Kkuil",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Tom",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Jerry",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "YANYAN",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Kk",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Jack",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Bruce",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Jacket",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Salary",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
				{
					Sid: nanoid(),
					Sname: "Money",
					Sgender: "Man",
					Sage: 19,
					Stutor: "YANYAN",
					Saddress: "Jiangxi Province",
					Shobbies: "Coding",
				},
			],
		}
	},
	methods: {
		exportZip() {
			this.downloadLoading = true
			import('@/vendor/Export2Zip').then(zip => {
				const tHeader = ['Sid',
					'Sname',
					'Sgender',
					'Sage',
					'Stutor',
					'Saddress',
					'Shobbies',
				]
				const filterVal = ['Sid',
					'Sname',
					'Sgender',
					'Sage',
					'Stutor',
					'Saddress',
					'Shobbies',
				]
				const list = this.tableData
				const data = this.formatJson(filterVal, list)
				zip.export_txt_to_zip(tHeader, data, this.zip_name, this.zip_name)
				this.downloadLoading = false
			})
		},
		// 格式化json代码
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]))
		}
	}
};
</script>

<style scoped lang="scss">
#export_zip {
	width: 100%;
	height: 100%;
	border: 1px solid #eee;
	border-top: 0px;

	.title {
		width: 100%;
		height: 70px;
		margin: 0;
		padding-left: 15px;
		border-top: 3px solid #0094ff;
		border-bottom: 3px solid #0094ff;
		display: flex;
		align-items: center;

		>span {
			margin-top: 10px;
			margin-left: 5px;

			>a {
				color: #0095ff93;
				transition: color .3s;

				&:hover {
					color: #0095ffe0;
				}
			}
		}
	}

	.main-content {
		width: 100%;
		height: 100%;
		padding: 10px;

		.export_config {
			width: 100%;
			height: 10%;
			display: flex;
			align-items: center;
		}

		.content {

			.table {
				width: 100%;
				height: 100%;

				tr {
					border-top: 1px solid #eee;
					height: 50px;
					line-height: 50px;
					background-color: #fff;

					&:hover {
						background-color: rgb(187, 224, 246);
					}

					td {
						text-align: center;
						border-right: 1px solid #eee;
					}
				}
			}

			.center_show {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>