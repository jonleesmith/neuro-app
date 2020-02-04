<template>
    <div class="simple">
        <h1 class="text-4xl font-normal mb-10 flex items-center">
            <span class="pl-2">Neuro</span>
        </h1>
        <nuxt />
    </div>
</template>
<script>

    import AppNotifications from '~/components/Layout/AppNotifications'

    export default {
        middleware: 'guest',
        components: {
            AppNotifications
        }
    }
</script>
<style scoped>
    .simple {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
</style>
