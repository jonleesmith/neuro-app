

export default class Controller {

	constructor(vue)
	{
		// public properties are vue reactive
		let context 		= vue.$route.name.split('.').pop() || 'index';

		this.vue 			= vue;
		this.project 		= vue.project;
		this.api 			= `${vue.project.handle}`;

		this.endpoint 		= this.constructor.name.toLowerCase();
		this.element 		= vue.$forms.create(this.getModelAttributes());
		this.model 			= this.element.model;
		this.elements 		= [];
		this.params 		= {};

		this.$axios			= this.vue.$axios;
		this.busy 			= false;
		this.title 			= this.getName();
		this.search 		= this.hasSearch(context);
		this.actions 		= this.getActions(context);
		this.elementActions = this.getElementActions();
		this.action 		= 'index';
		this.defaultView 	= this.getDefaultView();
		this.filters 		= this.getFilters();
	}

	icon() {
		return 'th';
	}

	clearElement()
	{
		this.element = this.vue.$forms.create(this.getModelAttributes());
	}

	getModelAttributes() {
		return {}
	}

	getTableAttributes() {
		return []
	}

	getActions(context) {
		return []
	}

	getName() {
		return 'Controller';
	}

	getStatuses() {
		return [
			{ label: 'Draft', 	  value: 'draft' },
			{ label: 'Published', value: 'published' },
			{ label: 'Archived',  value: 'archived'  }
		]
	}

	hasSearch(route) {
		return true;
		// return ( route != 'edit' );
	}

	getDefaultView()
	{
		return 'table';
	}

	getItems(endpoint, params)
	{
		endpoint = endpoint || this.endpoint;
		params = params || {};
		this.vue.loading = true;
		return new Promise(( resolve, reject ) => {
			this.vue.$axios.get(`${this.api}/${endpoint}`, { params: params }).then( (response) => {
				resolve(response.data.items);
				// this.store.set(endpoint, response.data.items);
				this.vue.loading = false;
			}).catch((error) => {
				reject(error);
				this.vue.loading = false;
			});
		});

	}

	getItem(endpoint, params)
	{
		endpoint = endpoint || this.endpoint;
		params = params || {};

		this.vue.loading = true;
		return new Promise(( resolve, reject ) => {
			this.vue.$axios.get(`${this.api}/${endpoint}`, { params: params }).then( (response) => {
				resolve(response.data.item);
				this.vue.loading = false;
			}).catch((error) => {
				reject(error);
				this.vue.loading = false;
			});
		});
	}

	async all(params)
	{
		params = params || {};

        this.vue.loading = true;


        let response = await this.vue.$axios.get(`${this.api}/${this.endpoint}`, { params: params })

        this.elements = response.data.data

        return response.data.data

		// this.vue.$axios.get(`${this.api}/${this.endpoint}`, { params: params }).then((response) => {
        //     console.log(response.data.data)
		// 	this.elements = response.data.data;
		// 	// this.store.set(this.endpoint, response.data.items);
		// 	// this.vue.loading = false;
		// }).catch( (err) => {
		// 	// this.vue.$store.notifications.dispatch('addMessage', {
		// 	// 	type: 'error',
		// 	// 	message: 'Error fetching resource'
		// 	// });
		// 	this.vue.loading = false;
		// });
	}

	getElement(id)
	{
		this.getItem(`${this.endpoint}/${id}`).then( (response) => {
			this.element.model = response;
		});
	}

	getAttributeHtml(attribute, element)
	{

		if ( attribute.indexOf('.') != -1)
		{
			var bits = attribute.split('.');
			return element[bits[0]][bits[1]];
		}

		if ( element[attribute] === null )
		{
			return '<span class="null">-</span>';
		}

		if ( attribute == 'status' )
		{
            return `<span class="pill ${element.status}">${element.status}</span>`
		}

		return element[attribute];
	}

    getElementActions()
	{
		return [
            { label: 'Delete', name: 'delete', }
        ];
	}

	getFilters()
	{
		return [
			{
                label: 'Status',
                field: 'status',
                options: [
                    { label: 'Active', value: 'active' },
                    { label: 'Draft', value: 'draft' },
                ]
            }
		];
	}

	saveElement()
	{
		this.element.startProcessing();

		if ( this.element.model.system.id )
		{
			this.updateElement();
			return;
		}

		// return new Promise( ( resolve, reject ) => {
			this.$axios.post(`${this.api}/${this.endpoint}`, this.element.model)
			.then(response => {
				this.element.finishProcessing();
				this.element.model = response.data.item;
				// this.clearElement();
				this.getElements();
				// this.action = 'index';
				// resolve(response.data.item);
			})
			.catch(error => {
				this.element.setErrors(error.data.errors);
				this.element.busy = false;
				// reject(error.data.errors);
			});
		// });


	}

	updateElement()
	{
		this.element.startProcessing();
		this.$axios.put(`${this.api}/${this.endpoint}/${this.element.model.id}`, this.element.model)
			.then(response => {
				this.element.finishProcessing();
				this.element.model = response.data.item;
				this.action = 'index';
				this.vue.notifications.push({
					type: 'success',
					message: 'Element updated'
				});
			})
			.catch(error => {
				this.element.setErrors(error.data.errors);
				// this.events.trigger('onError', error);
				this.element.busy = false;
			});
	}

	deleteElement(element)
	{
		this.$axios.delete(`${this.api}/${this.endpoint}/${element.system.id}`)
			.then(response => {
				this.getElements();
				this.action = 'index';
				this.vue.notifications.push({
					type: 'success',
					message: `Element successfully deleted`
				});
			})
			.catch(error => {
				this.vue.notifications.push({
					type: 'error',
					message: `Something went wrong.`
				});
			});
	}

	updateElementStatus(element, status)
	{

		this.$axios.put(`${this.api}/${this.endpoint}/${element.id}`, { status })
			.then(response => {
				this.getElements();
				this.action = 'index';
				this.vue.notifications.push({
					type: 'success',
					message: `Element status updated`
				});
			})
			.catch(error => {
				this.vue.notifications.push({
					type: 'error',
					message: `Something went wrong.`
				});
			});
	}

	updateStatusSelected(selected, status)
	{
		for ( let i in selected )
		{
			let element = selected[i];
			this.updateElementStatus(element, status.value);
		}
	}

	deleteSelected(selected)
	{
		if ( window.confirm('Are you sure you want to delete?') )
		{
			for ( let i in selected )
			{
				let element = selected[i];
				this.deleteElement(element);
			}
		}

	}

	searchElements()
	{

	}

}
