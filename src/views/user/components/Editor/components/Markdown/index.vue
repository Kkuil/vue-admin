<template>
	<div id="markdown">
		<div class="title">
			<h1>Markdown</h1>
			<span>
				<span>This markdown tool is based on </span>
				<a href="https://github.com/nhnent/tui.editor">tui.editor</a>
			</span>
		</div>

		<div class="editor-container">
			<markdown-editor v-model="content" height="800px" />
		</div>
	</div>
</template>
  
<script>
import MarkdownEditor from './components/MarkdownEditor'
export default {
	name: 'Markdown',
	components: { MarkdownEditor },
	data() {
		return {
			content: 'Hello, Welcome to Markdown.',
			tips: ''
		}
	}
}
</script>

<style scoped lang="scss">
#markdown {
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
  