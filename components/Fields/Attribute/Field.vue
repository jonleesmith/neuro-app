<template>
	<div class="attribute-field select-wrapper">
		<select :name="field.handle" class="select" v-model="field.model">
			<option value="">--- Please select ---</option>
		</select>
	</div>
</template>
<script>
	export default {
		props: ['field', 'row', 'model'],
	}
</script>
