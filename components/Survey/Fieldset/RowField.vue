<template>
	<div class="form-row-field">
		<component :is="`${field.type}Display`" :row="row" :field="field" :model="model"></component>
	</div>
</template>
<script>
    import NPSDisplay from '~/components/Field/NPS/Display'
    import RoleDisplay from '~/components/Field/Role/Display'
	import RangeDisplay from '~/components/Field/Range/Display'
	import TextDisplay from '~/components/Field/Text/Display'
	import NumberDisplay from '~/components/Field/Number/Display'
    import AttributeDisplay from '~/components/Field/Attribute/Display'
    import CheckboxDisplay from '~/components/Field/Checkbox/Display'
    import SelectDisplay from '~/components/Field/Select/Display'
	import ReviewDisplay from '~/components/Field/Review/Display'

	export default {
		components: {
            RoleDisplay,
            NPSDisplay,
			RangeDisplay,
			TextDisplay,
			NumberDisplay,
            AttributeDisplay,
		    CheckboxDisplay,
            SelectDisplay,
            ReviewDisplay,
		},
		props: ['field', 'row', 'model']
	}
</script>
