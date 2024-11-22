// TypesFromSerializers CacheKey ec748121003b6620f8104b2132ca19f9
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type MembershipsPersisted from '../Memberships/Persisted'
import type ThemesPersisted from '../Themes/Persisted'

declare global {
  namespace Schema {
    interface CirclesShow {
      id: string
      created_at: string | Date
      memberships: MembershipsPersisted[]
      name: string
      slug: string
      themes: ThemesPersisted[]
      updated_at: string | Date
    }
  }
}
