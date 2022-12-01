<template>
    <div id="drags">
        <div class="undo">
            <div class="title">undo</div>
            <ul>
                <li v-for="undo, index in undos" :key="undo" :ref="'undo' + index" draggable="true" :data-index="index">{{undo}}</li>
            </ul>
        </div>
        <div class="doing">
            <div class="title">doing</div>
            <ul>
                <li v-for="doing, index in doings" :key="doing" :ref="'doing' + index" draggable="true" :data-index="index">{{doing}}</li>
            </ul>
        </div>
        <div class="done">
            <div class="title">done</div>
            <ul>
                <li v-for="done, index in dones" :key="done" :ref="'done' + index" draggable="true" :data-index="index">{{done}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Drags',
    data() {
        return {
            undos: ['undo1', 'undo2', 'undo3', 'undo4', 'undo5'],
            doings: ['doing1', 'doing2', 'doing3', 'doing4', 'doing5'],
            dones: ['done1', 'done2', 'done3', 'done4', 'done5'],
        }
    },
    mounted() {
        for (var i = 0; i < 5; i++) {
            this.$refs['undo' + i][0].ondragstart = (e) => {
                
            }
            this.$refs['doing' + i][0].ondragstart = (e) => {
                
            }
            this.$refs['done' + i][0].ondragstart = (e) => {
                
            }
        }
    }
}
</script>

<style scoped lang="scss">
#drags {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    
    >div {
        background-color: #eee;
        border: 2px solid #ccc;
        width: 300px;
        height: auto;
        min-height: 56px;

        .title {
            width: 100%;
            height: 56px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #0094ff;
        }

        ul {
            padding: 0;
            margin: 0;
            width: 100%;
            height: auto;
            li {
                list-style: none;
                width: 100%;
                height: 56px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #777;
            }
        }
    }
}
</style>