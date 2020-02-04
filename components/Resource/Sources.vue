<template>
	<div class="data-sources" v-if="sources">
		<nav class="sources">
			<div v-for="(source, key) in sources" :key="key" class="mb-8">
				<p class="heading font-xs py-4 px-8 mb-4">{{ source.label }}</p>
				<ul>
					<li v-for="( label, query ) in source.options" :key="query">
						<a href="" :class="{ 'bg-grey-light': (activeQuery == query) }" class="rounded-tr rounded-br block text-black font-normal py-2 px-8" @click.prevent="setActiveQuery(query)">{{ label }}</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>
<script>
	export default {
		props: {
			sources: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				activeQuery: ''
			}
		},
		methods: {
			setActiveQuery(query) {
				console.log(query);
				this.activeQuery = query;
				this.$emit('query-change', query);
			}
		}
	}
</script>
