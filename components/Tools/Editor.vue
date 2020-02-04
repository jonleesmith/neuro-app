<template>
    <div class="relative">
        <div><button class="btn bg-green text-white" @click="save">Save</button></div>
        <Editor
            :autofocus="true"
            :init-data="initData"
            ref="editor"
            @save="onSave"
            @ready="onReady"
            @change="onChange"
        />
    </div>
</template>

<script>
export default {
    data () {
        return {
            initData: {}
        }
    },
    mounted() {
        console.log(this.$refs.editor)
    },
    methods: {
        save () {
            this.$refs.editor.save();
        },
        onSave (response) {
            console.log(JSON.stringify(response))
        },
        onReady () {
            console.log('ready')
        },
        onChange () {
            console.log('changed')
        }
    }
}
</script>

<style>

</style>
