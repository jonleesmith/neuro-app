<template>
    <div class="widget-inner">
        <WidgetFieldRange :widget="widget"></WidgetFieldRange>
    </div>
</template>
<script>
    import WidgetFieldRange from '~/components/Survey/Dashboard/Widget/Field/Range'

    export default {
        props: {
            widget: {
                type: Object,
                required: true,
            },
        },
        components: {
            WidgetFieldRange
        }
    }

</script>
