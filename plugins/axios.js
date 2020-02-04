
export default function ({ $axios, store, app, redirect, route, error }) {

	$axios.onError(err => {

        if ( err.response.status == 401 )
        {
            app.$auth.logout()
            store.dispatch('notifications/addMessage', {
                type: 'error',
                message: 'Authentication expired. Please login again'
            })
        }

        if ( err.response.status == 403 )
        {
            error({
                statusCode: 403,
                message: "You don't have permission to access this page."
            })
        }

        if ( err.response.status == 404 )
        {
            error({
                statusCode: 404,
                message: '404 Not Found.'
            })
        }

		if ( err.response.status === 422 )
		{
			store.dispatch('validation/setErrors', err.response.data.errors)
            store.dispatch('notifications/addMessage', {
                type: 'error',
                message: 'Validation failed'
            })
		}

        if ( err.response.status === 500 )
        {
            store.dispatch('notifications/addMessage', {
                type: 'error',
                message: `${(err.response.data) ? err.response.data.errors.message : 'Something went wrong'}`
            })
        }

		return Promise.reject(err)

	})

    $axios.onResponse((response) => {

        if ( response.data.message )
        {
            store.dispatch('notifications/addMessage', {
                type: 'success',
                message: response.data.message,
            })
        }

    })

	$axios.onRequest(() => {
        store.dispatch('validation/clearErrors')
		// store.dispatch('notifications/clearMessages')
	})

}
