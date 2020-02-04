<template>
    <div>
        <div class="select-field select-wrapper">
            <select class="select"
                v-model="model[field.handle].id">
                <option value="2">Admin</option>
                <option value="3">User</option>
            </select>
        </div>
         <div class="user-permissions mt-8" v-show="model[field.handle].id == 3">
            <div class="mb-8" v-for="attribute in attributes" :key="attribute.handle">
                <p class="mb-4"><strong>{{ attribute.name }}</strong></p>
                <ul class="flex flex-wrap">
                    <li class="w-1/2" v-for="option in attribute.options">
                        <label>
                            <input type="checkbox" v-model="model[field.handle].permissions" :value="`viewattribute:${option.id}`" />
                            <span class="ml-4">{{ option.name }}</span>
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>

    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: ['field', 'row', 'model'],
        data() {
            return {

            }
        },
        mounted() {
            this.fetchItems({
                url: `/orgs/${this.$route.params.id}/attributes`,
                resource: 'attributes',
            })
        },
        methods: {
            ...mapActions({
                fetchItems: 'resources/fetchItems',
            })
        },
        computed: {
            ...mapGetters({
                attributes: 'resources/attributes'
            })
        }
    }
</script>
