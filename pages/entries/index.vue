<template>
	<section class="section">
        <!-- <Editor></Editor> -->
		<ElementIndex :controller="collection"></ElementIndex>
	</section>
</template>
<script>

    import ElementIndex from '~/components/Element/Index'
    import CollectionsController from '~/controllers/Collections'
    import Editor from '~/components/Tools/Editor'

    import Collection from '@/elements/Collection'

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
                controller: new Collection
			}
		},
        methods: {},
        computed: {
            collection() {
                return Collection
            }
        }
	}
</script>
