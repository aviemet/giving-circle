// TypesFromSerializers CacheKey 5f3e63c01e170db971252e67d249b0e2
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesPersisted from '../Circles/Persisted'

declare global {
  namespace Schema {
    interface OrgsShow {
      id: string
      circle: CirclesPersisted
      circle_id: string
      created_at: string | Date
      description?: string
      name?: string
      slug: string
      updated_at: string | Date
    }
  }
}
