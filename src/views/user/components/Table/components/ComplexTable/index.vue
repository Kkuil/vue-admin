<template>
	<div id="complex_table">
		<div class="title">
			<i class="iconfont icon-Table"></i>
			<h2>Complex Table</h2>
		</div>
		<div class="search">
			<!-- Sname -->
			<el-input
				v-model="name"
				placeholder="name"
				style="width: 200px"
			></el-input>
			<!-- stars -->
			<el-select v-model="stars" clearable placeholder="stars">
				<el-option v-for="star in 3" :key="star" :label="star" :value="star">
					<span style="float: left">
						<i
							v-for="icon in star"
							:key="icon"
							class="iconfont icon-xingxing"
						></i>
					</span>
					<span style="float: right; color: #8492a6; font-size: 13px">{{
						star
					}}</span>
				</el-option>
			</el-select>
			<!-- provinces -->
			<el-select v-model="province" clearable placeholder="请选择省份">
				<el-option
					v-for="province in search.provinces"
					:key="province.value"
					:label="province.value"
					:value="province.value"
				>
					<span style="float: left">
						{{ province.value }}
					</span>
				</el-option>
			</el-select>
			<!-- score Sort -->
			<el-select v-model="sortType" clearable placeholder="请选择排序方式">
				<el-option
					v-for="sortType in search.sortTypes"
					:key="sortType.value"
					:label="sortType.value"
					:value="sortType.className"
				>
					<span style="float: left">
						{{ sortType.value }}
					</span>
					<span style="float: right; color: #8492a6; font-size: 13px"
						><i :class="`iconfont ${sortType.className}`"></i
					></span>
				</el-option>
			</el-select>
			<!-- search -->
			<el-button type="primary" icon="el-icon-search" @click="getData"
				>Search</el-button
			>
			<!-- edit -->
			<el-button type="primary" icon="el-icon-edit">Add</el-button>
			<!-- download -->
			<el-button
				:loading="downloading"
				type="primary"
				icon="el-icon-download"
				@click="exportExcel"
				ref="export"
				>Export</el-button
			>
		</div>
		<div class="table" v-loading.lock="tableLoading">
			<el-table :data="students" border>
				<el-table-column prop="id" label="id"> </el-table-column>
				<el-table-column prop="name" label="name"> </el-table-column>
				<el-table-column prop="gender" label="gender"> </el-table-column>
				<el-table-column prop="age" label="age"> </el-table-column>
				<el-table-column prop="score" label="score"> </el-table-column>
				<el-table-column prop="tutor" label="turtor"> </el-table-column>
				<el-table-column prop="province" label="province"> </el-table-column>
				<el-table-column prop="stars" label="stars"> </el-table-column>
				<el-table-column prop="hobby" label="hobby"> </el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<div class="tool_tips">
				<div class="total_page">
					<span>Total Pages:</span>
					<span>{{ pages }}</span>
				</div>
				<div class="num_per_page">
					<span>Number Per Page</span>
					<el-select v-model="size" style="width: 80px; margin-left: 8px">
						<el-option
							v-for="t in search.totalPerPage"
							:key="t.label"
							:label="t.label"
							:value="t.value"
						>
						</el-option>
					</el-select>
				</div>
			</div>
			<el-pagination
				background
				layout="prev, pager, next"
				:page-size="size"
				:total="pages * size"
				:page-count="pages"
				:pager-count="7"
				:current-page="page"
				@current-change="handlePage"
			>
			</el-pagination>
			<div class="go_to">
				<span>Go to</span>
				<el-select v-model="page" style="width: 60px; margin-left: 8px">
					<el-option v-for="p in pages" :key="p" :label="p" :value="p">
					</el-option>
				</el-select>
			</div>
		</div>
	</div>
</template>

<script>
import getTableData from "@/api/table/getTableData";
export default {
	name: "ComplexTable",
	data() {
		return {
			search: {
				provinces: [
					{ value: "河北省" },
					{ value: "山西省" },
					{ value: "辽宁省" },
					{ value: "吉林省" },
					{ value: "黑龙江省" },
					{ value: "江苏省" },
					{ value: "浙江省" },
					{ value: "安徽省" },
					{ value: "福建省" },
					{ value: "江西省" },
					{ value: "山东省" },
					{ value: "河南省" },
					{ value: "湖北省" },
					{ value: "湖南省" },
					{ value: "广东省" },
					{ value: "海南省" },
					{ value: "四川省" },
					{ value: "贵州省" },
					{ value: "云南省" },
					{ value: "陕西省" },
					{ value: "甘肃省" },
					{ value: "青海省" },
					{ value: "台湾省" },
				],
				sortTypes: [
					{
						className: "icon-ascend",
						value: "Score Ascending",
					},
					{
						className: "icon-descend",
						value: "Score Descending",
					},
				],
				totalPerPage: [
					{
						label: "Ten",
						value: 10,
					},
					{
						label: "Twenty",
						value: 20,
					},
					{
						label: "Thirty",
						value: 30,
					},
				],
			},
			// 加载表格
			tableLoading: true,
			// 导出表格
			downloading: false,
			// 全部学生
			students: [],
			// 搜索姓名
			name: "",
			// 搜索星数
			stars: "",
			// 搜索省份
			province: "",
			// 搜索排序类型
			sortType: "",
			// 当前每页条目数
			size: 10,
			// 当前页
			page: 1,
			// 当前总页数
			pages: 10,
		};
	},
	methods: {
		async getData() {
			this.tableLoading = true;
			const { name, stars, province, sortType, size, page } = this;
			const {
				data: { students, pages },
			} = await getTableData({
				method: "GET",
				url: "/table",
				params: {
					name,
					stars,
					province,
					sortType,
					size,
					page,
				},
			});
			this.students = students;
			this.pages = pages;
			this.page = this.page > pages ? 1 : this.page;
			setTimeout(() => {
				this.tableLoading = false;
			}, 500);
		},
		handlePage(page) {
			// 修改当前页页码
			this.page = page;
			// 发送请求获取当前请求页的数据
			this.getData();
		},
		exportExcel() {
			this.downloading = true;
			import("@/vendor/Export2Excel").then((excel) => {
				const tHeader = [
					"id",
					"name",
					"gender",
					"age",
					"score",
					"tutor",
					"province",
					"stars",
					"hobby",
				];
				const filterVal = [
					"id",
					"name",
					"gender",
					"age",
					"score",
					"tutor",
					"province",
					"stars",
					"hobby",
				];
				const data = this.formatJson(filterVal)
				excel.export_json_to_excel({
					header: tHeader, // table Header
					data, // table data
					filename: "students",
				});
				this.downloading = false;
			});
		},
		formatJson(filterVal) {
			return this.students.map((v) =>
				filterVal.map((j) => {
					return v[j];
				})
			);
		},
	},
	mounted() {
		this.getData();
	},
	watch: {
		page: {
			immediate: true,
			handler(page) {
				this.page = page;
				this.getData();
			},
		},
		size: {
			immediate: true,
			handler(size) {
				this.size = size;
				this.getData();
			},
		},
	},
};
</script>

<style scoped lang="scss">
#complex_table {
	width: 100%;
	height: auto;
	border: 2px solid #eee;
	.title {
		width: 100%;
		height: 80px;
		display: flex;
		border-top: 3px solid #0094ff;
		border-bottom: 3px solid #0094ff;
		align-items: center;
		i {
			font-size: 25px;
			margin: 0 8px;
		}
	}
	.search {
		margin: 10px;
		.el-select {
			margin: 0 10px;
		}
	}
	.table {
		width: 100%;
		height: 100%;
		padding: 10px;
	}
	.pagination {
		margin: 10px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		.tool_tips {
			display: flex;
			align-items: center;
			.total_page {
				padding: 5px;
				border: 1px solid #0094ff;
				margin-right: 8px;
			}
		}
		span {
			font-size: 15px;
		}
	}
}
</style>