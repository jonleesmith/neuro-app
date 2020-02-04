<template>
	<TableView :rows="rows" :columns="columns"></TableView>
</template>
<script>
	import TableView from './Table'
	export default {
		components: {
			TableView
		},
		props: {
			columns: {
				type: Array,
				default: () => []
			},
			rows: {
				type: Array,
				default: () => []
			}
		}
	}
</script>
