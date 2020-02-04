<template>
	<header class="app-header py-2 bg-white clearfix text-center shadow">
		<div class="flex px-8">
            <div class="flex items-center">
                <button class="mr-2"><i class="fa fa-bars text-sm"></i></button>
                <p class="text-3xl text-gray-darkest lowercase font-bold">
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
        @apply font-normal text-2xl text-gray-900;
        letter-spacing: 0px;
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
