<template>
	<div id="main_page">
		<div class="title">
			<span>基本信息</span>
		</div>
        <div class="user_info">
            
        </div>
	</div>
</template>

<script>
export default {
	name: "MainPage",
};
</script>

<style scoped lang="scss">
#main_page {
    width: 100%;
    height: 100%;
	.title {
		width: 100%;
		height: 8%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		color: #777;
		font-size: 15px;
		padding-left: 10px;
	}
}
</style>