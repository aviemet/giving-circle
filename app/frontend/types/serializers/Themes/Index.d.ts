// TypesFromSerializers CacheKey 5b7c47db5de5ada513bc7882901b0ffc
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
export {}

declare global {
  namespace Schema {
    interface ThemesIndex {
      id: string
      created_at: string | Date
      name?: string
      published_at?: string | Date
      slug: string
      status: "draft" | "current" | "past" | "future"
      updated_at: string | Date
    }
  }
}
