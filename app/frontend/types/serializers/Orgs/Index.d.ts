// TypesFromSerializers CacheKey ef77655fbee981e51f640a87ccac12b8
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesPersisted from '../Circles/Persisted'

declare global {
  namespace Schema {
    interface OrgsIndex {
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
