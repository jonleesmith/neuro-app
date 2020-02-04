<template>
	<div class="text-field">
		<template v-if="field.options.multiline">
			<textarea :name="field.handle" v-model="model[field.handle]" class="mt-4 textarea"></textarea>
		</template>
		<template v-else>
			<input :name="field.handle" type="text" v-model="model[field.handle]" class="input" />
		</template>
	</div>
</template>
<script>
	export default {
		props: ['field', 'row', 'model'],
	}
</script>
