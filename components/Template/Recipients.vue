<template>
	<div>
        <div class="flex py-8">
            <div class="md:w-1/2">
                <TemplateTabs></TemplateTabs>
            </div>
            <div class="md:w-1/2 text-right">
                <button class="btn bg-green text-white"
                    @click="showImportModal = true">
                    <i class="fa fa-upload"></i>Import Recipients
                    <RecipientsImportModal
                        @close="showImportModal = false"
                        :open="showImportModal"
                        :template="template">
                    </RecipientsImportModal>
                </button>
            </div>
        </div>
        <ResourceIndex :url="recipientsUrl" resource="recipients" :search="false">
            <RecipientItem slot-scope="{ item }" :item="item"></RecipientItem>
        </ResourceIndex>
	</div>
</template>
<script>
	import RecipientItem from '~/components/Template/Recipients/Item'
	import RecipientsImportModal from '~/components/Template/Recipients/ImportModal'
    import TemplateTabs from '~/components/Template/Tabs'
    import ResourceIndex from '~/components/Resource/Index'

	export default {
		components: {
			RecipientItem,
            ResourceIndex,
			RecipientsImportModal,
            TemplateTabs,
		},
		data() {
			return {
				showImportModal: false,
			}
		},
        computed: {
            recipientsUrl() {
                return `surveys/${this.$route.params.id}/templates/${this.$route.params.template}/recipients`
            },
            template() {
                return this.$store.state.resources.templates.item
            }
        }
	}
</script>
