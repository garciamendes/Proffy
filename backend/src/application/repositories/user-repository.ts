import { Prisma, User } from '@prisma/client'

export abstract class UserRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<void>
  abstract findById(userId: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
}