<template>
    <div class="relative">
        <div v-if="loading" class="loading-container">
            <AppLoading></AppLoading>
        </div>
        <div class="widgets-container" :class="{ 'working': (loading) }">
            <template v-for="fieldset in survey.fieldsets">
                <DashboardWidgetItem
                    v-for="(row, key) in fieldset.rows"
                    :key="`row-${fieldset.id}-${row.id}`"
                    v-if="row.field.type == 'Range'"
                    :widget="{ row }"
                    :row="row">
                </DashboardWidgetItem>
            </template>
        </div>
    </div>
</template>
<script>

    import DashboardWidgetItem from '~/components/Survey/Dashboard/Widget/Item'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {
            DashboardWidgetItem
        },
        data() {
            return {
                surveyWidgets: [],
            }
        },
        methods: {
            ...mapActions({
                fetchResponses: 'dashboard/fetchResponses',
                fetchItems: 'resources/fetchItems',
            })
        },
        mounted() {
            this.fetchResponses({
                org: this.user.org.id,
                survey: this.$route.params.id,
                set: ( this.dataSets.length === 0 ),
            })
        },
        computed: {
            ...mapGetters({
                responses: 'dashboard/responses',
                survey: 'resources/survey',
                dataSets: 'dashboard/dataSets',
                widgets: 'resources/widgets',
                loading: 'dashboard/loading',
            }),
        }
    }
</script>
<style>
    .working {
        opacity: .1;
    }
    .loading-container {
        @apply absolute pin-t pin-l w-full;
        z-index: 1000;
    }
</style>
