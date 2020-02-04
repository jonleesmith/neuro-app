<template>
    <button
        class="icon btn-delete"
        @click.prevent="deleteResource">
        <i class="fa fa-minus-circle"></i>
    </button>
</template>
<script>

    import { mapActions } from 'vuex'

    export default {
        props: ['resource', 'item', 'url'],
        methods: {
            ...mapActions({
                updateCache: 'resources/cacheState'
            }),
            deleteResource() {
                if ( window.confirm(`Are you sure you want to delete '${this.item.name}' and all of its data?`) )
                {
                    let item = this.item
                    this.$axios.delete(`${this.resourceUrl}/${this.item.id}`)
                        .then( res => {
                            this.$emit('success', item)
                            this.updateCache({ resource: this.resource })
                        })
                        .catch( err => {})
                }
            }
        },
        computed: {
            resourceUrl() {
                let fetchUrl = this.url || this.resource
                return ( fetchUrl.charAt(0) == '/' ) ? fetchUrl : `orgs/${this.user.org.id}/${fetchUrl}`
            }
        }
    }
</script>
<style scoped>

    .action .btn-delete {
        .fa {
            @apply text-lg;
        }
    }
    .btn-delete {
        /* @apply text-red-300; */

        &:focus {
            @apply outline-none;
        }
    }
</style>
