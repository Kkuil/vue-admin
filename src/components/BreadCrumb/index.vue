<template>
	<div v-if="isShowNav" id="bc-container">
		<transition-group
			id="breadcrumb"
			name="routeBC"
			appear
			enter-active-class="animated flipInX"
			leave-active-class="animated flipOutX"
			:style="'background-color:' + rgbaColor + '; !important'"
		>
			<div
				:class="bread.isActive ? 'route active' : 'route'"
				v-for="bread in breads"
				:key="bread.index"
				@click.prevent="switchRoute({ route: bread.route, index: bread.index })"
				@contextmenu.prevent="showMenu(bread.index, $event)"
			>
				<i :class="bread.isActive ? 'el-icon-star-on' : ''"></i>
				<span>{{ bread.route }}</span>
				<i
					@click.stop="delBC(bread.route)"
					:class="bread.index != 0 ? 'el-icon-circle-close' : ''"
				></i>
				<div
					:style="`left: ${offsetMenuX}px; top: ${offsetMenuY}px;`"
					v-if="curShowMenuIndex == bread.index"
					id="popMenu"
				>
					<div class="menu-item" @click="refresh">Refresh</div>
					<div class="menu-item" @click.stop="closeAll">Close All</div>
					<div class="menu-item" @click="closeOthers(bread.index)">
						Close Others
					</div>
					<div class="menu-item" @click.stop="delBC(bread.route)">Close Aim</div>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "BreadCrumb",
	data() {
		return {
			curShowMenuIndex: 99,
			offsetMenuX: 0,
			offsetMenuY: 0,
			isShowNav: true,
			rgbaColor: "",
		};
	},
	methods: {
		// 切换路由
		switchRoute({ route, index }) {
			this.$store.dispatch("breadcrumb/findBreadcrumb", { route, index });
			this.$router.push({
				name: route,
			});
		},
		// 展示菜单栏
		showMenu(curShowMenuIndex, e) {
			this.curShowMenuIndex = curShowMenuIndex;
			this.offsetMenuX = e.offsetX;
			this.offsetMenuY = e.offsetY;
		},
		// 删除路由
		delBC(route) {
			this.$store.dispatch("breadcrumb/delBreadcrumb", {
				route,
				router: this.$router,
			});
			this.curShowMenuIndex = 99;
		},
		// 刷新路由
		refresh() {
			this.$store.commit("breadcrumb/REFRESH", this.$router);
			this.curShowMenuIndex = 99;
		},
		// 关闭所有路由
		closeAll() {
			this.$store.commit("breadcrumb/DELALL");
			this.curShowMenuIndex = 99;
			this.$nextTick(function () {
				this.$router.push({
					path: "/user/dashboard",
				});
			});
		},
		// 关闭其他的路由
		closeOthers(index) {
			this.$store.commit("breadcrumb/CLOSEOTHERS", index);
			this.curShowMenuIndex = 99;
		}
	},
	computed: {
		...mapState("breadcrumb", ["breads"]),
	},
	watch: {
		$route: {
			deep: true,
			handler(newRoute) {
				const { name } = newRoute;
				const { index } = newRoute.meta;
				this.switchRoute({ route: name, index });
			},
		},
	},
	mounted() {
		// 面包屑的显示与隐藏
		this.$bus.$on("isShowNav", (isShowNav) => {
			this.isShowNav = isShowNav;
		});
		// 保存上次记录
		const { index } = this.$route.meta;
		const { name } = this.$route;
		if (name == "dashboard") return;
		this.$store.dispatch("breadcrumb/findBreadcrumb", { index, route: name });
		// changeTheme
		this.$bus.$on("changeTheme", (rgbaColor) => {
			this.rgbaColor = rgbaColor;
		});
		// 关闭菜单栏
		this.$bus.$on("closeMenu", () => {
			console.log(123);
			this.curShowMenuIndex = 99;
		});
	},
};
</script>

<style scoped lang="scss">
#bc-container {
	z-index: 1000;
	position: sticky;
	top: 0;
	transition: all 0.3s;
	#breadcrumb {
		z-index: 999;
		width: 100%;
		height: 40px;
		display: flex !important;
		align-items: center;
		padding-left: 15px;
		background-color: rgba(139, 207, 255, 0.564);
		filter: blur(0.1px);
		.route {
			position: relative;
			cursor: pointer;
			width: auto;
			height: 30px;
			padding: 5px;
			border-radius: 5px;
			line-height: 20px;
			font-weight: 600;
			background-color: #fff;
			font-size: 13px;
			transition: all 0.3s;
			margin-right: 10px;
			border: 1px solid rgb(16, 159, 236);
			.el-icon-star-on {
				transition: all 0.3s;
				margin-right: 5px;
			}
			.el-icon-circle-close {
				font-weight: 600;
				transition: all 0.3s;
				margin-left: 5px;
				&:hover {
					color: #e0355d;
				}
			}
			&:hover {
				background-color: rgba(73, 155, 255, 0.1);
				box-shadow: 0 0 5px 1px #ccc;
			}
		}
		.active {
			background-color: rgb(0, 157, 255);
		}
	}
	#popMenu {
		z-index: 999;
		position: absolute;
		top: 0;
		left: 0;
		width: 100px;
		height: 120px;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);
		display: flex;
		flex-direction: column;
		padding: 3px 0;
		& > .menu-item {
			width: 100%;
			height: 25%;
			display: flex;
			font-size: 13px;
			justify-content: center;
			align-items: center;
			&:hover {
				cursor: default;
				background-color: #eeeeee;
			}
		}
	}
}
</style>