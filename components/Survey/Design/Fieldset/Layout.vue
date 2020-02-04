<template>
    <div>
        <Draggable :value="surveyFieldsets" @change="updateFieldsetOrder" :options="{ handle: '.dragger' }">
            <transition-group name="list-complete">
                <SurveyDesignFieldsetItem :fieldset="fieldset" v-for="(fieldset, key) in surveyFieldsets" :key="key">

                </SurveyDesignFieldsetItem>
            </transition-group>
        </Draggable>
    </div>
</template>
<script>

    import SurveyDesignFieldsetItem from '~/components/Survey/Design/Fieldset/Item'

    import { mapActions, mapGetters } from 'vuex'
    import Draggable from 'vuedraggable'

    export default {
        components: {
            SurveyDesignFieldsetItem,
            Draggable,
        },
        data() {
            return {
                sorting: false,
                row: false
            }
        },
        methods: {
            ...mapActions({
                updateResourceItem: 'resources/updateResourceItem',
                updateFieldset: 'resources/updateSurveyFieldset'
            }),
            setRow(row) {
                this.row = row
            },
            updateFieldsetOrder(event) {
                let { element, newIndex, oldIndex } = event.moved
                let surveyFieldsets = [ ...this.surveyFieldsets ]

                // surveyFieldsets.splice(oldIndex, 0)
                // surveyFieldsets.splice(newIndex, 1, element)
                // surveyFieldsets[oldIndex].order = newIndex
                // surveyFieldsets[newIndex].order = oldIndex

                this.updateFieldset({
                    id: surveyFieldsets[oldIndex].id,
                    field: 'order',
                    value: newIndex,
                })
                this.updateFieldset({
                    id: surveyFieldsets[newIndex].id,
                    field: 'order',
                    value: oldIndex,
                })

                this.surveyFieldsets = surveyFieldsets.sort((a, b) => {
                    return a.order - b.order
                })
            },
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
            }),
            surveyFieldsets: {
                get() {
                    return this.survey.fieldsets
                },
                set(value) {
                    this.updateResourceItem({
                        resource: 'surveys',
                        field: 'fieldsets',
                        value: value
                    })
                }
            },
        },
    }
</script>
<style scoped>

    .button {
        @apply block mb-2 p-3 bg-grey-lightest border border-grey-lighter text-left;
    }

    .list-complete-enter, .list-complete-leave-active {
      opacity: 0;
    }
    .fieldset {
        transition: all .3s ease-in-out;
    }
</style>
