<template>
    <ul :class="{ 'option text-grey-darker' : !child }" v-show="!deleted">
        <li class="flex" :class="{ 'px-8': !child, 'px-4': child }">
            <div class="w-full">
                <span class="mr-3" v-if="child">&bull;</span>{{ option.name }} <em class="text-grey">{{ option.handle }}</em>
            </div>
            <div class="text-right flex">
                <ResourceDelete v-if="user.org.id == 1 || option.org_id != 1"
                    resource="attributes"
                    @success="deleted = true"
                    :url="`/orgs/${option.org_id}/attributes/options`" :item="option">
                </ResourceDelete>
                <span class="status scope ml-4" v-if="option.org_id == 1">Global</span>
            </div>
            <p v-if="( option.children && option.children.length )">
                <AttributeOption :key="child.id" :child="true" :name='child.name' :option="child" v-for="child in option.children"></AttributeOption>
            </p>
        </li>
    </ul>
</template>
<script>
    import AttributeOption from '~/components/Org/Attribute/Option'
    import ResourceDelete from '~/components/Resource/Action/Delete';

    export default {
        name: 'AttributeOption',
        props: ['option', 'child'],
        components: {
            AttributeOption,
            ResourceDelete,
        },
        data() {
            return {
                deleted: false,
            }
        }
    }
</script>
