
import Model from '~/neuro/model'

export default class User extends Model {

    static element = 'users'

    userPermissions() {
        return this.permissions.map( type => type.name )
    }

    can(type, val) {
        let permissions = this.userPermissions()
        return permissions.includes(`${type}:${val}`)
    }

    is(role) {
        if ( this.role.name == 'superuser' )
        {
            return true
        }
        return this.role.name == role
    }

}
