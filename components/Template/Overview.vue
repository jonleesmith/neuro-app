<template>
	<div class="flex">
		<div class="w-1/4 p-10 bg-white border-r border-grey-lighter">
			<span class="block mb-2 text-grey-dark">Total Responses</span>
			<span style="font-size: 6rem;">
                {{ template.responses ? template.responses.length: '0' }}
            </span>
		</div>
	</div>
</template>
<script>
    import { mapGetters } from 'vuex'

	export default {
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
                template: 'resources/template',
            })
        }
	}
</script>
