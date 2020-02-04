<template>
    <div>
        <div class="widget-inner">
            <div class="form-row">
                <label for="">Label</label>
                <input class="input" type="text" v-model="activeWidget.label" placeholder="Label">
                <span class="block mt-2 text-grey text-sm">This will default to the field name if not set.</span>
            </div>
            <div class="form-row">
                <label for="">Type</label>
                <div class="flex">
                    <label v-for="type in widgetTypes"
                        class="block text-center mr-4 rounded py-2 px-4 border border-transparent transition cursor-pointer"
                        :class="{ 'bg-blue text-white': (activeWidget.type == type.value) }">
                        <input class="mr-2" type="radio" :value="type.value" v-model="activeWidget.type">
                        <span>{{ type.label }}</span>
                    </label>
                </div>
            </div>
            <component :is="`widget-type-${activeWidget.type}-settings`" v-if="activeWidget.type" :widget="activeWidget"></component>
        </div>
        <div class="px-6 py-4 border-t border-grey-lighter">
            <button class="uppercase text-sm tracking-wide btn bg-green-light text-white mr-4" @click.prevent="updateWidget">Save</button>
            <button class="uppercase text-sm tracking-wide btn border border-red-light bg-white text-red-light" @click.prevent="deleteWidget">Delete</button>
        </div>
    </div>
</template>
<script>

    import WidgetTypePerformanceByFieldSettings from '~/components/Survey/Dashboard/Widget/Type/PerformanceByField/Settings'
    import WidgetTypePerformanceByAttributeSettings from '~/components/Survey/Dashboard/Widget/Type/PerformanceByAttribute/Settings'

    import { mapGetters, mapActions } from 'vuex'

    export default {
        components: {
            WidgetTypePerformanceByFieldSettings,
            WidgetTypePerformanceByAttributeSettings,
        },
        props: {
            widget: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                widgetTypes: [
                    {
                        value: 'PerformanceByField',
                        label: 'Performance By Field',
                        icon: 'chart-pie',
                    },
                    {
                        value: 'PerformanceByAttribute',
                        label: 'Performance By Attribute',
                        icon: 'chart-bar',
                    },
                    // {
                    //     value: 'Analysis',
                    //     label: 'Analysis',
                    //     icon: 'chart-bar',
                    // },
                    // {
                    //     value: 'TotalSubmissions',
                    //     label: 'Total Submissions',
                    //     icon: 'list-ol',
                    // },
                ],
                activeWidget: {
                    row_id: null,
                    label: '',
                    options: {
                        attribute: '',
                    },
                    order: 1,
                    type: 'PerformanceByField',
                    ...this.widget
                },
                response: null,
            }
        },
        methods: {
            ...mapActions({
                updateSurveyWidget: 'resources/updateSurveyWidget',
                deleteSurveyWidget: 'resources/deleteSurveyWidget',
            }),
            updateWidget() {
                this.$axios.put(`orgs/${this.user.org.id}/surveys/${this.survey.id}/widgets/${this.widget.id}`, this.activeWidget)
                .then( response => {
                    this.activeWidget = response.data.data
                    this.updateSurveyWidget({
                        widget: this.activeWidget
                    })
                    this.$emit('updated')
                })
            },
            deleteWidget() {
                if ( window.confirm('Are you sure you want to remove this widget') )
                {
                    this.$axios.delete(`orgs/${this.user.org.id}/surveys/${this.survey.id}/widgets/${this.widget.id}`)
                    .then( response => {
                        this.deleteSurveyWidget({ widget: this.activeWidget })
                        this.$emit('deleted')
                    })
                }
            }
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey'
            }),
        }
    }
</script>
