<template>
    <div class="flex">
        <div class="flex items-center">
            <button
                v-for="range in dateRanges"
                @click.prevent="changeFromDate(range)"
                :class="{ 'bg-white': (currentRange == range.value) }"
                class="date-range">
                {{ range.label }}
            </button>
        </div>
        <div class="flex items-center ml-4 pl-4 border-l border-white" v-if="currentRange == 'custom'">
            <template v-for="date in dates">
                <span class="text-grey-dark mx-2" v-if="date == 'to'">to</span>
                <Datepicker
                    @selected="dateSelected(date, $event)"
                    :format="customFormatter"
                    name="dateFrom"
                    :value="dateFilter[date]"
                    :placeholder="`${date}...`"
                    :fullMonthName="true"></Datepicker>
            </template>
        </div>
    </div>
</template>
<script>

    import Datepicker from 'vuejs-datepicker'
    import { mapActions, mapGetters } from 'vuex'
    import moment from 'moment'

    export default {
        components: {
            Datepicker
        },
        data() {
            return {
                dates: ['from', 'to'],
                currentRange: 6,
                customDateRange: false,
                dateRanges: [
                    { value: 6, label: '6 Months' },
                    { value: 12, label: '12 Months' },
                    { value: 18, label: '18 Months' },
                    { value: 'custom', label: 'Custom' },
                ],
                dateFormat: 'YYYY-MM-DD'
            }
        },
        methods: {
            ...mapActions({
                setParams: 'dashboard/setParams',
                fetchResponses: 'dashboard/fetchResponses'
            }),
            dateSelected(type, date) {
                this.dateFilter = {
                    from: (type == 'from') ? moment(date).format(this.dateFormat) : this.dateFilter.from,
                    to: (type == 'to') ? moment(date).format(this.dateFormat) : this.dateFilter.to,
                }
            },
            customFormatter(date) {
                return moment(date).format('MMMM Do YYYY');
            },
            changeFromDate(range) {
                this.currentRange = range.value
                if ( range.value == 'custom' )
                {
                    this.customDateRange = true
                }
                else
                {
                    this.customDateRange = false
                    this.dateFilter = {
                        from: moment().subtract(range.value, 'month').format(this.dateFormat),
                        to: moment().add(1, 'day').format(this.dateFormat),
                    }
                }
            },
        },
        computed: {
            ...mapGetters({
                survey: 'resources/survey',
                workingMonths: 'dashboard/workingMonths',
                params: 'dashboard/params'
            }),
            dateFilter: {
                set(val) {
                    this.setParams(val)
                    this.fetchResponses({
                        org: this.user.org.id,
                        survey: this.survey.id
                    })
                },
                get() {
                    return this.params
                }
            }
        }
    }
</script>
<style>

    .vdp-datepicker__calendar .cell.selected {
        @apply bg-blue text-white;
    }

    .vdp-datepicker__calendar {
        width: 320px;
        @apply border-grey-lighter shadow p-4;
    }

    .vdp-datepicker__calendar header .prev,
    .vdp-datepicker__calendar header .next {
        @apply text-grey;
    }

    .vdp-datepicker input {
        @apply p-2 text-grey-darker text-sm px-3 rounded-full bg-white rounded;
        height: 30px;
    }

    .date-range {
        @apply p-2 px-4 text-grey-darker uppercase text-xs tracking-wide rounded-full rounded mr-2;
    }

</style>
