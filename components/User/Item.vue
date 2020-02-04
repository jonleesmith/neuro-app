<template>
    <div class="resource-item has-status">
        <div class="item-meta">
            <span class="status" :class="item.status || 'pending'">{{ item.status || 'pending' }}</span>
            <template v-if="user.is('admin')">
                <nuxt-link :to="{ name: 'myaccount' }" v-if="user.id == item.id">
                    {{ item.name || item.email }}
                </nuxt-link>
                <nuxt-link
                    v-else
                    :to="{ name: 'orgs-id-users-user', params: { id: item.org_id, user: item.id } }">
                    {{ item.name || item.email }}
                </nuxt-link>
            </template>
            <p v-else>{{ item.name || item.email }}</p>
            <span>{{ item.email }}</span>
        </div>
        <div class="item-actions">
            <div class="action">
               <span class="icon">
                    <i class="fa fa-user-shield"></i>
                    <span>{{ item.role.name }}</span>
                </span>
            </div>
            <div class="action">
               <span class="icon">
                    <i class="fa fa-calendar-alt"></i>
                    <span>{{ item.created_at }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['item', 'view'],
        data() {
            return {

            }
        }
    }
</script>
