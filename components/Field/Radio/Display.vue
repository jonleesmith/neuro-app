<template>
	<div class="radio-field">
		<div class="radio-select flex flex-wrap pt-2">
			<label class="radio-label block py-2 w-1/2 cursor-pointer"
				v-for="i in field.options.options" :key="i">
				<input type="radio" v-model="model[field.handle]" :value="i" :name="field.handle">
				<span class="ml-3 text-lg text-grey-darker">{{ i }}</span>
			</label>
		</div>
		<div class="p-8 bg-grey-lightest mt-8 border" v-show="showComments">
			<span class="block mb-4 text-grey-darker">{{ field.options.label }}</span>
			<textarea class="w-full p-4 h-24 border appearance-none resize-none"></textarea>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['field', 'row', 'model'],
		computed: {
			showComments() {
				return false
			}
		}
	}
</script>
<style lang="scss">
	.scale-label {
		cursor: pointer;

		&:last-child {
			border: none;
		}

		input[type="radio"] {
			display: none;
		}

		input[type="radio"]:checked + span {
			background: #3490dc;
			color: white;
			cursor: pointer;
			transition: all .3s ease-in-out;
		}
	}
</style>
