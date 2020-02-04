<template>
    <div class="bg-white border-b border-grey-lighter p-8 mb-4 shadow rounded-sm">
        <div>
            <FieldSettings :item="item"></FieldSettings>
        </div>
    </div>
</template>

<script>
    import FieldSettings from '~/components/Field/Settings'

    export default {
        props: ['item'],
        components: {
            FieldSettings
        },
    }
</script>
