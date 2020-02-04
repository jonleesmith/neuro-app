<template>
    <div class="import-wizard p-8">
        <div v-if="stage == 'upload'">
            <div class="form-row" v-if="type == 'file'">
                <FileUpload @success="parseCSVFile" @remove="resetState"></FileUpload>
                <div class="pt-6 text-right">
                    <button class="btn bg-grey text-white" @click.prevent="changeType('direct')">
                        <i class="fa fa-edit"></i>
                        Direct Input
                    </button>
                </div>
            </div>
            <div class="form-row" v-if="type == 'direct'">
                <textarea class="textarea" v-model="input"></textarea>
                <div class="pt-6 text-right">
                    <button class="btn bg-grey text-white" @click.prevent="changeType('file')">
                        <i class="fa fa-file"></i>File Import
                    </button>
                    <button class="btn bg-green text-white ml-4" @click.prevent="parseCSVFile">
                        <i class="fa fa-upload"></i>
                        Import
                    </button>
                </div>
            </div>
            <p class="text-red text-right" v-if="error">{{ error }}</p>
        </div>
        <div v-if="stage == 'map'">
            <p class="text-lg mb-8 text-grey-dark">Assign the field headers found in the import to internal fields.</p>
            <ul class="flex flex-wrap justify-between mb-4">
                <li class="mb-8" v-for="(header, key) in headers" :key="key">
                    <div>
                        <span class="block mb-2 text-grey-dark">{{ header }}</span>
                        <div class="select-wrapper">
                            <select class="select" v-model="fieldMap[key]" :class="{ 'border-red-lighter border': (!fieldMap[key]) }">
                                <option value="">--- Select a field ---</option>
                                <option v-for="field in fields" :value="field.handle" :key="field.id">
                                    {{ field.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="clearfix mt-10 pt-8 border-t border-grey-lighter">
                <button type="button" class="btn-lg bg-red-light text-white" @click.prevent="closeModal">
                    Cancel
                </button>
                <button class="btn-lg bg-green text-white float-right" @click.prevent="formatResponses">
                    <i class="fa fa-upload"></i> Import
                </button>
            </div>
        </div>
    </div>
</template>
<script>

    import FileUpload from '~/components/Utils/FileUpload'

    import { snakeCase } from 'lodash'
    // import csvParser from '~/plugins/async-csv'

    export default {
        components: {
            FileUpload,
        },
        props: ['fields', 'open'],
        data() {
            return {
                type: 'file',
                stage: 'upload',
                input: '',
                error: false,
                csv: '',
                parsedCSV: '',
                fieldMap: [],
            }
        },
        methods: {
            closeModal() {
                this.resetState()
                this.$emit('close')
            },
            resetState() {
                this.error = false
                this.input = ''
                this.type = 'file'
                this.csv = '',
                this.parsedCSV = ''
                this.headers = []
                this.fieldMap = []
                this.stage = 'upload'
            },
            formatResponses() {
                let map = this.fieldMap
                let csv = this.parsedCSV
                let results = []

                // well, this is fun
                // can you tell what it is yet

                for ( let i = 0; i < csv.length; i++ )
                {
                    let values = Object.values(csv[i])
                    let r = {}
                    for ( let j = 0; j < map.length; j++ )
                    {
                        if ( map[j] )
                        {
                            r[map[j]] = values[j]
                        }
                    }

                    results.push(r)

                }

                this.results = results;
                this.stage = 'results'
                this.$emit('success', this.results)

            },
            async parseCSVFile(file) {
                this.error = false
                this.csv = ( this.type == 'file' ) ? file.value : this.input
                try {
                    this.parsedCSV = await csvParser.parse(this.csv, {
                        columns: true,
                        skip_empty_lines: true,
                        trim: true,
                    });
                    this.headers = Object.keys(this.parsedCSV[0])
                    this.headers.map( (header, i) => {
                        let headerKey = snakeCase(header)
                        let found = this.fields.filter( field => {
                            return headerKey == field.handle
                        })
                        this.fieldMap[i] = ( found[0] ) ? headerKey : ""
                    })
                    this.stage = 'map'
                }
                catch (error) {
                    this.error = error.message
                }
            },
            changeType(type) {
                this.error = false
                this.type = type
            }
        },
    }
</script>
