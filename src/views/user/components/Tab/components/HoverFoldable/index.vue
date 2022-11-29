<template>
    <div class="nav_tab">
        <div class="tabs" ref="tabs">
            <div v-for="item, index in list" :ref="'item' + index" :key="item.value" @click="cur_index = index"
                @mouseenter="hover_index = index" @mouseleave="hover_index = cur_index"
                :class="`${cur_index == index ? 'tab active' : 'tab'}`">
                <svg class="icon">
                    <use :xlink:href="item.icon" />
                </svg>
                <span v-show="!isCollapse" class="words">{{ item.value }}</span>
            </div>
            <div class="hover_moving" :style="`width: ${cur_width + 3}px; top: ${cur_top}px;`"></div>
        </div>
        <div class="content">
            <i @click="collapse" :class="`${isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'}`"></i>
            <h1>{{ content[cur_index] }}</h1>
            <h1 class="watermark">NavTab</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavTab',
    data() {
        return {
            cur_width: 0,
            cur_top: 0,
            cur_index: 0,
            hover_index: 0,
            isCollapse: false,
            list: [
                {
                    icon: '#icon-webpack',
                    value: 'Webpack'
                },
                {
                    icon: '#icon-icon_mock4',
                    value: 'Mock'
                },
                {
                    icon: '#icon-Python',
                    value: 'Python'
                },
                {
                    icon: '#icon-java',
                    value: 'Java'
                },
                {
                    icon: '#icon-php',
                    value: 'PHP'
                },
                {
                    icon: '#icon-cyuyan',
                    value: 'C'
                },
            ],
            content: ['Webpack', 'Mock', 'Python', 'Java', 'PHP', 'C']
        }
    },
    methods: {
        collapse() {
            this.isCollapse = !this.isCollapse
            this.$nextTick(function () {
                this.cur_width = this.$refs.tabs.clientWidth
            })
        }
    },
    mounted() {
        this.cur_width = this.$refs['item' + this.hover_index][0].clientWidth
        this.cur_top = this.$refs['item' + this.hover_index][0].offsetTop
    },
    watch: {
        hover_index: {
            handler(index) {
                this.cur_width = this.$refs['item' + index][0].clientWidth
                this.cur_top = this.$refs['item' + index][0].offsetTop
            }
        }
    }
}
</script>

<style scoped lang="scss">
.nav_tab {
    width: 100%;
    height: 100%;
    display: flex;

    .tabs {
        position: relative;
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        border-right: 1px solid #eee;

        .tab {
            z-index: 1;
            cursor: pointer;
            height: 35px;
            display: flex;
            align-items: center;
            transition: all .3s ease;
            border-right: 3px solid transparent;

            .icon {
                width: 20px;
                margin: 5px;
            }

            .words {
                width: 60px;
                font-weight: bold;
                font-size: 13px;
            }
        }

        .hover_moving {
            z-index: 0;
            position: absolute;
            left: 0;
            height: 35px;
            color: #fff;
            background-color: #9ebfd773;
            transition: all .3s ease;
            border-right: 3px solid #0094ff;
        }

        .active {
            color: #0094ff;
        }
    }

    .content {
        position: relative;
        width: 100%;
        height: 90%;
        padding: 10px;

        i {
            cursor: pointer;
            font-size: 30px;
        }

        .watermark {
            z-index: 2;
            position: absolute;
            top: 20%;
            left: 50%;
            font-size: 80px;
            transform: translate(-50%, -50%) rotate(-60deg);
            color: #eee;
        }
    }
}
</style>