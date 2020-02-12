
import User from '~/controllers/User'

export const getters = {
    authenticated: (state) => state.loggedIn,
    user: (state) => new User(state.user)
}
