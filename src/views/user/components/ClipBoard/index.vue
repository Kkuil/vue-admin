<template>
	<div id="clipBoard">
		<div class="clip-container">
			<el-tabs v-model="activeName">
				<el-tab-pane label="use clipboard  directly" name="directly">
					<div class="text_copy">
						<el-input
							v-model="inputData"
							placeholder="Please input"
							style="width: 400px; max-width: 100%"
						/>
						<el-button
							type="primary"
							icon="el-icon-document"
							@click="handleCopy(inputData, $event)"
							class="directly_text_copy"
						>
							copy
						</el-button>
					</div>
					<!-- <div class="image_copy">
						<div class="img">
							<img src="https://w.wallhaven.cc/full/96/wallhaven-96z8vd.jpg" ref="imgData" title="spider-man"/>
						</div>
						<el-button
							type="primary"
							icon="el-icon-document"
							@click="handleCopy(imgData, $event)"
							class="directly_img_copy"
						>
							copy
						</el-button>
					</div> -->
				</el-tab-pane>
				<el-tab-pane label="use clipboard by v-directive" name="v-directive">
					<el-input
						v-model="inputData"
						placeholder="Please input"
						style="width: 400px; max-width: 100%"
					/>
					<el-button
						type="primary"
						icon="el-icon-document"
						class="directive_text_copy"
					>
						copy
					</el-button>
				</el-tab-pane>
			</el-tabs>
		</div>
	</div>
</template>

<script>
import clip from "@/utils/clipboard";

export default {
	name: "ClipBoard",
	data() {
		return {
			activeName: "directly",
			inputData: "https://github.com/Kkuil",
			imgData: {},
		};
	},
	methods: {
		handleCopy(data, e) {
			clip(e.target, data);
		},
	},
	mounted() {
		this.imgData = this.$refs.imgData;
	},
};
</script>

<style scoped lang="scss">
#clipBoard {
	width: 100%;
	height: 100%;
	.clip-container {
		padding: 15px;
		.image_copy {
			margin-top: 10px;
			.img {
				width: 300px;
				height: 300px;
				img {
					height: 100%;
				}
			}
		}
		.directly_text_copy {
			margin-left: 5px;
		}
		.directly_img_copy {
			margin-top: 5px;
		}
		.directive_text_copy {
			margin-left: 5px;
		}
	}
}
</style>