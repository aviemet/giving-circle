// TypesFromSerializers CacheKey 84685f96d643695eea8c4917f669c2ce
//
// DO NOT MODIFY: This file was automatically generated by TypesFromSerializers.
export {}

declare global {
  namespace Schema {
    interface User {
      id?: number
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
