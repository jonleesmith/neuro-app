<template>
    <div class="mb-4 flex py-3 items-center px-6 rounded border border-grey-lighter bg-white shadow">
        <div class="w-4/5 flex items-center">
            <template v-if="!edit">
                <!-- <div class="mr-4">
                    <span class="dragger"><i class="fa fa-bars text-sm"></i></span>
                </div> -->
                <div>
                    <span class="block">{{ row.field.name }}</span>
                    <span class="text-grey-dark text-sm">{{ row.field.type }}</span>
                </div>
            </template>
            <SurveyDesignFieldsetRowEdit v-else :row="row"></SurveyDesignFieldsetRowEdit>
        </div>
        <div class="w-1/5 text-right">
            <!-- <button class="icon text-sm" @click.prevent="edit = !edit">
                <i class="fa fa-cog"></i>
            </button> -->
            <SurveyDesignFieldsetRowDelete :row="row"></SurveyDesignFieldsetRowDelete>
        </div>
    </div>
</template>
<script>

    import SurveyDesignFieldsetRowEdit from '~/components/Survey/Design/Fieldset/Row/Edit'
    import SurveyDesignFieldsetRowDelete from '~/components/Survey/Design/Fieldset/Row/Delete'

    export default {
        props: {
            row: {
                type: Object,
                required: true,
            }
        },
        components: {
            SurveyDesignFieldsetRowEdit,
            SurveyDesignFieldsetRowDelete,
        },
        data() {
            return {
                edit: false,
            }
        }
    }
</script>
