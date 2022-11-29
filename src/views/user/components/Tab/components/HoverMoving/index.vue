<template>
    <div class="basic">
        <div class="tabs">
            <div v-for="item, index in list" :ref="'item' + index" :key="item" @click="cur_index = index"
                @mouseenter="hover_index = index" @mouseleave="hover_index = cur_index"
                :class="`${cur_index == index ? 'tab active' : 'tab'}`">
                <span>{{ item }}</span>
            </div>
            <div class="border-bottom" :style="`width: ${cur_width}px; left: ${cur_left}px;`"></div>
        </div>
        <div class="content">
            <h1>{{ content[cur_index] }}</h1>
            <h1 class="watermark">Hover</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Basic',
    data() {
        return {
            cur_width: 0,
            cur_left: 0,
            cur_index: 0,
            hover_index: 0,
            list: ['HTML', 'CSS', 'Javascript', 'Vue', 'React', 'Angular'],
            content: ['HTML', 'CSS', 'Javascript', 'Vue', 'React', 'Angular'],
        }
    },
    mounted() {
        this.cur_width = this.$refs['item' + this.hover_index][0].clientWidth
        this.cur_left = this.$refs['item' + this.hover_index][0].offsetLeft
    },
    watch: {
        hover_index: {
            handler(index) {
                this.cur_width = this.$refs['item' + index][0].clientWidth
                this.cur_left = this.$refs['item' + index][0].offsetLeft
            }
        }
    }
}
</script>

<style scoped lang="scss">
.basic {
    width: 100%;
    height: 100%;

    .tabs {
        position: relative;
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 1px solid #eee;

        .tab {
            cursor: pointer;
            width: auto;
            height: 100%;
            padding: 0 5px;
            border-bottom: 3px solid transparent;
            transition: all .3s ease;
        }

        .border-bottom {
            position: absolute;
            bottom: 0;
            height: 3px;
            background-color: #0094ff;
            transition: all .3s ease;
        }

        .active {
            color: #0094ff;
        }
    }

    .content {
        position: relative;
        width: 100%;
        height: 90%;

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