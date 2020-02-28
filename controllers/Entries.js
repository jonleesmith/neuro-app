
import Controller from './Controller'

export default class Entries extends Controller {

	getName() {
		return 'Entries';
	}

	icon() {
		return 'pencil-square-o';
	}

	getModelAttributes() {
		return {
			entry_type_id: '',
			fields: {},
			entryType: {
				fields: []
			},
			status: 1,
			system: {}
		}
	}

	getElementActions() {
		return [{
			label: 'Edit',
			limit: 1,
			name: 'edit',
			icon: 'edit',
			handler: this.editEntry
		},
		{
			label: 'Status',
			name: 'status',
			icon: 'inbox',
			options: [
				{ label: 'Draft', 	  value: 0 },
				{ label: 'Publish',   value: 1 },
				{ label: 'Archive',   value: 2  }
			],
			handler: this.updateStatusSelected
		},
		{
			icon: 'trash',
			label: 'Delete',
			name: 'delete',
			handler: this.deleteSelected,
		}]
	}

	editEntry(selected) {
		this.element.model = selected[0];
		this.action = 'editElement';
	}

	updateFieldModel(entrytype)
	{
		var fields = {};
		var fieldModel = entrytype.fields;

		for ( let i in fieldModel )
		{
			let field = fieldModel[i];
			fields[field.handle] = '';
		}

		this.element.model.entry_type_id = entrytype.system.id;
		this.element.model.fields = fields;

	}

	getTableAttributes(element) {

		return [
		    { name: 'Name', handle: 'name' }
		];

	}

	getActions(context)
	{

		if ( context == 'edit' || context == 'create' ) { return [] }

		return [{
			label: 'New Entry',
			className: 'btn-primary',
			icon: 'plus',
			options: () => {
				let options = [];
				this.store.get('entrytypes').map((entrytype) => {
					options.push({
						label: entrytype.name,
						value: entrytype.system.id
					});
				});
				return options;
			},
			handler: (option) => {
				this.vue.$router.push({
					name: 'entries.create',
					params: {
						entrytype: option.value
					}
				});
			}
		}]
	}

}
