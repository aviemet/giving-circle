// TypesFromSerializers CacheKey 7e173b4aaf9e6c82463df24587e46bb7
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesOptions from '../Circles/Options'

declare global {
  namespace Schema {
    interface MembersIndex {
      id: number
      circle: CirclesOptions[]
      created_at: string | Date
      first_name?: string
      last_name?: string
      number?: string
      updated_at: string | Date
    }
  }
}
