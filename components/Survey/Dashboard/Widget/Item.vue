<template>
    <div class="widget w-full md:w-1/2">
        <div class="widget-header">
            <p class="w-full">
                <span>{{ ( widget.row != null ) ? widget.row.field.name : widget.type }}</span>
            </p>
        </div>
        <div class="widget-container">
            <div class="widget-inner">
                <component :is="`WidgetField${widget.row.field.type}`" :widget="widget"></component>
            </div>
        </div>
    </div>
</template>

<script>

    import WidgetFieldRange from '~/components/Survey/Dashboard/Widget/Field/Range'

    import { mapGetters } from 'vuex'

    export default {
        components: {
          WidgetFieldRange
        },
        props: {
            row: Object,
            widget: Object
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
