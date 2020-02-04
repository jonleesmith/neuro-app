<template>
    <div class="checkbox-field" v-if="model[field.handle].selected">
        <div class="checkbox-select flex flex-wrap pt-2">
            <label :class="{ 'w-1/2': (!row.options.single) }" class="checkbox-label block py-2 cursor-pointer"
                v-for="i in field.options.options" :key="i">
                <input type="checkbox" v-model="model[field.handle].selected" :value="(row.options.single) ? 'Yes' : i" :name="field.handle">
                <span class="ml-3 text-grey-darker" :class="{ 'text-xl': (row.options.single) }">{{ i }}</span>
            </label>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['field', 'row', 'model']
    }
</script>
