// TypesFromSerializers CacheKey bb102ca4a16e2b68246a0038c19f7583
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type PresentationSlidesPersisted from '../PresentationSlides/Persisted'

declare global {
  namespace Schema {
    interface PresentationsEdit {
      id: string
      active: boolean
      created_at: string | Date
      name: string
      slides: PresentationSlidesPersisted[]
      slug: string
      theme_id: string
      updated_at: string | Date
    }
  }
}
