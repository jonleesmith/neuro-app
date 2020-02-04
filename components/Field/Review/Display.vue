<template>
    <div class="review-field">
        <textarea :name="field.handle" v-model="model[field.handle].text" class="mt-4 textarea"></textarea>
        <div class="flex items-center mt-2">
            <p class="w-1/2">The first name published with this review will be:</p>
            <p class="w-1/2"><input type="text" class="input" v-model="model[field.handle].name" ></p>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['field', 'row', 'model'],
        mounted() {
            if ( this.model.client_name )
            {
                this.model[this.field.handle].name = this.model.client_name.split(/ /g)[0]
            }
        }
    }
</script>
