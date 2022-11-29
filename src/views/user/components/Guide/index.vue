<template>
	<div id="guide">
		<div class="bus_route">
			<div class="start">
				<i class="iconfont icon-iconfontqidian"></i>
				<span>起点: </span>
				<input ref="start" type="text" placeholder="请输入你现在所处位置" />
			</div>
			<div class="end">
				<i class="iconfont icon-iconfontzhongdian"></i>
				<span>终点: </span>
				<input ref="end" type="text" placeholder="请输入你要去往的地点" />
			</div>
			<div class="confirm" @click="confirmRoute">
				<button>查询</button>
			</div>
		</div>
		<BaiduMap :center="center" :zoom="zoom" class="bm-view" ak="KNVniWsj0KwLwbmA2Gf93P8FtLjesMfD">
			<Scale anchor="BMAP_ANCHOR_TOP_RIGHT"></Scale>
			<MapType :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></MapType>
			<OverviewMap anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></OverviewMap>
			<Geolocation ref="located" anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"
				@locationSuccess="getLocationSuccess" @locationError="getLocationError" @click.native="
					$bus.$emit('locating', { locating: true, code: 2, message: '定位中' })
				"></Geolocation>
			<Copyright anchor="BMAP_ANCHOR_TOP_RIGHT" :copyright="[
				{
					id: 1,
					content: 'Copyright Message',
					bounds: { ne: { lng: 110, lat: 40 }, sw: { lng: 0, lat: 0 } },
				},
				{ id: 2, content: '<a>Kkuil</a>' },
			]">
			</Copyright>
			<Panorama></Panorama>
			<Traffic :predictDate="{ weekday: 7, hour: 12 }"> </Traffic>
			<Transit :start="start" :end="end" :auto-viewport="true" location="北京"></Transit>
		</BaiduMap>
	</div>
</template>

<script>

import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import Scale from "vue-baidu-map/components/controls/Scale.vue";
import MapType from "vue-baidu-map/components/controls/MapType.vue";
import OverviewMap from "vue-baidu-map/components/controls/OverviewMap.vue";
import Geolocation from "vue-baidu-map/components/controls/Geolocation.vue";
import Copyright from "vue-baidu-map/components/controls/Copyright.vue";
import Panorama from "vue-baidu-map/components/controls/Panorama.vue";
import Traffic from "vue-baidu-map/components/layers/Traffic.vue";
import Transit from "vue-baidu-map/components/search/Transit.vue";
export default {
	name: "Guide",
	components: {
		BaiduMap,
		Scale,
		MapType,
		OverviewMap,
		Geolocation,
		Copyright,
		Panorama,
		Traffic,
		Transit,
	},
	data() {
		return {
			center: { lng: 250, lat: 120 },
			zoom: 3,
			start: "百度大厦",
			end: "北京邮电大学西门",
		};
	},
	methods: {
		getLocationSuccess({ point: { lng, lat } }) {
			this.$store.dispatch('weather/location', { lng, lat, self: this })
		},
		getLocationError({ StatusCode }) {
			// 取消定位中
			this.$bus.$emit("locating", {
				locating: false,
				code: 0,
				message: "定位失败",
			});
			console.log(StatusCode);
		},
		confirmRoute() {
			if (!this.$refs.start.value) {
				this.$notify({
					title: "消息提示",
					message: "起点不能为空",
					position: "top-right",
				});
				return
			} else if (!this.$refs.end.value) {
				this.$notify({
					title: "消息提示",
					message: "终点不能为空",
					position: "top-right",
				});
				return
			}
			this.start = this.$refs.start.value;
			this.end = this.$refs.end.value;
			this.$refs.start.value = ''
			this.$refs.end.value = ''
		},
	}
};
</script>

<style scoped lang="scss">
#guide {
	width: 100%;
	height: 100%;
	padding: 10px 10px 50px;

	.bus_route {
		width: 100%;
		height: 7%;
		border: 1px solid #0094ff;
		border-bottom: 0;
		display: flex;
		justify-content: flex-start;
		padding: 0 20px;
		align-items: center;

		>div {
			margin: 5px;

			i {
				font-size: 1.5vw;
				margin-top: 3px;
			}

			span {
				font-size: 1vw;
			}

			input {
				width: 11vw;
				font-size: 1vw;
				outline: 0;
				transition: all 0.3s;

				&:hover,
				&:focus {
					border: 1px solid #0094ff;
				}
			}
		}
	}

	.bm-view {
		width: 100%;
		height: 100%;
	}
}
</style>