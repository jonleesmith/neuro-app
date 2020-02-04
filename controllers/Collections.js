
import Controller from './Controller'

export default class Collections extends Controller {

	static get name() {
		return 'Collections';
	}

	static get icon() {
		return 'database';
	}

	static get model() {
		return {
			field: this.field()
		}
	}

	static get elementActions() {
		return [{
			label: 'Status',
			name: 'status',
			options: [
				{ label: 'Draft', 	 value: 0 },
				{ label: 'Publish',  value: 1 },
				{ label: 'Archive',  value: 2  }
			],
			handler: this.updateStatusSelected
		},
		{
			label: 'Delete',
			name: 'delete',
			handler: this.deleteSelected,
            options: []
		}]
	}

	updateStatus()
	{

	}

	static fields() {
		return {
			system: {},
			name: '',
			handle: '',
			description: '',
			single: 0,
			sortable: 0,
			status: 1
		}
	}

	getActions(context)
	{
		if ( context == 'edit' )
		{
			return [
				{
					label: `Edit Collection`,
					icon: 'edit',
					className: 'btn-tertiary',
					handler: () => {
						this.action = 'editElement'
					}
 				}
			];
		}

		return [{
			label: 'New Collection',
			className: 'btn-primary',
			icon: 'plus',
			handler: () => {
				this.action = 'newElement'
			}
		}]
	}

	getTableAttributes(element)
	{

		return [
			{
				label : 'Name',
				field: 'name'
			},
			{
				label: 'ID',
				field: 'uid'
			},
            {
                label : 'Status',
                field: 'status'
            },
			{
				label : 'Created',
				field: 'created_at'
			}
		];

	}

}
