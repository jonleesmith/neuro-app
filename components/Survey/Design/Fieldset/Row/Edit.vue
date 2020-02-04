<template>
    <div>
        <div class="form-row">
            <strong>Label</strong>
            <textarea type="text" class="textarea" v-model="row.field.label"></textarea>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['row']
    }
</script>
