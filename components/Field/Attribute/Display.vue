<template>
	<div class="attribute-field">
		<div class="select-wrapper">
            <select :name="field.handle" class="select" v-model="model[field.handle]">
                <option value="">--- Please select ---</option>
                <option :value="option.name" v-for="option in row.attributes" v-if="row.attributes">
                    {{ option.name }}
                </option>
                <option value="other">Other</option>
            </select>
        </div>
	</div>
</template>
<script>
	export default {
		props: ['field', 'row', 'model'],
	}
</script>
