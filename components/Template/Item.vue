<template>
    <div class="resource-item has-status">
        <div class="item-meta">
            <span class="status" :class="item.status || 'pending'">{{ item.status || 'pending' }}</span>
            <span v-if="view == 'widget'">{{ item.survey.name }}</span>
            <nuxt-link
                :to="{ name: `surveys-id-templates-template`, params: {
                    id: item.survey.id,
                    template: item.id },
                    query: { tab: 'settings' } }">
                {{ item.name }}
            </nuxt-link>
            <span>Created {{ item.created_at }}</span>
        </div>
        <div class="item-actions">
            <div class="action">
                <p class="text-2xl">{{ item.responses ? item.responses.length : '0' }}</p>
                <span>
                    <template v-if="item.responses && item.responses.length == 1">Response</template>
                    <template v-else>Responses</template>
                </span>
            </div>
            <div class="action">
                <nuxt-link :to="{
                    name: `surveys-id-templates-template`,
                    params: { id: item.survey.id, template: item.id },
                    query: { tab: 'recipients' }
                }">
                    <i class="fa fa-envelope"></i>
                    <span>Recipients</span>
                </nuxt-link>
            </div>
            <div class="action">
               <nuxt-link :to="{
                    name: `surveys-id-templates-template`,
                    params: { id: item.survey.id, template: item.id },
                    query: { tab: 'settings' }
                }">
                    <i class="fa fa-cog"></i>
                    <span>Settings</span>
                </nuxt-link>
            </div>
            <div class="action">
                <a href="/" @click.prevent="previewTemplate">
                    <i class="fa fa-external-link-alt"></i>
                    <span>Preview</span>
                </a>
            </div>
            <div class="action">
                <ResourceDelete :item="item" :url="`surveys/${item.survey_id}/templates`" resource="templates"></ResourceDelete>
            </div>
        </div>
    </div>
</template>

<script>

    import ResourceDelete from '~/components/Resource/Action/Delete'

    export default {
        props: ['item', 'view'],
        components: {
            ResourceDelete
        },
        methods: {
            previewTemplate() {
                window.open(`${this.appUrl}/feedback/${this.item.url}`)
            }
        }
    }
</script>
