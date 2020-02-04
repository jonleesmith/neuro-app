<template>
    <fieldset class="fieldset mb-8 bg-white border border-grey-lighter shadow">
        <div class="text-lg px-10 py-6 border-b border-grey-lighter flex items-center">
            <!-- <div class="mr-4">
                <span class="dragger"><i class="fa fa-bars text-sm text-grey"></i></span>
            </div> -->
            <div class="w-1/2">{{ fieldset.label }}</div>
            <div class="w-1/2 text-right">
                <!-- <button class="icon text-sm text-grey" @click.prevent="edit = !edit">
                    <span class="fa fa-cog"></span>
                </button> -->
                <SurveyDesignFieldsetDelete v-if="fieldset.rows.length == 0" :fieldset="fieldset"></SurveyDesignFieldsetDelete>
            </div>
        </div>
        <div class="px-6 py-4 bg-grey-lightest">
            <template v-if="!edit">
                <Draggable :value="fieldset.rows" @change="updateFieldsetRowOrder"
                    :options="{ group: 'fieldsets', handle: '.dragger' }">
                    <SurveyDesignFieldsetRowItem
                        v-for="(row, key) in fieldset.rows"
                        :key="key"
                        :row="row">
                    </SurveyDesignFieldsetRowItem>
                </Draggable>
                <SurveyDesignFieldsetRowCreate :fieldset="fieldset"></SurveyDesignFieldsetRowCreate>
            </template>
            <SurveyDesignFieldsetEdit v-else :fieldset="fieldset"></SurveyDesignFieldsetEdit>
        </div>
    </fieldset>
</template>
<script>

    import SurveyDesignFieldsetRowCreate from '~/components/Survey/Design/Fieldset/Row/Create'
    import SurveyDesignFieldsetRowItem from '~/components/Survey/Design/Fieldset/Row/Item'
    import SurveyDesignFieldsetDelete from '~/components/Survey/Design/Fieldset/Delete'
    import SurveyDesignFieldsetEdit from '~/components/Survey/Design/Fieldset/Edit'

    import Draggable from 'vuedraggable'

    export default {
        props: {
            fieldset: {
                type: Object,
                required: true
            }
        },

        components: {
            SurveyDesignFieldsetRowCreate,
            SurveyDesignFieldsetRowItem,
            SurveyDesignFieldsetDelete,
            SurveyDesignFieldsetEdit,
            Draggable,
        },

        data() {
            return {
                edit: false,
            }
        },

        methods: {
            updateFieldsetRowOrder(e) {
                console.log(e)
            },
        }


    }
</script>
