// TypesFromSerializers CacheKey c3c2b19403a515855837cc5bed17259e
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type IUserTablePreferences from '../../IUserTablePreferences'
import type IUserPreferences from '../../IUserPreferences'
import type CirclesShare from '../Circles/Share'
import type Person from '../Person'
import type Role from '../Role'

declare global {
  namespace Schema {
    interface UsersShow {
      id: string
      active: boolean
      circles: CirclesShare[]
      created_at: string | Date
      email: string
      person: Person
      person_id?: string
      roles: Role[]
      table_preferences: IUserTablePreferences
      updated_at: string | Date
      user_preferences: IUserPreferences
    }
  }
}
