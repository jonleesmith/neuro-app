<template>
    <div class="survey-wrapper" id="survey-wrapper">
        <div class="header py-12 text-center" :style="backgroundStyles">
            <p class="text-4xl text-grey-dark" v-if="template.org.id == 5">Your Logo Here</p>
            <img class="org-logo" :src="`/assets/logo/${template.org.id}.png`" alt="" v-else>
        </div>
        <div class="survey-form-wrapper" v-if="template.survey">
            <form v-if="!sent" id="survey-form" class="survey-form" method="post" @submit.prevent="processSurveySubmission" ref="form">
                <div class="form-header">
                    <h1 class="h1 font-normal text-grey-darker">{{ template.survey.name }}</h1>
                </div>
                <div class="fieldset-wrapper">
                    <fieldset
                        v-for="(fieldset, i) in template.selectedFieldsets"
                        :key="i"
                        :id="`fieldset-${i + 1}`"
                        :ref="( i == 2 ) ? 'startFieldset' : 'fieldsets'"
                        :class="fieldsetClasses(fieldset)"
                        >
                        <div class="fieldset-header">
                            <h2 class="fieldset-label">{{ fieldset.label }}</h2>
                            <p class="fieldset-description" v-if="fieldset.description" v-html="fieldset.description"></p>
                        </div>
                        <div class="fieldset-content">
                            <SurveyFieldsetRow
                                v-for="(row, key) in fieldset.rows"
                                :model="template.model"
                                :key="key"
                                :number="`${i + 1}.${key + 1}`"
                                :row="row">
                            </SurveyFieldsetRow>
                        </div>
                    </fieldset>
                </div>
                <div class="form-submit text-center mt-10 py-8">
                    <button :style="buttonSyles"
                        :disabled="sending || !template.uuid"
                        class="text-xl text-white hover:shadow font-bold py-4 px-10 rounded">
                        <span v-if="sending">Sending...</span>
                        <span v-else>Send &rarr;</span>
                    </button>
                </div>
            </form>
            <div v-else class="form-header">
                <h2 class="text-4xl font-medium text-grey-darker mb-6">Thank you for providing your feedback.</h2>
                <p class="text-lg">
                    We appreciate the time you have taken and will actively use it to improve our services to you.
                </p>
            </div>
        </div>
        <div class="survey-footer text-center pb-8">
            <span class="block mx-auto w-6 border border-grey mb-6"></span>
            <p class="text-sm text-grey-dark pb-8">Powered by Law League</p>
        </div>
    </div>
</template>

<script>
    import SurveyFieldsetRow from '~/components/Survey/Fieldset/Row'

    export default {
        layout: 'feedback',
        props: {
            template: {
                type: Object,
                required: true
            },
            recipient: {
                type: Object,
                required: false
            }
        },
        data() {
            return {
                sending: false,
                sent: false
            }
        },
        mounted() {
            if ( this.recipient && this.$refs.startFieldset )
            {
                window.scroll({
                    top: this.findPosition(this.$refs.startFieldset[0]),
                    behavior: 'smooth'
                });
            }
        },
        components: {
            SurveyFieldsetRow
        },
        methods: {
            findPosition(obj) {
                var curtop = 0;
                if (obj.offsetParent) {
                    do {
                        // setTimeout( () => {
                            curtop += obj.offsetTop;
                        // }, 600)
                    } while (obj = obj.offsetParent);
                        return [curtop];
                }
            },
            fieldsetClasses(fieldset) {
                return {
                    // 'hidden'   : ( this.recipient && fieldset.label == 'About You' ),
                    // 'disabled'   : ( this.recipient && fieldset.label == 'About Us' ),
                }
            },
            processSurveySubmission()
            {
                this.sending = true
                this.$axios.post(`collect/${this.template.uuid}`, {
                    fields: this.template.model,
                    recipient: ( this.recipient ) ? this.recipient.id : null
                })
                .then( response => {
                    this.sending = false
                    this.sent = true
                });
            }
        },
        computed: {
            backgroundStyles() {
                return { 'background' : this.template.org.options.brand }
            },
            buttonSyles() {
                let brand = this.template.org.options.brand
                return { 'background' : ( ( brand == 'none' || brand == 'white' ) ? '#777' : brand ) }
            }
        }
    }
</script>

<style lang="scss">

    .nuxt-progress {
        display: none;
    }

    .survey-wrapper {
        @apply mx-auto pb-8 font-normal;
        max-width: 1100px;
    }

    .form-header {
        @apply py-8 px-6 border-b border-grey-lighter text-center bg-white;
    }

    .fieldset-label {
        @apply font-normal text-3xl;
    }

    .fieldset-description {
        @apply mt-4 w-3/5 mx-auto text-lg text-grey-darker;
    }

    .fieldset-header {
        @apply py-6 px-4 bg-grey-lightest text-center;
    }

    .h1 {
        @apply text-3xl;
    }

    @screen md {
        .h1 {
            @apply text-4xl;
        }
    }

    fieldset.disabled [name] {
        background: #eee;
        opacity: .6;
        pointer-events: none;
        border: none;
    }

    fieldset.disabled span {
        display: none;
    }

    .fieldset-content {
        @apply bg-white px-6 py-8 pt-10;
    }

    .fieldset-content .field-row:last-child {

    }

    @screen lg {
        .fieldset-content {
            @apply px-12;
        }
    }

    .field-row {
        position: relative;
        opacity: 1;
        transition: opacity .35s ease-in-out;

        &:last-child {
            margin: 0;
            border-bottom: 0;
        }

        button {
            transition: all .3s ease-in-out;
        }

         textarea {
            outline: none;
            transition: all .3s ease-in-out;
        }

    }

    .survey-footer {
        margin-top: 100px;
    }

</style>
