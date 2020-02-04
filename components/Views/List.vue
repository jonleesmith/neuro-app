<template>
	<div class="list-view">
		<div class="mb-8">
			<div v-for="(item, key) in rows" :key="key"
				class="transition cursor-pointer p-6 mb-6 border rounded hover:bg-grey-lighter"
				@click.prevent="selected.push(key)" :class="{ 'bg-grey-light': ( selected.indexOf(key) != -1 ) }">
				<span class="block mb-2">{{ item.name }}</span>
				<span class="block text-grey-dark text-sm">Created {{ item.created_at }}</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			columns: {
				type: Object,
				default: () => {}
			},
			rows: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				selected: []
			}
		}
	}
</script>
