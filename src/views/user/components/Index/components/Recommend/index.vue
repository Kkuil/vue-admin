<template>
	<div class="today_recommend">
		<el-carousel arrow="never">
			<el-carousel-item @click.native="preview" v-for="image, index in images" :key="image"
				:style="`background: url(${image}); background-size: cover;`">
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script>
export default {
	name: "Recommend",
	data() {
		return {
			isPreview: false,
			images: [
				'http://127.0.0.1:3000/images/spiderman-1.jpg',
				'http://127.0.0.1:3000/images/spiderman-2.jpg',
				'http://127.0.0.1:3000/images/spiderman-3.jpg',
				'http://127.0.0.1:3000/images/spiderman-4.jpg',
			],
		};
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">
.today_recommend {
	cursor: pointer;
	z-index: 1000;
	margin: 0 20px;
	overflow: hidden;

	.el-carousel__container {
		width: 100%;
		height: 100%;

		.el-carousel__item {
			color: #475669;
			font-size: 14px;
			margin: 0;
		}

		.el-carousel__item:nth-child(2n) {
			background-color: #99a9bf;
		}

		.el-carousel__item:nth-child(2n + 1) {
			background-color: #d3dce6;
		}
	}

}
</style>