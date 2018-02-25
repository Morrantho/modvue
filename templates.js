const html =`<div>
	<h1>{{ title }} component success!</h1>
</div>`

const css =`h1{
	color:#41B883;
}
`

const js =`import Vue from "vue";

class Component extends Vue{
	constructor(props){
		super(props);

		this.title = "Component";
	}
}

export default Component;`

const vue =`<template src="./Component.html"></template>
<style src="./Component.css"></style>
<script src="./Component.js"></script>
`

const imp = `import Component from './components/Component/Component.vue'`

module.exports = {
	html:html,
	css:css,
	js:js,
	vue:vue,
	imp:imp,
}
