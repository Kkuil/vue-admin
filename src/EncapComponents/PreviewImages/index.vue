<template>
    <div id="preview">
        <div class="images">
            <!-- 图片 -->
            <div v-for="image in images" :key="image.src" class="image" :style="`background: url(${image.src});`"></div>
        </div>
        <!-- 关闭 -->
        <slot name="close"></slot>
    </div>
</template>

<script>
export default {
    name: 'Preview',
    props: {
        images: {
            type: Array,
            required: true
        },
        firstShowImgIndex: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
#preview {
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(65, 62, 62, 0.582);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: preview 1s;

    @keyframes preview {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .images {
        width: 100%;
        height: 500px;
        display: flex;

        .image {
            position: relative;
            width: 500px;
            height: 500px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            background-size: cover !important;
            background-position: 50% !important;
            background-repeat: no-repeat !important;
        }


    }

    .iconfont {
        cursor: pointer;
        position: fixed;
        top: 20px;
        right: 20px;
        font-size: 50px;
        transition: color .3s;

        &:hover {
            color: #0094ff;
        }
    }
}
</style>