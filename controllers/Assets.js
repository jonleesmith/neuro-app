
import Controller from './Controller'

export default class Assets extends Controller {
	
	getName() {
		return 'Assets';
	}

	icon() {
		return 'file-o'
	}

	searchElements(query) {
		alert('search', query);
	}

	filterElements(params) {
		alert('filter', params);
	}

	getTableAttributes() {
		return [];
	}

	getAttributeHtml() {
		return '';
	}

	getElementActions() {
		return [{
			limit: 1,
			icon: 'pencil',
			label: 'Edit',
			name: 'edit',
			action: this.editElement
		},
		{
			icon: 'trash',
			label: 'Delete',
			name: 'delete',
			action: this.deleteElement,
		}]
	}

	createElement() {
		
	}

	editElement() {

	}

	deleteElement() {

	}

}
