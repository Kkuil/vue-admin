<template>
    <div id="center">
        <transition leave-active-class="animated bounceInRight" enter-active-class="animated bounceOutRight"
            duration="300" name="center">
            <div v-show="!isCollapse" class="center">
                <div id="search" :class="isSearch ? 'posMR' : 'nagMR'">
                    <i class="iconfont icon-search" @click="isSearch = !isSearch" />
                    <input v-model="searchValue" ref="searchInput" @focus="isSearch = true" @blur="isSearch = false"
                        type="text" focused placeholder="请输入搜索内容">
                    <div v-show="isShowSearch" class="search-list">
                        <div class="box">
                            <div v-show="searchList.length" v-for="item in searchList" :key="item"
                                @click="changeRoute(item)">
                                <span>{{ item }}</span>
                            </div>
                            <div v-show="!searchList.length" class="tips">No Information</div>
                        </div>
                    </div>
                </div>
                <div id="magnify" @click="magnifyScreen">
                    <i :class="isFullScreen ? 'iconfont icon-fullscreen-shrink' : 'iconfont icon-Magnify'"></i>
                </div>
                <div id="avatar">
                    <el-avatar :style="'background-color:' + rgbaColor + '; !important'" :size='30'
                        :src='userInfo.avatar' fit="cover"></el-avatar>
                    <el-dropdown class="dropDown">
                        <div>下拉</div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-user-solid"
                                @click.native="$router.push({ name: 'profile' })">
                                <span>Your Profile</span>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <i class=" iconfont icon-messages"></i>
                                <span>Message</span>
                            </el-dropdown-item>
                            <el-dropdown-item @click.native="logout">
                                <i class="iconfont icon-logout"></i>
                                <span>Logout</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </transition>
        <div v-show="isCollapse" class="collapse">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <i class="iconfont icon-caidan"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="$router.push({ name: 'profile' })">
                        <i class="el-icon-user-solid"></i>
                        <span>Your Profile</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="magnifyScreen">
                        <i :class="isFullScreen ? 'iconfont icon-fullscreen-shrink' : 'iconfont icon-Magnify'"></i>
                        <span>{{ isFullScreen ? ' Shrink' : 'Magnify' }}</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <i class="iconfont icon-messages"></i>
                        <span>Message</span>
                    </el-dropdown-item>
                    <el-dropdown-item @click.native="logout">
                        <i class="iconfont icon-logout"></i>
                        <span>Logout</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import screenfull from 'screenfull'

export default {
    name: 'Center',
    props: {
        userInfo: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            isCollapse: false,
            isFullScreen: false,
            isSearch: false,
            isShowSearch: false,
            dialogFormVisible: true,
            rgbaColor: '#fff',
            searchValue: '',
            list: [
                "index",
                "document",
                "guide",
                "permission",
                "icons",
                "components",
                "button",
                "drag",
                "charts",
                "echarts3D",
                "echartsBar",
                "timeline",
                "table",
                "dragTable",
                "complexTable",
                "example",
                "tab",
                "richText",
                "lazyLoad",
                "exportZip",
                "changeTheme",
                "clipboard",
                "particle",
                "dragClick",
                "rays",
                "profile",
                "mainPage",
                "imageWall",
                "setting"
            ]
        }
    },
    mounted() {
        // 初始化Screen
        this.initScreen()
        // 监听屏幕尺寸变化
        this.$bus.$on('isCollapseCenter', (isCollapse) => {
            this.isCollapse = isCollapse
        })
    },
    methods: {
        // 放大屏幕
        magnifyScreen() {
            screenfull.toggle()
        },
        // 初始化屏幕
        initScreen() {
            screenfull.on('change', () => {
                if (!screenfull.enabled) {
                    this.$message({
                        type: 'success',
                        message: '你的浏览器暂不支持全屏！'
                    })
                    return
                }
                this.isFullScreen = screenfull.isFullscreen
            })
        },
        changeProfile() {
            this.dialogFormVisible = true
        },
        logout() {
            localStorage.clear('auth')
            this.$message({
                type: 'success',
                message: '退出成功'
            })
            this.$router.replace({
                path: '/login'
            })
        },
        changeRoute(route) {
            this.$router.push({
                name: route
            })
            this.$refs.searchInput.value = ''
            this.isSearch = false
        }
    },
    computed: {
        searchList() {
            return this.list.filter(item => {
                return item.includes(this.searchValue)
            })
        }
    },
    watch: {
        searchValue(newValue) {
            if (newValue.trim()) this.isShowSearch = true
            else this.isShowSearch = false
        }
    }
}
</script>

<style lang='scss' scoped>
#center {
    z-index: 1001;

    .center {
        position: relative;
        width: auto;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        #search {
            position: relative;
            z-index: 1;
            width: 70px;
            display: flex;
            cursor: pointer;
            transition: all 0.3s linear;

            input {
                width: 95px;
                margin-left: 5px;
                font-size: 13px;
                border: 0;
                border-bottom: 1px solid rgb(137, 129, 129);
                outline: 0;
                transition: all 0.3s linear;
                background-color: rgba(0, 0, 0, 0);
            }

            &:hover {
                .icon-search {
                    color: rgba(51, 175, 252);
                }
            }

            .search-list {
                z-index: -999;
                position: absolute;
                width: 140px;
                height: 160px;
                top: 30px;
                left: 20px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                overflow-y: auto;
                overflow-x: hidden;
                padding: 10px 0;
                background-color: #fff;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

                .box {
                    width: 100%;
                    height: auto;

                    >div {
                        padding-left: 10px;
                        width: 100%;
                        height: 25px;
                        border-bottom: 1px solid #eee;
                        display: flex;
                        align-items: center;

                        &:hover {
                            span {
                                color: #0095ffc9;
                            }
                        }

                        span {
                            font-size: 15px;
                            transition: all .3s;
                        }

                    }

                    .tips {
                        width: 100%;
                        height: 20%;
                        font-size: 15px;
                        color: #ccc;
                        display: flex;
                        justify-content: center;
                    }
                }

                >div:first-child {
                    border-top: 1px solid #eee;
                }
            }
        }
    }

    .posMR {
        margin-right: 50px !important;
    }

    .nagMR {
        input {
            opacity: 0;
        }

        margin-right: -50px !important;
    }

    #magnify {
        z-index: 3;
        width: 40px;
        cursor: pointer;
        transition: all 0.3s linear;

        &:hover {
            color: rgba(51, 175, 252);
        }
    }

    #avatar {
        position: relative;
        width: 40px;
        height: auto;

        .el-avatar {
            border: 0 !important;
        }

        .dropDown {
            cursor: pointer;
            z-index: 999;
            position: absolute;
            top: 3px;
            right: 10px;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 35px;
            opacity: 0;

            .el-dropdown-link {
                cursor: pointer;
                color: #409eff;
            }

            .el-icon-arrow-down {
                font-size: 12px;
            }

            .demonstration {
                display: block;
                color: #8492a6;
                font-size: 14px;
                margin-bottom: 20px;
            }
        }
    }
}

.collapse {
    cursor: pointer;

    .icon-caidan {
        font-size: 22px;
    }
}
</style>