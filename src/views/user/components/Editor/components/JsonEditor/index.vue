<template>
	<div id="json_editor">
		<div class="title">
			<h1>Json-Editor</h1>
			<span>
				<span>Json-Editor is based on </span>
				<a href="https://github.com/codemirror/CodeMirror">codemirror</a>
			</span>
		</div>
		<div class="editor-container">
			<JsonEditor ref="jsonEditor" v-model="value" />
		</div>
	</div>
</template>

<script>
import JsonEditor from './components/JsonEditor'

export default {
	name: 'JsonEditorDemo',
	components: { JsonEditor },
	data() {
		return {
			value: JSON.parse('{"json-editor": "Hello"}')
		}
	}
}
</script>

<style scoped lang="scss">
#json_editor {
	width: 100%;
	height: 100%;
	.editor-container {
		position: relative;
		height: 100%;
	}

	.title {
		width: 100%;
		height: 70px;
		margin: 0;
		padding-left: 15px;
		border-top: 3px solid #0094ff;
		display: flex;
		align-items: center;

		>span {
			margin-top: 10px;
			margin-left: 5px;

			>a {
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
  
  