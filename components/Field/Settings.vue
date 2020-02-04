<template>
    <div>
        <ul>
            <li>
                <strong>Owner</strong>
                <div>
                    {{ item.org.name }}
                    <span class="ml-3 py-1 text-xs uppercase px-2 bg-grey text-white rounded">
                        {{ scope }}
                    </span>
                </div>
            </li>
            <li>
                <strong>Name</strong>
                <div>{{ item.name }}</div>
            </li>
            <li>
                <strong>Handle</strong>
                <div>{{ item.handle }}</div>
            </li>
            <li>
                <strong>Label</strong>
                <div v-html="item.label"></div>
            </li>
            <li>
                <strong>Instructions</strong>
                <div v-html="item.instructions"></div>
            </li>
            <li>
                <strong>Type</strong>
                <div>{{ item.type }}</div>
            </li>
            <li>
                <strong>Options</strong>
                <div>
                    <textarea disabled="" class="font-mono w-full h-32 border p-6 leading-loose bg-black text-white">{{ item.options }}</textarea>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['item'],
        computed: {
            scope() {
                return (this.item.org_id === 1) ? 'global' : 'local'
            }
        }
    }
</script>
<style scoped>
    li {
        @apply flex mb-2 w-full;
    }
    div,
    p {
        @apply w-full text-grey;
    }
    strong {
        @apply text-grey-darker block w-48;
    }
</style>
