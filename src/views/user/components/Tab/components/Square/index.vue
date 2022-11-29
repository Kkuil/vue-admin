<template>
    <div class="square">
        <div class="tabs">
            <div v-for="item, index in list" :key="item" @click="cur_index = index"
                :class="`${cur_index == index ? 'tab active' : 'tab'}`">
                <span>{{ item }}</span>
            </div>
        </div>
        <div class="content">
            <h1>{{ content[cur_index] }}</h1>
            <h1 class="watermark">Square</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Square',
    data() {
        return {
            cur_index: 0,
            list: ['HTML', 'CSS', 'Javascript', 'Vue', 'React', 'Angular'],
            content: ['HTML', 'CSS', 'Javascript', 'Vue', 'React', 'Angular'],
        }
    }
}
</script>

<style scoped lang="scss">
.square {
    width: 100%;
    height: 100%;

    .tabs {
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .tab {
            cursor: pointer;
            width: auto;
            height: 100%;
            padding: 5px;
            border-top: 3px solid transparent;
            border-left: 1px solid transparent;
            border-right: 1px solid transparent;
            border-bottom: 1px solid #eee;
            transition: all .3s ease;
        }

        .active {
            color: #0094ff;
            border-top: 3px solid #0094ff;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
            border-bottom: 1px solid transparent;
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