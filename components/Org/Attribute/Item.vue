<template>
    <div class="attribute-meta">
        <div class="item-header flex">
            <p class="w-full">{{ item.name }}</p>
            <div class="text-right"><span class="status scope">{{ (item.org_id == 1 ) ? 'Global': 'Local' }}</span></div>
        </div>
        <div class="attribute-options" v-if="item.options.length && showOptions">
            <AttributeOption v-for="option in item.options" :key="option.id" :option="option" v-if="option.parent_id == null">
            </AttributeOption>
        </div>
        <div class="actions">
            <button
                @click.prevent="newAttributeOption = true">
                <i class="fa fa-plus"></i>Add Option
                <ResourceCreate
                    @created="newAttributeOption = false"
                    :url="`/orgs/${$route.params.id}/attributes/options`"
                    resource="attributes"
                    :schema="schema"
                    :open="newAttributeOption"
                    @close="newAttributeOption = false">
                </ResourceCreate>
            </button>
            <button
                @click="showImportModal = true">
                <i class="fa fa-upload"></i>Import Options
                <AttributeOptionImportModal
                    @close="showImportModal = false"
                    :url="`/orgs/${$route.params.id}/attributes/${item.id}/options/import`"
                    :open="showImportModal">
                </AttributeOptionImportModal>
            </button>
        </div>
    </div>
</template>

<script>

    import ResourceCreate from '~/components/Resource/Create';
    import AttributeOption from '~/components/Org/Attribute/Option'
    import AttributeOptionImportModal from '~/components/Org/Attribute/Option/ImportModal'

    export default {
        name: 'AttributeItem',
        props: ['item'],
        components: {
            ResourceCreate,
            AttributeOption,
            AttributeOptionImportModal,
        },
        data() {
            return {
                showImportModal: false,
                newAttributeOption: false,
                showOptions: true,
                schema: [
                    {
                        label: 'Attribute Type',
                        handle: 'attribute_id',
                        type: 'text',
                        hidden: true,
                        model: this.item.id,
                        options: {
                            multiline: false,
                        }
                    },
                    {
                        label: 'Name',
                        handle: 'name',
                        required: true,
                        type: 'text',
                        help: 'The name of the option.',
                        options: {
                            multiline: false,
                        }
                    },
                    {
                        label: 'Handle',
                        handle: 'handle',
                        type: 'text',
                        help: 'The short name of the option.',
                        options: {
                            multiline: false,
                        }
                    },
                    {
                        label: 'Unique Identifier',
                        handle: 'uuid',
                        type: 'text',
                        help: 'The unique identifier for the option - e.g SRA ID',
                        options: {
                            multiline: false,
                        }
                    },
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .resource-item {
        @apply block;
    }

    .attribute-meta {
        @apply bg-white text-grey shadow mb-4 border border-grey-lighter items-center;

        .item-header {
            @apply px-8 py-6;
        }

        p {
            @apply text-xl text-grey-darker;

            span {
                @apply text-sm text-grey block;
            }
        }
    }
    .attribute-options {
        .option {
            @apply py-4 border-t border-grey-lighter;
        }
    }

    .actions {
        @apply p-6 py-4 border-t border-grey-lighter;

        button {
            @apply mr-4 px-6 rounded py-3 bg-white border border-dashed border-grey-light;

            &:hover {
                @apply border-solid bg-grey text-white;
            }
        }

    }
</style>
