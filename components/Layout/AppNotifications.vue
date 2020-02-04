<template>
	<div class="notification-bar" :class="{ 'visible': notifications.length }">
        <span
            v-for="notification in notifications" :key="notification.type"
            class="notification-message" :class="notification.type">
            {{ notification.message }}.
        </span>
	</div>
</template>
<script>
    import { mapGetters } from 'vuex'

	export default {
        computed: {
            ...mapGetters({
                notifications: 'notifications/messages'
            })
        }
	}
</script>
<style lang="scss">

    .notification-bar {
        // @apply fixed left-0 top-0 w-full text-white text-center;
        @apply fixed w-full text-white text-center;
        transform: translateY(-100px);
        z-index: 10000;
        transition: transform .3s ease-in;

        &.visible {
            transform: translateY(-1px);
            transition: transform .3s ease-out;
        }

        .notification-message {
            @apply inline-block py-3 px-6 rounded rounded-t-none font-bold text-white;
        }

        .success {
            // @apply bg-blue-300;
        }

        .error {
            // @apply bg-red-300;
        }

        p {
            @apply text-xl;
        }

    }

</style>
