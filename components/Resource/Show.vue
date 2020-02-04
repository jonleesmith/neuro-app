<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>

    import { mapActions } from 'vuex'

	export default {
		props: {
            resource: String,
            url: String,
            params: String
        },
        async mounted() {
            let url = this.url
            let org = this.user.org.id
            this.resourceUrl = ( url ) ? ( url.charAt(0) == '/' ) ? url : `orgs/${org}/${url}` : `orgs/${org}/${this.resource}`
            this.fetchItem({
                resource: this.resource,
                url: this.resourceUrl
            })
        },
        methods: {
            ...mapActions({
                fetchItem: 'resources/fetchItem',
            }),
        },
        computed: {
            items() {
                return this.$store.state.resources[this.resource].item
            }
        }
	}
</script>
