<template>

    <div class="table-view">

        <!-- <div class="element-data" v-if="elements.length > 0">
            <table class="table table-hover table-header">
                <thead>
                    <tr>
                        <th class="action" v-if="controller.elementActions.length > 0">
                            <a href="#" :class="{ 'checked' : ( allSected ) }" @click.prevent="toggleAllElements">
                                <i class="fa fa-check-square" v-if="allSected"></i>
                                <i class="fa fa-square" v-else></i>
                            </a>
                        </th>
                        <th v-for="(attribute, index) in attributes"
                            :class="{ [attribute.field] : attribute.field, 'first' : (index === 0) }">
                            {{ attribute.label }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in elements" :key="item.id" :class="{ 'selected' : isSelected(item) }">
                        <td class="action" v-if="controller.elementActions.length > 0">
                            <a href="#" :class="{ 'checked' : ( isSelected(item) ) }" @click.prevent="toggleChecked(item)">
                                <i class="fa fa-check-square"  v-if="isSelected(item)"></i>
                                <i class="fa fa-square" v-else></i>
                            </a>
                        </td>
                        <td :class="{ [attribute.field] : attribute.field, 'first' : (index === 0) }" v-for="(attribute, index) in attributes" @click="viewElement(item)">
                            <div v-html="getAttributeHtml(attribute.field, item)"></div>
                        </td>
                    </tr>
                </tbody>

            </table>

        </div>
        <div class="none-found" v-else>
            <p>No {{ controller.getName() }} found.</p>
        </div> -->

    </div>


</template>

<script>

    export default {

        props: {
            selected: {
                type: Array,
                default: () => []
            },
            controller: {
                type: Function,
                required: true
            },
            elements: {
                type: Array,
                default: () => []
            }
        },

        methods: {

            viewElement(item)
            {
                this.$emit('view-element', item);
            },

            toggleChecked(item)
            {

                if ( this.isSelected(item) )
                {
                    this.selectedElements.splice(this.selectedElements.indexOf(item), 1);
                }
                else
                {
                    this.selectedElements.push(item);
                }

                this.$emit('select-elements', this.selectedElements);

            },

            toggleAllElements(e) {

                if ( this.allSected )
                {
                    this.selectedElements = this.selectedElements.splice(0, this.selectedElements.length);
                }
                else
                {

                    for ( let key in this.elements )
                    {

                        if ( !this.isSelected(this.elements[key]) )
                        {
                            this.selectedElements.push(this.elements[key]);
                        }

                    }

                }

                this.$emit('select-elements', this.selectedElements);

            },

            isSelected(el)
            {
                return ( this.selectedElements.indexOf(el) != -1 );
            },

            getAttributeHtml(attribute, item)
            {
                return this.controller.getAttributeHtml(attribute, item)
            }

        },

        computed: {

            attributes() {
                return this.controller.getTableAttributes();
            },

            selectedElements()
            {
                return this.selected;
            },

            allSected()
            {
                return this.selectedElements.length === this.elements.length;
            }

        }

    }
</script>
<style lang="scss">

.table {
    width: 100%;
    max-width: 100%;

    // Cells
    > thead,
    > tbody {
    > tr {
        > th,
        > td {
            // @apply py-4 border-b border-gray-300;
            @apply py-4 border-b;
            line-height: 1;
            vertical-align: middle;
            // border-top: $border-light;

                &.action {
                    width: 20px;
                    @apply pl-6 pr-6;

                    .fa {
                        @apply mr-0;
                    }
                }
            }
        }
    }

    tr.selected td {
        // @apply bg-gray-300;
    }

    > thead > tr > th {
        // @apply bg-gray-300 border-b text-gray-900 uppercase text-sm font-bold;
        letter-spacing: 2px;
    }

}

td,
th {

  &.action {

    a {
      display: inline-block;
    //   @apply inline-block text-gray-300;

      &:hover {
        // @apply text-gray-500;
      }

      &.checked {
        // @apply text-gray-800;
      }
    }
  }
}

th {
  text-align: left;
}

</style>
