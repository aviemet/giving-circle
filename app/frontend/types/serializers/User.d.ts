// TypesFromSerializers CacheKey d988ab972a5b73fd0d55ccbb72587f22
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
import type { Activity } from './Activity'

declare global {
  namespace Schema {
    interface User {
      id?: number
      activities: Activity[]
      confirmationSentAt?: string | Date
      confirmedAt?: string | Date
      createdAt: string | Date
      currentSignInAt?: string | Date
      currentSignInIp?: string
      email: string
      failedAttempts: number
      lastSignInAt?: string | Date
      lastSignInIp?: string
      lockedAt?: string | Date
      rememberCreatedAt?: string | Date
      resetPasswordSentAt?: string | Date
      signInCount: number
      unconfirmedEmail?: string
      updatedAt: string | Date
    }
  }
}
