<template>
	<div class="range-field">
		<div class="clearfix mt-8 mb-4">
			<span class="text-sm text-grey-dark float-left">Not at all</span>
			<span class="text-sm text-grey-dark float-right text-right">Extremely</span>
		</div>
		<div class="scale-select border rounded flex">
			<label
                class="scale-label text-center border-r m-0"
				v-for="i in 11" :key="i"
			     style="width: 10%">
				<input type="radio" v-model="score" :value="i - 1" :name="field.handle">
				<span class="block center p-3">{{ i - 1 }}</span>
			</label>
		</div>
		<div class="p-8 bg-grey-lightest mt-8 border" v-show="showComments">
			<span class="block mb-4 text-grey-darker">{{ field.options.label }}</span>
			<textarea v-model="model[field.handle].comments" class="w-full p-4 h-24 border appearance-none resize-none"></textarea>
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

                if ( score <= 6 || score >= 9 ) {
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
			background: #3490dc;
			color: white;
			cursor: pointer;
			transition: all .3s ease-in-out;
		}
	}
</style>
