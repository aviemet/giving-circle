// TypesFromSerializers CacheKey eb2d3c81f30dfad74cfdda79f1274536
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type { User } from './User'

declare global {
  namespace Schema {
    interface Role {
      id?: number
      createdAt: string | Date
      name?: string
      resourceId?: number
      resourceType?: string
      updatedAt: string | Date
      users: User[]
    }
  }
}
