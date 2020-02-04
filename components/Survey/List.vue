<template>
	<TableView :columns="columns" :rows="rows">
		<span slot="name" slot-scope="{ column, item }">
			<nuxt-link class="block mb-2" :to="{ name: `surveys-id-overview`, params: { id: item.id } }">
				{{ column }}
			</nuxt-link>
			<span class="text-grey-dark text-sm">Created {{ item.created_at }}</span>
		</span>
		<span slot="edit" slot-scope="{ column, item }">
			<nuxt-link class="block icon" :to="{ name: `surveys-id-design`, params: { id: item.id } }">
				<i class="fa fa-edit text-2xl mb-3"></i>
				<span class="block text-grey text-sm">Design</span>
			</nuxt-link>
		</span>
		<span slot="invites" slot-scope="{ column, item }">
			<nuxt-link :to="{ name: `surveys-id-templates`, params: { id: item.id }  }" class="block icon">
				<i class="fa fa-user-plus text-2xl mb-3"></i>
				<span class="block text-grey text-sm">Templates</span>
			</nuxt-link>
		</span>
		<span slot="dashboard" slot-scope="{ column, item }">
			<nuxt-link :to="{ name: `surveys-id-dashboard`, params: { id: item.id } }" class="block icon">
				<i class="fa mr-0 fa-chart-bar text-2xl mb-3"></i>
				<span class="block text-grey text-sm">Dashboard</span>
			</nuxt-link>
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
					{ field: 'name', label: "Title" },
					{ field: 'updated_at', label: "Updated" },
					{ field: 'edit', label: "Design" },
					{ field: 'invites', label: "Templates" },
					{ field: 'dashboard', label: "Dashboard" },
				]
			}
		},
		methods: {
			statusText(i) {
				return ['draft','live','closed'][i];
			}
		}
	}
</script>
