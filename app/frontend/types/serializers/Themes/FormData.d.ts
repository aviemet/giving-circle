// TypesFromSerializers CacheKey 5a84a3f2828b4ae9762cb339544b7b72
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
export {}

declare global {
  namespace Schema {
    interface ThemesFormData {
      id?: string
      slug?: string
      circle_id: string
      name?: string
      published_at?: string | Date
      status: "draft" | "current" | "past" | "future"
    }
  }
}
