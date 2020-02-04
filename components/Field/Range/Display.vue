<template>
	<div class="range-field" v-if="model[field.handle]">
		<div class="mt-8 scale-select border rounded flex">
			<label class="scale-label text-center border-r m-0"
				v-for="(option, i) in field.options.options" :key="i + 1"
				:style="{ width: `${ (100 / field.options.options.length) }%` }">
				<input type="radio" v-model="score" :value="i + 1" :name="field.handle">
				<span class="block center p-3">{{ i + 1 }}</span>
			</label>
		</div>
		<div class="clearfix mt-2 mb-4 flex">
			<span
				class="text-sm text-grey-dark text-center"
				v-for="option in field.options.options" :key="option"
				:style="{ width: `${(100 / field.options.options.length)}%` }">{{ option }}</span>
		</div>
		<div class="p-8 bg-grey-lightest mt-8 border" v-show="showComments" v-if="model[field.handle]">
			<span class="block mb-4 text-grey-darker">{{ field.options.label }}</span>
			<textarea class="w-full p-4 h-24 border appearance-none resize-none" v-model="model[field.handle].comments"></textarea>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['field', 'row', 'model'],
        data() {
            return {
                showComments: false,
                score: (this.model[this.field.handle]) ? this.model[this.field.handle].score : ''
            }
        },
        watch: {
            "score": function(score) {
                this.model[this.field.handle].score = score
                this.model[this.field.handle].comments = ''

                if ( score == 1 || score == 5 ) {
                    this.showComments = true
                }
                else {
                    this.showComments = false
                }
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
			@apply bg-grey text-white;
			transition: all .3s ease-in-out;
		}
	}
</style>
