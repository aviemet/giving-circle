// TypesFromSerializers CacheKey e7914837682657d9f5eab716b76dd976
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type { CirclesShare } from '../Circles/Share'

declare global {
  namespace Schema {
    interface UsersShare {
      id: number
      circles: CirclesShare[]
      createdAt: string | Date
      email: string
      updatedAt: string | Date
    }
  }
}
