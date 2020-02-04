<template>
    <button class="btn-toolbar relative" @click.prevent="createWidget">
        <i class="fa fa-plus"></i> Create Widget
    </button>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        methods: {
            createWidget(option) {
                this.showOptions = false
                this.$axios.post(`orgs/${this.user.org.id}/surveys/${this.survey.id}/widgets`)
                .then( res => {
                    this.addSurveyWidget({
                        widget: res.data.data
                    })
                })
            },
            ...mapActions({
                addSurveyWidget: 'resources/addSurveyWidget'
            })
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey'
            })
        }
    }
</script>

<style>
    .dropdown-select a {
        @apply tracking-normal text-base text-grey-darker;
        text-transform: none;
        text-align: left;
    }
</style>
