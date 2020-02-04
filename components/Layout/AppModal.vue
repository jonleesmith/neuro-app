<template>
    <transition>
        <div ref="modal" class="modal" :class="{ 'modal-lg' : (large) }">
            <div class="opacity-100 modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-title"><slot name="title"></slot></div>
                        <button type="button" aria-hidden="true" class="modal-close" @click.prevent="closeModal">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body"><slot name="content"></slot></div>
                    <div class="modal-footer" v-if="$slots['footer']">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		props: {
			large: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				visible: false
			}
		},
		mounted() {
			this.$emit('open');
            this.$refs.modal.classList.add('in');
            this.visible = true;
		},
		methods: {
			closeModal() {
				this.$refs.modal.classList.remove('in');
				this.$emit('close');
                this.visible = false;
			}
		}
	}
</script>
