<template>
    <div class="not_find">
        <img src="@/assets/404_images/404.png" />
        <img src="@/assets/404_images/404_cloud.png" />
    </div>
</template>

<script>
export default {
    name: 'NotFind',
    mounted() {
        setTimeout(() => {
            this.$router.replace({
                name: 'index'
            })
        }, 1500)
    }
}
</script>

<style scoped lang="scss">
.not_find {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 600px;
        height: 400px;
    }
}
</style>