<template>
    <div>
        <div class="py-8 flex text-right text" v-if="!sent">
            <div class="w-1/2">
                <TemplateTabs></TemplateTabs>
            </div>
            <div class="w-1/2 text-right">
                <button
                    @click.prevent="updateTemplate"
                    type="button"
                    class="btn bg-green hover:bg-green-light text-white">
                    <i class="fa fa-cog"></i> Update Settings
                </button>
            </div>
        </div>
        <div class="bg-white border border-grey-lighter">
            <div class="form-row setting">
                <label>Name</label>
                <span class="help">The name of the template referenced in the admin area.</span>
                <div class="option">
                    <input type="text" class="border border-grey-light input"
                        :value="template.name"
                        @input="updateField('name', $event.target.value)" />
                </div>
            </div>
            <div class="form-row setting">
                <label>
                    Url
                    <span class="error" v-if="errors.has('url')">{{ errors.get('url') }}</span>
                </label>
                <span class="help">
                    This is the url that is used to access the survey anonymously.
                    <a :href="`${appUrl}/feedback/${template.url}`" class="ml-2 icon text-grey hover:text-blue">
                        <i class="fa fa-external-link-alt text-xs"></i>
                    </a>
                </span>
                <div class="option flex">
                    <div class="input" @click="$refs.url.focus()">
                        {{ appUrl }}/feedback/<input type="text" ref="url"
                            :value="template.url"
                            @input="updateField('url', $event.target.value)" />
                    </div>
                </div>
            </div>
            <div class="form-row setting">
                <label>Subject</label>
                <span class="help">This is the email subject.</span>
                <div class="option">
                    <input type="text" class="border border-grey-light input"
                        :value="template.subject"
                        @input="updateField('subject', $event.target.value)" />
                </div>
            </div>
             <div class="form-row setting">
                <label>Body</label>
                <span class="help">This is the email body.</span>
                <div class="option">
                    <textarea
                        class="textarea border border-grey-light"
                        :value="template.body"
                        @input="updateField('body', $event.target.value)"></textarea>
                </div>
            </div>
            <!-- <div class="form-row setting">
                <label>Allow annonymous?</label>
                <div class="option">Yes.</div>
            </div> -->
            <div class="form-row setting">
                <label>Fieldset Manager (Advanced)</label>
                <span class="help">The template will use all fieldsets by default. Select fieldsets and order to change this.</span>
                <div class="option mt-2">
                    <div class="flex">
                        <div class="w-2/5 pr-10 mr-10 border-r border-grey-lighter">
                            <p class="mb-4">Survey Fieldsets</p>
                            <Draggable @move="" :options="{ handle: '.dragger' }">
                                <transition-group>
                                    <div v-for="element in survey.fieldsets" :key="element.id">
                                        <label class="p-3 m-0 border-b border-grey-lighter">
                                            <input type="checkbox"
                                            class="mr-2"
                                            v-model="surveyFieldsets"
                                            :value="element.id" />
                                            <span>{{ element.label }}</span>
                                        </label>
                                    </div>
                                </transition-group>
                            </Draggable>
                        </div>
                        <div class="w-3/5">
                            <p class="mb-4">Selected Fieldsets</p>
                            <Draggable
                                v-model="surveyFieldsets"
                                @change="updateFieldsetOrder"
                                :options="{ handle: '.dragger', group: 'fieldsets' }">
                                <div v-for="element in surveyFieldsets" :key="element"
                                    class="block rounded border border-grey-lighter flex items-center mb-4 relative">
                                        <span
                                            class="dragger icon py-3 text-center items-center w-12 text-center border-r border-grey-lighter">
                                        <i class="fa fa-bars text-grey text-xs"></i>
                                    </span>
                                    <span class="px-4" :class="{ 'text-grey-darker': ( template.options.fieldsets.includes(element) ) }">
                                        {{ fieldset(element) }}
                                    </span>
                                </div>
                        </Draggable>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-row setting">
                <label>Template UUID</label>
                <div class="option">
                    <input disabled="disabled" type="text" class="input" :value="template.uuid">
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import TemplateTabs from '~/components/Template/Tabs'
    import Draggable from 'vuedraggable'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        components: {
            Draggable,
            TemplateTabs,
        },
        data() {
            return {
                change: false,
                sent: false,
                response: null,
            }
        },
        methods: {
            fieldset(id, attr) {
                let fieldset = this.survey.fieldsets.filter(i => i.id == id)[0]
                return (fieldset) ? fieldset.label : ''
            },
            ...mapActions({
                updateResourceItem: 'resources/updateResourceItem',
            }),
            addFieldset(e) {
                console.log(e)
            },
            updateField(field, value) {
                this.change = true
                this.updateResourceItem({
                    field,
                    value,
                    resource: 'templates',
                })
            },
            updateTemplate() {
                let { name, url, options, subject, body } = this.template
                this.$axios.put(`orgs/${this.user.org.id}/surveys/${this.survey.id}/templates/${this.template.id}`, {
                    name,
                    url,
                    options,
                    subject,
                    body,
                }).then( response => {
                    this.response = response
                })
            },
            sendEmail() {
                this.$axios.post(`orgs/${this.user.org.id}/templates/${this.template.uuid}/send`)
                    .then( res => {
                        this.sent = true
                    })
                    .catch( err => {
                        console.info(err)
                    })
            },
            updateFieldsetOrder(event) {

                let { element, oldIndex, newIndex } = event.moved
                let surveyFieldsets = [ ...this.surveyFieldsets ]

                surveyFieldsets.splice(oldIndex, 0)
                surveyFieldsets.splice(newIndex, 1, element)

                this.surveyFieldsets = surveyFieldsets

            },
        },
        computed: {

            surveyFieldsets: {
                get() {
                    return this.$store.state.resources.templates.item.options.fieldsets
                },
                set (value) {
                    console.log(value);

                    this.updateField('options', {
                        ...this.template.options,
                        fieldsets: value,
                    })
                }
            },
            template() {
                return this.$store.state.resources.templates.item
            },
            survey() {
                return this.$store.state.resources.surveys.item
            }
        },
    }
</script>
