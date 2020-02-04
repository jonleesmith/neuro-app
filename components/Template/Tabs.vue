<template>
    <div class="border-b border-grey-lighter flex">
        <div class="relative text-left">
            <div class="tabs">
                <a v-for="tab in tabs"
                    class="tab transition"
                    href="/"
                    :class="{ 'active' : (view == tab.toLowerCase()) }"
                    @click.prevent="setView(tab)">
                    {{ tab }}
               </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tabs: [ 'Settings', 'Recipients', 'Send'],
                view: this.$route.query.tab || 'settings',
                showOptions: false,
            }
        },
        methods: {
            setView(tab) {
                this.view = tab.toLowerCase()
                this.$router.push({
                    path: this.$route.path, query: { tab: this.view }
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .tabs {
        @apply flex justify-end items-center py-2 px-8 rounded bg-grey-light text-grey-dark;
    }

    .tab {
        @apply py-1 px-6 text-grey-darker rounded mr-3 border-transparent border-b-2;

        &.active {
            @apply bg-white text-grey-dark;
        }
    }
</style>
