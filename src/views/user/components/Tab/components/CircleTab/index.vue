<template>
    <div class="circle_tab">
        <div class="tab_content">
            <div class="tabs">
                <div v-for="item, index in list" :key="item" :class="'tab' + index" @click="cur_index = index"
                    @mouseenter="hover_index = index" @mouseleave="hover_index = cur_index"></div>
                <div class="hover_tab" :style="`transform: rotate(${hover_index * 90}deg);`"></div>
            </div>
            <div class="content">
                <svg class="icon">
                    <use :xlink:href="content[cur_index]" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CircleTab',
    data() {
        return {
            cur_index: 0,
            hover_index: 0,
            list: ['幸福', '高薪', '自由', '美好'],
            content: ['#icon-happy-', '#icon-money', '#icon-lvyou-ziyounvshenxiang', '#icon-mbefengge_bingqilin']
        }
    }
}
</script>

<style scoped lang="scss">
.circle_tab {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .tab_content {
        position: relative;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        overflow: hidden;
        border: 2px solid #044e82;

        .tabs {

            [class^=tab],
            .hover_tab {
                cursor: pointer;
                position: absolute;
                top: 50%;
                left: 50%;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transform-origin: 0 0;
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
                transition: all .3s;
            }

            .tab0 {
                z-index: 1;
                border: 125px solid #ff00e6;
                opacity: 0.3;
                transform: rotate(0deg);
            }

            .tab1 {
                z-index: 1;
                border: 125px solid #1cc8aee7;
                opacity: 0.3;
                transform: rotate(90deg);

            }

            .tab2 {
                z-index: 1;
                border: 125px solid #4d0bb0;
                opacity: 0.3;
                transform: rotate(180deg);

            }

            .tab3 {
                z-index: 1;
                border: 125px solid #88a627;
                opacity: 0.3;
                transform: rotate(270deg);

            }

            .hover_tab {
                z-index: 0;
                border: 125px solid #0094ff;
            }
        }


        .content {
            z-index: 2;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgb(0, 0, 0);
            transform: translate(-50%, -50%);
            border: 2px solid #fff;
        }
    }
}
</style>