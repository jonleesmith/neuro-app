<template>
    <div class="resource-item" v-show="!deleted">
        <div class="item-meta">
            <span v-if="user.role.id == 1">{{ item.org.name }}</span>
            <nuxt-link :to="{ name: 'surveys-id-templates', params: { id: item.id } }">
                {{ item.name }}
                <span>Created {{ item.created_at }}</span>
            </nuxt-link>
        </div>
        <div class="item-actions">
            <div class="action">
                <div class="icon">
                    <p class="text-2xl">{{ responseCount }}</p>
                </div>
                <span>Response{{ responseCount == 1 ? '' : 's' }}</span>
            </div>
            <SurveyResponsesDownload :survey="item"></SurveyResponsesDownload>
            <div class="action">
                <nuxt-link :to="{ name: `surveys-id-dashboard`, params: { id: item.id } }">
                    <div class="icon"><i class="fa fa-chart-line"></i></div>
                    <span>Dashboard</span>
                </nuxt-link>
            </div>
            <div class="action">
                <nuxt-link :to="{ name: `surveys-id-design`, params: { id: item.id } }">
                    <div class="icon"><i class="fa fa-edit"></i></div>
                    <span>Design</span>
                </nuxt-link>
            </div>
            <div class="action">
                <nuxt-link :to="{ name: `surveys-id-templates`, params: { id: item.id } }">
                    <div class="icon"><i class="fa fa-file-alt"></i></div>
                    <span>Template{{ templateCount == 1 ? '' : 's' }}</span>
                </nuxt-link>
            </div>
            <div class="action" v-if="user.role.id === 1">
                <ResourceActionDelete @success="onDelete" :item="item" resource="surveys"></ResourceActionDelete>
            </div>
        </div>
    </div>
</template>

<script>

    import SurveyResponsesDownload from '~/components/Survey/Responses/Download';
    import ResourceActionDelete from '~/components/Resource/Action/Delete'

    import { mapActions } from 'vuex'

    export default {
        props: ['item'],
        components: {
            SurveyResponsesDownload,
            ResourceActionDelete
        },
        data() {
            return {
                deleted: false,
            }
        },
        methods: {
            onDelete({ item }) {
                this.deleted = true
            }
        },
        computed: {
            templateCount() {
                return this.item.__meta__.templates_count
            },
            responseCount() {
                return this.item.__meta__.responses_count
            }
        }
    }
</script>
