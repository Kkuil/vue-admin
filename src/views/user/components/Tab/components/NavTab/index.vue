<template>
    <div class="nav_tab">
        <div class="tabs">
            <div v-for="item, index in list" :key="item.value" @click="cur_index = index"
                :class="`${cur_index == index ? 'tab active' : 'tab'}`">
                <svg class="icon">
                    <use :xlink:href="item.icon" />
                </svg>
                <span class="words">{{ item.value }}</span>
            </div>
        </div>
        <div class="content">
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
            cur_index: 0,
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
    }
}
</script>

<style scoped lang="scss">
.nav_tab {
    width: 100%;
    height: 100%;
    display: flex;

    .tabs {
        width: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        border-right: 1px solid #eee;
        
        .tab {
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

        .active {
            color: #fff;
            background-color: #82b1d2;
            border-color: #0094ff;
        }
    }

    .content {
        position: relative;
        width: 100%;
        height: 90%;
        padding: 10px;

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