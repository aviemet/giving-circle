// TypesFromSerializers CacheKey de6e2d94d2e507b6d31b8707b287d951
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type PresentationsPersisted from '../../Presentations/Persisted'

declare global {
  namespace Schema {
    interface PresentationElementsShow {
      id: string
      created_at: string | Date
      data: Record<string, string>
      name: string
      presentations: PresentationsPersisted[]
      template: boolean
      updated_at: string | Date
    }
  }
}
