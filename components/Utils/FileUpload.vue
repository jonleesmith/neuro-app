<template>
    <div>
        <label @dragleave="active = false" @dragexit="active = false" @dragenter="dragEnter" @dragover="dragOver" @drop="drop" class="border py-12 px-4 rounded block text-center cursor-pointer transition" :class="{'border-grey-dark shadow': active }">
            <span class="block text-xl"><i class='text-grey-dark fa fa-upload'></i> {{ message }}</span>
            <input class="hidden" type="file" ref="uploadField" @change="handleFileChange($event.target.files)">
            <div class="text-center mt-8" v-if="file">
                <span class="px-4 py-2 bg-grey-lightest border border-grey-lighter rounded">
                    {{ file.name }}
                    <span class="ml-1 text-xs" @click.prevent="removeFile">
                        <i class="fa fa-times-circle"></i>
                    </span>
                </span>
            </div>
        </label>
    </div>
</template>
<script>
    export default {
        props: {
            message: {
                type: String,
                default: 'Drag and drop or select a file to upload'
            }
        },
        data() {
            return {
                active: false,
                progress: 0,
                file: ''
            }
        },
        methods: {
            removeFile() {
                this.file = ''
                this.$emit('remove', this.file)
            },
            handleFileChange(files) {

                if ( files.length === 0 ) {
                    return ''
                }

                let reader = new FileReader()

                reader.onload = (e) => {
                    let file = files[0]
                    this.file = {
                        value: e.target.result,
                        name: file.name,
                        size: file.size,
                        type: file.type
                    }
                }

                reader.onprogress = (e) => {
                    this.progress = e.loaded
                }
                reader.readAsText(files[0])
            },
            dragEnter(e) {
                this.active = false
                e.stopPropagation();
                e.preventDefault();
            },
            dragExit(e) {
                this.active = false
                e.stopPropagation();
                e.preventDefault();
            },
            dragOver(e) {
                this.active = true
                e.stopPropagation();
                e.preventDefault();
            },
            drop(e) {
                this.active = false
                e.stopPropagation();
                e.preventDefault();
                var dt = e.dataTransfer;
                var files = dt.files;
                this.handleFileChange(files)
            }
        },
        watch: {
            file(val) {
                this.$emit('success', val)
            }
        }
    }
</script>
