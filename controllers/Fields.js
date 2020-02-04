
import Controller from './Controller'

import AssetsFieldType from '../fieldtypes/Assets'
import BooleanFieldType from '../fieldtypes/Boolean'
import DateTimeFieldType from '../fieldtypes/DateTime'
import NumberFieldType from '../fieldtypes/Number'
import TextFieldType from '../fieldtypes/Text'

export default class Fields extends Controller {
	
	getName() {
		return 'Fields';
	}

	icon() {
		return 'th-list';
	}

	getModelAttributes() {
		return {
			// 'entry_type_id': '',
			name: '',
			handle: '',
			description: '',
			required: false,
			response: true,
			editor: true
		}
	}

	getTableAttributes(view) {
		return [
			{ 
				label : 'Name',
				field: 'name'
			},
			{ 
				label: 'Handle',
				field: 'handle'
			},
			{
				label: 'Description',
				field: 'description'
			},
			{
				label: 'Type',
				field: 'type'
			},
			{
				label : 'Created',
				field: 'system.createdAt'
			}
		];
	}

	getActions(context)
	{
		return [{
			label: 'New Field',
			className: 'btn-primary',
			icon: 'plus',
			handler: () => {
				this.action = 'addField'
			}
		}]
	}

	getFieldTypes() 
	{
		return {
			'text'     : new TextFieldType(),
			'assets'   : new AssetsFieldType(),
			'number'   : new NumberFieldType(),
			'datetime' : new DateTimeFieldType(),
			'boolean'  : new BooleanFieldType()
		}
	}

	getFieldType(type) {
		return this.getFieldTypes(type) || {}
	}

	setFieldType(fieldType)
	{
		this.element.model = Object.assign({}, this.element.model, fieldType);
	}

}
