<template>
	<header class="bg-white clearfix flex text-center shadow">
		<div class="flex">
            <div class="flex items-center w-1/3 bg-gray-900">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 feather feather-menu mr-2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </div>
                <p class="text-2xl text-gray-700 lowercase font-medium">
                   Neuro
                </p>
            </div>
            <div>
                <!-- {{ sites.length }} -->
            </div>
        </div>
	</header>
</template>
<script>
	import { mapGetters } from 'vuex'

	export default {

        mounted() {
            console.log(this.$neuro)
        }

	}
</script>
<style>
    .app-header h1 {
        @apply font-normal text-xl text-gray-900;
        letter-spacing: 0px;
        height: 100px;
    }

    @screen md {
        .app-header h1 {
            @apply text-3xl;
        }
    }

    .app-header h1 .fa {
        @apply relative text-blue-500 text-base;
        top: -5px;
    }

    .app-header a {
        @apply inline-block uppercase text-sm tracking-wide border-b-2 border-transparent mx-2 pb-1 px-1;
    }

    .app-header .nuxt-link-active {
        @apply border-blue-500;
    }
</style>
