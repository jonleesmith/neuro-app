<template>
    <div class="select-field select-wrapper">
        <select class="select"
            v-model="model[field.handle]">
            <option value="">--- Please Select ---</option>
            <option :value="option" v-for="(option, key) in field.options.options" :key="key" v-text="option"></option>
        </select>
    </div>
</template>
<script>
    export default {
        props: ['field', 'row', 'model'],
    }
</script>
