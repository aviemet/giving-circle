// TypesFromSerializers CacheKey 99ce7fb67eddad35fa45ea30717af289
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesPersisted from '../Circles/Persisted'

declare global {
  namespace Schema {
    interface PresentationTemplatesIndex {
      id: string
      circle: CirclesPersisted
      created_at: string | Date
      name: string
      slug: string
      updated_at: string | Date
    }
  }
}
