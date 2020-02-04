<template>
	<div class="card-view flex flex-row flex-wrap -mx-4">
		<div v-for="(item, key) in rows" :key="key" class="px-4 w-1/3">
			<ul class="p-8 bg-grey-lightest mb-6 border rounded-sm">
				<li v-for="(column, k) in columns" class="mb-3" :key="k" :class="k">
					<strong class="block">{{ column }}:&nbsp;</strong> <slot :name="k" :column="item[k]" :item="item">{{ item[k] }}</slot><br/>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import Draggable from 'vuedraggable'

	export default {
		components: {
			Draggable
		},
		props: {
			columns: {
				type: Object,
				default: () => {}
			},
			rows: {
				type: Array,
				default: () => []
			}
		}
	}
</script>
