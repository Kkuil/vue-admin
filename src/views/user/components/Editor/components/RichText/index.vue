<template>
	<div id="rich_text">
		<div class="title">
			<h1>Rich Text</h1>
			<span>
				<span>If you want more information about
					Tinymce, you
					can visit its official
					Chinese website</span>
				<a href="http://tinymce.ax-z.cn/">(tinymce).</a>
			</span>
		</div>
		<div>
			<tinymce v-model="content" :height="800" />
		</div>
	</div>
</template>

<script>
import Tinymce from './components/Tinymce'

export default {
	name: 'RichText',
	components: { Tinymce },
	data() {
		return {
			content: `<span>Now start your first rich text!</span>`,
		}
	}
}
</script>

<style scoped lang="scss">
#rich_text {
	width: 100%;
	height: 100%;

	.title {
		width: 100%;
		height: 70px;
		margin: 0;
		padding-left: 15px;
		border-top: 3px solid #0094ff;
		display: flex;
		align-items: center;
		> span {
			margin-top: 10px;
			margin-left: 5px;
			> a {
				color: #0095ff93;
				transition: color .3s;
				&:hover {
					color: #0095ffe0;
				}
			}
		}
	}
}
</style>