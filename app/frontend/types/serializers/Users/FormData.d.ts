// TypesFromSerializers CacheKey 0f4225f372df47dc336b67bcb3990e79
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesPersisted from '../Circles/Persisted'

declare global {
  namespace Schema {
    interface UsersFormData {
      id?: string
      active: boolean
      circles: CirclesPersisted[]
      email: string
      person_id?: string
    }
  }
}
