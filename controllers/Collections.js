
import Controller from './Controller'

export default class Collections extends Controller {

	getName() {
		return 'Collections';
	}

	icon() {
		return 'database';
	}

	model() {
		return {
			field: this.field()
		}
	}

    getElementActions() {
		return []
	}

	getAttributeHtml(attribute, element)
	{
		return super.getAttributeHtml(attribute, element)
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
				name : 'Name',
				handle: 'name',
				template: true,
			},
			{
				name: 'ID',
				handle: 'handle'
			},
			{
				name : 'Created',
				handle: 'created_at'
			}
		];

	}

}
