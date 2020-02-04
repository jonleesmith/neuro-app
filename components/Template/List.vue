<template>
	<TableView :columns="columns" :rows="rows">
        <span slot="name" slot-scope="{ column, item }">
            <nuxt-link class="block mb-2"
            :to="{ name: `surveys-id-templates-template`, params: {
                id: item.survey_id, template: item.id
            } }">{{ column }}</nuxt-link>
            <span class="text-grey-dark text-sm">Created {{ item.created_at }}</span>
        </span>
		<span slot="responses" slot-scope="{ column, item }">{{ item.responses.length  }}</span>
		<span slot="recipients" slot-scope="{ column, item }">
			<nuxt-link class="block icon" :to="{
				name: `surveys-id-templates-template`,
				params: { id: item.survey_id, template: item.id },
				query: { tab: 'recipients' }
			}">
				<i class="fa fa-envelope text-2xl mb-3"></i>
				<span class="block text-grey text-sm">Recipients</span>
			</nuxt-link>
		</span>
		<span slot="settings" slot-scope="{ column, item }">
			<nuxt-link class="block icon" :to="{
				name: `surveys-id-templates-template`,
				params: { id: item.survey_id, template: item.id },
				query: { tab: 'settings' }
			}">
				<i class="fa fa-cog text-2xl mb-3"></i>
				<span class="block text-grey text-sm">Settings</span>
			</nuxt-link>
		</span>
		<span slot="send" slot-scope="{ column, item }">
			<nuxt-link class="block icon" :to="{
				name: `surveys-id-templates-template`,
				params: { id: item.survey_id, template: item.id },
				query: { tab: 'send' }
			}">
				<i class="fa fa-location-arrow text-2xl mb-3"></i>
				<span class="block text-grey text-sm">Send</span>
			</nuxt-link>
		</span>
		<span :class="statusText(column)" slot="status" slot-scope="{column}">
			{{ statusText(column) }}
		</span>
	</TableView>
</template>

<script>
	import TableView from '../Views/Table'

	export default {
		components: {
			TableView
		},
		props: ['rows'],
		data() {
			return {
				columns: [
                    { field: 'name', label: 'Name' },
					{ field: 'status', label: 'Status' },
					{ field: 'responses', label: 'Responses' },
					{ field: 'updated_at', label: 'Updated' },
					{ field: 'recipients', label: 'Recipients' },
					{ field: 'settings', label: 'Settings' },
					{ field: 'send', label: 'Send' },
				]
			}
		},
		methods: {
			statusText(i) {
				return ['draft','live','closed'][i];
			},
			methodText(i) {
				return ['Email'][i];
			},

		}
	}
</script>
