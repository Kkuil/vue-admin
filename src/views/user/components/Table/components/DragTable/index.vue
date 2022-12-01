<template>
	<div id="drag_table">
		<div class="title">
			<i class="iconfont icon-drag"></i>
			<h2>Dragable Table</h2>
		</div>
		<div class="table">
			<table
				style="width: 100%; border: 1px solid #ccc; border-collapse: collapse"
			>
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
					<tr
						v-for="(row, index) in tableData"
						:key="row.Sid"
						draggable="true"
						:data-index="index"
						:style="`color: ${
							current_index == index ? '#0094ff' : ''
						}; transition: all .3s; background-color: ${
							hover_index == index ? '#0095ff79' : ''
						};`"
					>
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
</template>

<script>
import { nanoid } from "nanoid";
export default {
	name: "DragTable",
	data() {
		return {
			current_index: -1,
			hover_index: -1,
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
		};
	},
	mounted() {
		const tbody = this.$refs.tbody;
		tbody.ondragstart = (e) => {
			this.current_index = e.target.dataset.index;
			e.dataTransfer.effectAllowed = "move";
			this.$nextTick(function() {
				e.target.style.color = 'transparent'
			})
		};

		tbody.ondragover = (e) => {
			e.preventDefault();
		};
		tbody.ondragenter = (e) => {
			this.hover_index = e.target.parentNode.dataset.index
			e.preventDefault();

		};
		tbody.ondragend = (e) => {
			// 保存一份
			const temp = this.tableData[this.current_index]
			this.tableData.splice(this.current_index, 1)
			this.$nextTick(function() {
				this.tableData.splice(this.hover_index, 0, temp)
			})
		};
	},
};
</script>

<style scoped lang="scss">
#drag_table {
	width: 100%;
	height: auto;
	border-top: 0;
	border: 1px solid #eee;
	.title {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 10px;
		border-top: 3px solid #0094ff;
		i {
			font-size: 25px;
			margin-right: 8px;
		}
	}
	.table {
		width: 100%;
		height: 100%;
		padding: 10px;
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
</style>