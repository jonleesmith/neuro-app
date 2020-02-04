<template>
	<div class="p-8">
		<table class="w-full">
			<thead>
               <tr>
                    <td v-for="(column, i) in columns" :key="i"
                        class="py-4 pr-6 border-grey-light uppercase text-xs tracking-wide text-grey-dark border-b">
                        <strong>{{ column }}</strong>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, r) in rows" :key="r">
                    <td class="text-sm py-4 pr-6" v-for="(column, i) in columns" :key="i">{{ row[column] }}</strong></td>
                </tr>
            </tbody>
		</table>
		<div class="clearfix mt-10 pt-8 border-t border-grey-lighter">
			<button type="button" class="btn border border-grey-lighter" style="color: #656565" @click.prevent="$emit('cancel')">
                &larr; Back
            </button>
			<button :disabled="working" type="button" class="btn bg-green text-white float-right" @click.prevent="saveRecipients">
                <span v-if="working">Saving...</span>
                <span v-else>+ Save Recipients</span>
            </button>
		</div>
	</div>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

	export default {
		props: ['csv'],
		data() {
			return {
				recipients: this.csv,
                working: false
			}
		},
		methods: {
			saveRecipients() {
                this.working = true
				this.$axios.post(`orgs/${this.user.org.id}/surveys/${this.survey.id}/templates/${this.template.id}/recipients`, {
                        recipients: this.recipients
                    })
					.then( r => {
                        this.working = false
						this.$store.commit('invitations/ADD_ITEM_RECIPIENTS', r.data.data)
                        this.$emit('close')
					})
					.catch( err => {
						console.error(err)
					})
			}
		},
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
                template: 'resources/template',
            }),
            columns() {
                return Object.keys(this.csv[0])
            },
            rows() {
                return this.csv;
            }
        }
	}
</script>
