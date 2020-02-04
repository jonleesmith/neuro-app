
import User from '~/elements/User'

export const getters = {
    authenticated: (state) => state.loggedIn,
    user: (state) => new User(state.user),
    org: (state) => (state.user) ? state.user.org : {}
}
