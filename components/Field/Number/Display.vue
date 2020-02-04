<template>
	<div class="number-field">
		<input :name="field.handle" type="text" v-model="model[field.handle]" class="input" />
	</div>
</template>
<script>
	export default {
		props: ['field', 'row', 'model'],
	}
</script>
