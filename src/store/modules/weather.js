import getLocation from "@/api/weather/getLocation";
import getWeather from "@/api/weather/getWeather";

const actions = {
    async location({ commit }, { lng, lat, self }) {
        // 获取locationID
        const locationInfo = await getLocation({
            method: "GET",
            url: `http://localhost:${self.$port}/getLocation`,
            params: {
                location: `${lng},${lat}`,
                key: "c4374f28f2ec47399f78cd42c073cca6",
            },
        });
        const cityName = locationInfo.data.location[0].name;
        // 获取天气信息
        const weatherInfo = await getWeather({
            method: "GET",
            url: "https://devapi.qweather.com/v7/weather/now",
            params: {
                key: "c4374f28f2ec47399f78cd42c073cca6",
                location: locationInfo.data.location[0].id,
            },
        });
        const weatherInfo1 = { ...weatherInfo.data.now, cityName, lng, lat }
        // 取消定位显示
        self.$bus.$emit("noLocated");
        localStorage.setItem(
            "weatherInfo",
            JSON.stringify(weatherInfo1)
        );
        localStorage.setItem(
            "locationTime",
            Date.now()
        );
        commit('saveWeatherInfo', weatherInfo1)
        // 取消定位中
        self.$bus.$emit("locating", {
            locating: false,
            code: 1,
            message: "定位成功",
        });
    },
}

const mutations = {
    saveWeatherInfo(state, weatherInfo) {
        state.weatherInfo = weatherInfo
    }
}

const state = {
    weatherInfo: {}
}

export default {
    namespaced: true,
    actions,
    mutations,
    state
}