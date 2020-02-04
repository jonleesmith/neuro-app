<template>
    <div class="p-8 w-full">
        <table class="w-full overflow-scroll">
            <thead>
               <tr>
                    <td v-for="(column, i) in columns" :key="i"
                        class="py-4 pr-6 border-grey-light uppercase text-xs tracking-wide text-grey-dark border-b">
                        <strong>{{ column }}</strong>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, r) in rows" :key="r">
                    <td class="text-sm py-4 pr-6" v-for="(column, i) in columns" :key="i">{{ row[column] }}</strong></td>
                </tr>
            </tbody>
        </table>
        <div class="clearfix mt-10 pt-8 border-t border-grey-lighter">
            <button type="button" class="btn border border-grey-light" @click.prevent="$emit('cancel')">
                &larr; Back
            </button>
            <button type="button" class="btn bg-green text-white float-right" @click.prevent="$emit('confirm')">
                Confirm
            </button>
        </div>
    </div>
</template>
<script>

    export default {
        props: ['rows'],
        computed: {
            columns() {
                return Object.keys(this.rows[0])
            },
        }
    }
</script>
