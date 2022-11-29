<template>
    <div id="editor">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Editor'
}
</script>

<style lang="scss" scoped>
#editor {
    width: 100%;
    height: 100%;
}
</style>