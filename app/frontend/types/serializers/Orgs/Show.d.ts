// TypesFromSerializers CacheKey a8b93b2898733cb25027daae7d3b9e9a
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesPersisted from '../Circles/Persisted'

declare global {
  namespace Schema {
    interface OrgsShow {
      id: string
      circle: CirclesPersisted
      created_at: string | Date
      description?: string
      name: string
      slug: string
      updated_at: string | Date
    }
  }
}
