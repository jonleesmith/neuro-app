<template>
    <div class="simple bg-gray-900">
        <div class="mb-12 text-center">
            <h1 class="text-5xl font-normal text-gray-200 flex items-center">
                <span class="pl-2">Welcome to Neuro</span>
            </h1>
            <p class="text-xl text-gray-500">Log in to your account.</p>
        </div>
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
