<template>
    <div id="drags">
        <div class="title">
            <i class="iconfont icon-drag"></i>
            <h2>Draggable</h2>
        </div>
        <div class="container">
            <div class="basic">
                <h2 class="title">Basic</h2>
                <div class="content">
                    <draggable v-model="basic" chosen-class="chosen" force-fallback="true" animation="1000">
                        <transition-group name="basic">
                            <div v-for="item in basic" :key="item.id" class="item">{{ item.name }}</div>
                        </transition-group>
                    </draggable>
                </div>
            </div>
            <div class="table">
                <h2 class="title">Table</h2>
                <div class="content">
                    <tbody is='draggable' animation="500" force-fallback="true" chosen-class="chosen">
                        <transition-group name="table">
                            <tr v-for="item in table" :key="item.id" class="item">
                                <td class="sub_item">{{ item.id }}</td>
                                <td class="sub_item">{{ item.name }}</td>
                            </tr>
                        </transition-group>
                    </tbody>
                </div>
            </div>
            <div class="multi_column">
                <h2 class="title">MultiColumn</h2>
                <div class="content">
                    <div class="undo">
                        <h2 class="title">undo</h2>
                        <div class="container">
                            <draggable v-model="todos.undos" group="todos" chosen-class="chosen" animation="300">
                                <transition-group name="undo" :style="style">
                                    <div v-for="item in todos.undos" :key="item.id" class="item">{{ item.name }}</div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                    <div class="doing">
                        <h2 class="title">doing</h2>
                        <div class="container">
                            <draggable v-model="todos.doings" group="todos" chosen-class="chosen" animation="300">
                                <transition-group name="doing" :style="style">
                                    <div v-for="item in todos.doings" :key="item.id" class="item">{{ item.name }}</div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                    <div class="done">
                        <h2 class="title">done</h2>
                        <div class="container">
                            <draggable v-model="todos.dones" group="todos" chosen-class="chosen" animation="300">
                                <transition-group name="done" :style="style">
                                    <div v-for="item in todos.dones" :key="item.id" class="item">{{ item.name }}</div>
                                </transition-group>
                            </draggable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'Drags',
    components: {
        draggable
    },
    data() {
        return {
            basic: [
                { id: 1, name: 'www.itxst.com' },
                { id: 2, name: 'www.baidu.com' },
                { id: 3, name: 'www.taobao.com' },
                { id: 4, name: 'www.google.com' }
            ],
            table: [
                { id: 1, name: 'Jerry' },
                { id: 2, name: 'Tom' },
                { id: 3, name: 'Kkuil' },
                { id: 4, name: 'Jack' }
            ],
            todos: {
                undos: [
                    { id: '1', name: '吃饭' },
                    { id: '2', name: '睡觉' },
                    { id: '3', name: '玩电脑' },
                    { id: '4', name: '打豆豆' },
                ],
                doings: [
                    { id: '5', name: 'Coding' },
                    { id: '6', name: 'Sleeping' },
                    { id: '7', name: 'thinking' },
                    { id: '8', name: 'fighting' },
                ],
                dones: [
                    { id: '9', name: '123' },
                    { id: '10', name: '456' },
                    { id: '11', name: '789' },
                    { id: '12', name: '159' },
                ],
            },
            style: 'min-height: 45px; display: block;'
        }
    },
}
</script>

<style scoped lang="scss">
#drags {
    width: 100%;
    height: auto;
    border-top: 0;
    border: 1px solid #eee;


    .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-left: 10px;
        border-top: 3px solid #0094ff;
        transition: all .3s;

        i {
            font-size: 25px;
            margin-right: 8px;
        }
    }

    .container {
        width: 100%;
        height: auto;
        min-height: 45px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        >div {
            width: 300px;
            border: 1px solid #0094ff;
            border-top: 0;
            transition: all .3s ease;

            .title {
                width: 100%;
                height: 50px;
                margin: 0;
                background-color: #0065f1;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .content {
                width: 100%;
                height: auto;

                .item {
                    width: 100%;
                    height: 45px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-top: 1px solid #0094ff;

                    .sub_item {
                        width: 50%;
                        height: 100%;
                        border-right: 1px solid #0094ff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
        }

        .multi_column {
            margin-top: 10px;
            width: 100%;

            .content {
                margin: 10px 0;
                display: flex;
                justify-content: space-around;

                >div {
                    width: 300px;
                    height: auto;
                }
            }
        }

        .chosen {
            background-color: #aad0ec;
        }
    }

}
</style>