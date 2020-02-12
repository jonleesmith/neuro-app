<template>
    <ElementIndex :controller="entries" :search="true"></ElementIndex>
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
