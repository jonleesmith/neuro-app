<template>
	<section class="max-w-5xl mx-auto">
        <div class="flex mb-6 items-center">
            <h1 class="flex-1">Collections</h1>
            <nuxt-link :to="{ query: { action: 'create' } }" class="btn bg-indigo-500 text-white">
                Create Collection
            </nuxt-link>
        </div>
		<ElementIndex :controller="collection" :actions="false" :search="false">
            <div slot="name" slot-scope="{ element }">
                <nuxt-link :to="{ name: 'collections-collection-entries', params: { collection: element.handle } }">
                    {{ element.name }}
                </nuxt-link>
            </div>
        </ElementIndex>
	</section>
</template>
<script>

    import ElementIndex from '~/components/Element/Index'
    import Collections from '~/controllers/Collections'
    import Editor from '~/components/Tools/Editor'

    import { mapActions } from 'vuex'

	export default {
        layout: 'default',
        header: {
            title: 'Collections'
        },
		components: {
			ElementIndex,
            Editor,
		},
		data() {
			return {
                showToolbar: true,
                // controller: new Collection
			}
		},
        methods: {
        },
        computed: {
            collection() {
                return new Collections(this)
            }
        }
	}
</script>
