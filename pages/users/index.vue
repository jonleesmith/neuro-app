<template>
    <section class="section">
        <ResourceIndex resource="entries" :schema="schema" @created="created">
        </ResourceIndex>
    </section>
</template>
<script>

    import ResourceIndex from '~/components/Resource/Index'
    import { mapActions } from 'vuex'

    export default {
        layout: 'default',
        head: {
            title: 'Entries'
        },
        components: {
            ResourceIndex,
        },
        data() {
            return {
            }
        },
        methods: {
        }
    }
</script>
