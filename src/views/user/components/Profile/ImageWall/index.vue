<template>
    <div id="image_wall"></div>
</template>

<script>
export default {
    name: 'ImageWall'
}
</script>

<style scoped lang="scss">
#image_wall {
    width: 100%;
    height: 100%;
    background-image: url('http://127.0.0.1:3000/tools/loading.gif');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
</style>