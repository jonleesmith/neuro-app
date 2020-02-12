<template>
	<section class="section">
        <div class="flex mb-6 items-center">
            <h1 class="flex-1">Collection > Entries</h1>
            <a href="http://statamic-starter.test/cp/collections/create" class="btn bg-primary text-white">Create Entry</a>
        </div>
		<nuxt-child></nuxt-child>
	</section>
</template>
<script>

    import ElementIndex from '~/components/Element/Index'
    import EntriesController from '~/controllers/Entries'

    import { mapActions } from 'vuex'

	export default {
        layout: 'default',
        header: {
            title: 'Entries'
        },
		components: {
			ElementIndex,
		},
		data() {
			return {
                showToolbar: true,
                // controller: new entries
			}
		},
        methods: {},
        computed: {
            entries() {
                let entries = new EntriesController(this)
                entries.endpoint = `entries/${this.$route.params.collection}`
                return entries
            }
        }
	}
</script>
