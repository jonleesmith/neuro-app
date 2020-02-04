<template>
    <button @click.prevent="refreshResponses"
        class="mx-4 py-1 px-4 rounded bg-grey-light text text-grey-dark icon"><i class="fa fa-sync"></i>
    </button>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        methods: {
            ...mapActions({
                fetchResponses: 'dashboard/fetchResponses'
            }),
            refreshResponses() {
                this.fetchResponses({
                    org: this.user.org.id,
                    survey: this.survey.id
                })
            }
        }
    }
</script>
