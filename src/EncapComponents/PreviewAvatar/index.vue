<template>
    <div id="preview">
        <div class="image">
            <!-- 图片 -->
            <div class="img" :style="`background: url(${image.src});`" :title="image.title"></div>
            <!-- 标题 -->
            <span class="title" name="title">{{ image.title }}</span>

        </div>
        <!-- 关闭 -->
        <slot name="close"></slot>
    </div>
</template>

<script>
export default {
    name: 'Preview',
    props: {
        image: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
#preview {
    z-index: 999999;
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

    .image {
        position: relative;
        width: 300px;
        height: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .img {
            width: 300px;
            height: 300px;
            border-radius: 50%;
            overflow: hidden;
            background-size: cover !important;
            background-position: 50% !important;
            background-repeat: no-repeat !important;
        }

        .title {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 50px;
            color: #fff;
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