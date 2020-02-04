<template>
    <div class="widget w-full md:w-1/2">
        <div class="widget-header">
            <p class="w-full">
                <span v-if="showWidgetSettings">Settings - </span>
                <span v-if="widget.label">{{ widget.label }}</span>
                <span v-else>{{ ( widget.row != null ) ? widget.row.field.name : widget.type }}</span>
            </p>
            <p class="widget-settings" v-if="survey.id == widget.survey_id">
                <button @click.prevent="showWidgetSettings = !showWidgetSettings"><i class="fa fa-cog"></i></button>
            </p>
        </div>
        <div class="widget-container">
            <template v-if="showWidgetSettings">
                <SurveyDashboardWidgetSettings
                    @updated="showWidgetSettings = false"
                    :widget="widget">
                </SurveyDashboardWidgetSettings>
            </template>
            <template v-else>
                <component :is="`WidgetType${widget.type}Display`" :widget="widget"></component>
            </template>
        </div>
    </div>
</template>

<script>

    import SurveyDashboardWidgetSettings from '~/components/Survey/Dashboard/Widget/Settings'
    import WidgetTypePerformanceByFieldDisplay from '~/components/Survey/Dashboard/Widget/Type/PerformanceByField/Display'
    import WidgetTypePerformanceByAttributeDisplay from '~/components/Survey/Dashboard/Widget/Type/PerformanceByAttribute/Display'

    import { mapGetters } from 'vuex'

    export default {
        components: {
           WidgetTypePerformanceByFieldDisplay,
           WidgetTypePerformanceByAttributeDisplay,
           SurveyDashboardWidgetSettings
        },
        props: {
            row: Object,
            widget: Object
        },
        data() {
            return {
                showWidgetSettings: this.widget.type == null ,
            }
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
            })
        }
    }
</script>

<style>

    .widget {
        @apply pr-8 pb-8 pt-0;
    }

    .widget-container {
        @apply relative bg-white shadow;
    }

    .widget-settings {
        @apply text-right;
    }

    .widget-settings button {
        @apply text-base text-grey-dark
    }

    .widget-header {
        @apply relative bg-white p-8 flex items-center border-b border-grey-lighter text-xl text-grey-darker;
    }

    .widget-inner {
        @apply p-8 pl-6;
    }

    canvas {
        width: 100%;
    }

</style>
