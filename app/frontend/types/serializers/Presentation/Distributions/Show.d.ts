// TypesFromSerializers CacheKey ff4d567c62ea290ecfc381c1f496ec91
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type PresentationsPersisted from '../../Presentations/Persisted'

declare global {
  namespace Schema {
    interface PresentationDistributionsShow {
      id: string
      created_at: string | Date
      name: string
      presentations: PresentationsPersisted[]
      template: boolean
      type?: number
      updated_at: string | Date
    }
  }
}
