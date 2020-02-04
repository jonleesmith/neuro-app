<template>
    <div>
        <button type="button" class="btn-toolbar icon" @click.prevent="toggleToolbar">
            <span class="text-xs uppercase tracking-wide mr-2">Filters</span><i class="fa fa-sliders-h text-grey-darker"></i>
        </button>
    </div>
</template>
<script>

    import { mapActions } from 'vuex'

    export default {
        components: {
            // DashboardConfigWidgetCreate
        },
        data() {
            return {
                showOptions: false
            }
        },
        methods: {
            ...mapActions({
                toggleToolbar: 'dashboard/toggleToolbar'
            })
        }
    }
</script>
<style>
    .btn-toolbar {
        @apply py-2 px-3 text-grey-darker uppercase text-xs tracking-wide rounded-full rounded;
    }

    .btn-toolbar:hover,
    .btn-toolbar.active {
        @apply bg-white
    }
</style>
