<template>
	<div id="icons">
		<div class="header" style="border-top: 3px solid #0094ff">
			<h3>Icons that this project used</h3>
		</div>
		<el-tabs type="border-card" class="tabs">
			<el-tab-pane>
				<span slot="label">
					<i class="el-icon-eleme" style="margin-right: 3px"></i>
					<span>Element-icons</span>
				</span>
				<div class="eleme_icons">
					<el-tooltip
						v-for="(icon, index) in eleme_icons"
						:key="index"
						class="item"
						effect="dark"
						:content="icon"
						placement="top"
						@click.native.stop="handleCopy(icon, $event)"
					>
						<div>
							<i :class="icon"></i>
							<div>
								<span>{{ icon }}</span>
							</div>
						</div>
					</el-tooltip>
				</div>
			</el-tab-pane>
			<el-tab-pane>
				<span slot="label">
					<i class="iconfont icon-alibaba" style="margin-right: 3px"></i>
					<span>Ali-icons</span>
				</span>
				<div class="eleme_icons">
					<el-tooltip
						v-for="(icon, index) in ali_icons"
						:key="index"
						class="item"
						effect="dark"
						:content="icon"
						placement="top"
						@click.native.stop="handleCopy(icon, $event)"
					>
						<div>
							<i :class="`iconfont ${icon}`"></i>
							<div>
								<span>{{ icon }}</span>
							</div>
						</div>
					</el-tooltip>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
import clip from "@/utils/clipboard";
export default {
	name: "Icons",
	data() {
		return {
			eleme_icons: [
				"el-icon-platform-eleme",
				"el-icon-eleme",
				"el-icon-setting",
				"el-icon-user-solid",
				"el-icon-check",
				"el-icon-close",
				"el-icon-s-order",
				"el-icon-s-fold",
				"el-icon-s-unfold",
				"el-icon-s-promotion",
				"el-icon-s-claim",
				"el-icon-share",
				"el-icon-refresh-right",
			],
			ali_icons: [
				"icon-alibaba",
				"icon-iconfontqidian",
				"icon-iconfontzhongdian",
				"icon-sousuo",
				"icon-github-fill",
				"icon-logout",
				"icon-messages",
				"icon-yiwancheng",
				"icon-important",
				"icon-weiwancheng",
				"icon-xingxing",
				"icon-duigou",
				"icon-caidan",
				"icon-cq-sandiantu",
				"icon-yushui",
				"icon-Rice",
				"icon-mbefengge_kafei",
				"icon-shuijue",
				"icon-yewan",
				"icon-tq_04duoyun",
				"icon-ico_location",
				"icon-dingwei",
				"icon-md-locate",
				"icon-cloudy",
				"icon-rain",
				"icon-Sunny",
				"icon-clothes",
				"icon-nav",
				"icon-logo-vimeo",
				"icon-fullscreen-shrink",
				"icon-search",
				"icon-Magnify",
				"icon-clothesfill",
				"icon-font",
				"icon-clipboard",
				"icon-file-pdf",
				"icon-excel",
				"icon-chart-scatter-plot",
				"icon-error",
				"icon-guide",
				"icon-zip",
				"icon-route-solid",
				"icon-bianjiwenzhang_huaban",
				"icon-table",
				"icon-yibiaopan",
				"icon-COMPONENTS",
				"icon-mima1",
				"icon-yonghu",
				"icon-eye",
				"icon-no_eye",
			],
		};
	},
	methods: {
		handleCopy(data, e) {
			clip(e.target, data);
		}
	},
};
</script>

<style scoped lang="scss">
#icons {
	width: 100%;
	height: 100%;
	.tabs {
		[class$="_icons"] {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			> div {
				width: 126px;
				height: 126px;
				padding: 10px;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				transition: all 0.3s;
				color: #000;
				> i {
					font-size: 30px;
				}
				> div {
					font-size: 13px;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
				}
				&:hover {
					z-index: 99;
					box-shadow: 0 0 10px 5px #eee;
					transform: scale(1.1);
					color: #0094ff;
				}
			}
		}
	}
}
</style>