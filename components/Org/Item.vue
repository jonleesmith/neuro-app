<template>
    <div class="resource-item">
        <div class="item-meta">
            <p>
                <nuxt-link :to="{ 'name': 'orgs-id-settings', params: { id: item.id } }">{{ item.name }}</nuxt-link>
                <span class="text-grey">Created {{ item.created_at }}</span>
            </p>
        </div>
        <div class="item-actions">
            <div class="action">
                <nuxt-link :to="{ name: `orgs-id-settings`, params: { id: item.id } }">
                    <i class="fa fa-cog"></i>
                    <span>Settings</span>
                </nuxt-link>
            </div>
            <div class="action">
                <nuxt-link :to="{ name: `orgs-id-users`, params: { id: item.id } }">
                    <i class="fa fa-users"></i>
                    <span>Users</span>
                </nuxt-link>
            </div>
            <div class="action">
                <nuxt-link :to="{ name: `orgs-id-attributes`, params: { id: item.id } }">
                    <i class="fa fa-database"></i>
                    <span>Attributes</span>
                </nuxt-link>
            </div>
            <div class="action" v-if="user.role.id == 1">
                <ResourceDelete :url="`/orgs`" :item="item" resource="orgs"></ResourceDelete>
            </div>
        </div>
    </div>
</template>

<script>

    import ResourceDelete from '~/components/Resource/Action/Delete'

    export default {
        name: 'AttributeItem',
        props: ['item'],
        components: {
            ResourceDelete,
        },
        data() {
            return {
                showOptions: false
            }
        }
    }
</script>
