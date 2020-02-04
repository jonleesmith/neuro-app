<template>
    <div class="widget-type-settings">
        <div class="form-row">
            <label for="row_id">Field</label>
            <div class="select-wrapper">
                <select name="row_id" class="select" v-model="activeWidget.row_id">
                    <option value="null">--- Select a Field ---</option>
                    <option :value="row.id" v-for="row in survey.rows" :key="row.id" v-if="['Range', 'NPS'].includes(row.field.type)">
                        {{ row.field.name }}
                    </option>
                </select>
            </div>
            <span class="block mt-2 text-grey text-sm">The field that the widget will use data from.</span>
        </div>
        <!-- <div class="form-row">
            <label class="block" for="">
                <input type="checkbox" v-model="activeWidget.options">
                <span class="ml-2">Show Pie Chart</span>
            </label>
        </div> -->
    </div>
</template>
<script>

    import { mapGetters } from 'vuex'

    export default {
        props: ['widget'],
        data() {
            return {
                activeWidget: this.widget
            }
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
            })
        }
    }

</script>
