<script>
	import { mapActions } from 'vuex'

	export default {
		props: {
            resource: {
                type: String,
                required: true
            },
            url: {
                type: String,
                default: ''
            },
            params: {
                type: String,
                default: ''
            },
        },
		data() {
			return {
				fetchUrl: '',
				loading: false,
			}
		},
		created() {
            this.fetchUrl = this.url || this.resource
		},
		watch: {
			params(params) {
                this.fetchUrl = `${ this.url || this.resource }${this.params}`
            },
            fetchUrl() {
                this.fetchDataFromUrl()
            }
		},
		methods: {
			...mapActions({
                setErrors : 'setErrors',
                storeItems: 'resources/storeItems',
                setDirty: 'resources/setDirty',
            }),
			fetchDataFromUrl() {
				this.loading = true;
                let url = ( this.fetchUrl.charAt(0) == '/' ) ? this.fetchUrl : `orgs/${this.user.org.id}/${this.fetchUrl}`
                if ( this.dirty )
                {
                    this.$axios.get(url)
                        .then((res) => {
                            this.response = res.data.data
                            this.storeItems({
                                resource: this.resource,
                                items: this.response
                            })
                            this.setDirty({
                                resource: this.resource,
                            })
                            this.loading = false
                        })
                        .catch(err => {
                            this.setErrors(err.data)
                            this.$emit('error', err.data)
                            this.loading = false
                        })
                }
			}
		},
		render() {
			return this.$scopedSlots.default({
				response: this.response,
				loading: this.loading,
				error: this.error
			})
		},
        computed: {
            dirty() {
                return true;
                // return this.$store.state.resources[this.resource].dirty
            }
        }
	}
</script>
