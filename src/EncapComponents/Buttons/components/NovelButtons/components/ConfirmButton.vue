<template>
	<button id="confirm_button">Confirm</button>
</template>

<script>
export default {
	name: "ConfirmButton",
};
</script>

<style scoped lang="scss">
#confirm_button {
	cursor: pointer;
	width: auto;
	height: 40px;
	border: 0;
	border-radius: 20px;
    padding: 0 20px;
	color: #fff;
	background-color: rgb(125, 66, 244);
    transition: all .3s;
	&:hover {
		box-shadow: 0 0 10px 5px rgb(162, 118, 220);
	}
}
</style>