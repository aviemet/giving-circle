// TypesFromSerializers CacheKey 0b33ece11b90be2807cc5101b0d447fb
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type CirclesShare from '../Circles/Share'

declare global {
  namespace Schema {
    interface ThemesShow {
      id: number
      circle: CirclesShare
      circle_id: number
      created_at: string | Date
      published_at?: string | Date
      slug: string
      status: number
      title?: string
      updated_at: string | Date
    }
  }
}
