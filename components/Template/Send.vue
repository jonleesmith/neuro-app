<template>
    <div>
        <div class="py-8">
            <TemplateTabs></TemplateTabs>
        </div>
        <div class="send-list" v-if="sending"></div>
        <div class="w-full p-8 bg-white text-center shadow border border-grey-lighter" v-if="!sent">
            <button
                :disabled="sending"
                @click.prevent="sendEmail"
                type="button"
                class="px-8 rounded py-6 text-xl bg-green text-white ml-4">
                <i class="fa fa-paper-plane"></i>
                <span v-if="sending">Sending...</span>
                <span v-else>Schedule & Send</span>
            </button>
        </div>
    </div>
</template>
<script>

    import TemplateTabs from '~/components/Template/Tabs'
    import Draggable from 'vuedraggable'
    import { mapActions, mapGetters } from 'vuex'

	export default {
        components: {
            Draggable,
            TemplateTabs,
        },
		data() {
			return {
				sent: false,
                sending: false,
                response: null,
			}
		},
		methods: {
			sendEmail() {
                this.sending = true
				this.$axios.post(`orgs/${this.user.org.id}/surveys/${this.survey.id}/templates/${this.template.uuid}/send`)
					.then( res => {
						this.sent = true
                        this.sending = false
					})
			},
		},
        computed: {
            template() {
                return this.$store.state.resources.templates.item
            },
            survey() {
                return this.$store.state.resources.surveys.item
            }
        },
	}
</script>
