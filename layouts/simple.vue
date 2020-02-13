<template>
    <div class="flex min-h-screen">
        <div
            class="bg-gray-800 flex min-h-screen flex items-center justify-center flex-col lg:w-1/3"
        ></div>
        <div
            class="text-center bg-gray-900 min-h-screen flex items-center w-2/3 flex-col pt-12"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="0.75"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-codesandbox w-24 h-24"
            >
                <path
                    d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                />
                <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                <polyline points="7.5 19.79 7.5 14.6 3 12" />
                <polyline points="21 12 16.5 14.6 16.5 19.79" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <h1 class="text-4xl font-normal text-gray-300">
                <span>Welcome to Neuro</span>
            </h1>
            <p class="text-lg text-gray-500 mb-8">Log in to your account.</p>
            <div class="text-left container mx-auto max-w-xl">
                <nuxt />
            </div>
        </div>
    </div>
</template>
<script>
import AppNotifications from "~/components/Layout/AppNotifications";

export default {
    middleware: "guest",
    components: {
        AppNotifications
    }
};
</script>
