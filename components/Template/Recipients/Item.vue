<template>
    <div class="resource-item has-status">
        <div class="item-meta">
            <span class="status" :class="item.status || 'pending'">{{ item.status || 'pending' }}</span>
            <p>
                {{ item.client_name }}
                <span>{{ item.email }}</span>
            </p>
        </div>
        <div class="item-actions">
            <div class="action">
                {{ item.created_at }}
                <span class="text-sm block text-grey">Added</span>
            </div>
            <div class="action">
                <template v-if="item.status == 'sent'">
                    {{ item.sent_date }}
                    <span class="text-sm block text-grey">Sent date</span>
                </template>
                <template v-if="item.status == 'complete'">
                    {{ item.complete_date }}
                    <span class="text-sm block text-grey">Completed date</span>
                </template>
                <template v-if="item.status == 'pending' && item.created_at != item.updated_at">
                    {{ item.updated_at }}
                    <span class="text-sm block text-grey">Last updated</span>
                </template>
            </div>
            <div class="action">
                <a :href="`/invitation/${item.url}/`" target="_blank"><i class="fa fa-external-link-alt"></i></a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        components: {},
        props: ['item', 'invite'],
        data() {
            return {}
        },
        methods: {},
        filters: {
            status: function (value) {
                return ['pending', 'sent', 'complete'][value]
            }
        }
    }
</script>
