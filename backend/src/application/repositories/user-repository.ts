import { IUpdateProfileRequest } from '@application/use-cases/save-profile/save-profile-use-case';
import { Prisma, User, tokenForgotPassword } from '@prisma/client'

export abstract class UserRepository {
  abstract create(data: Prisma.UserCreateInput): Promise<void>
  abstract findById(userId: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract createSessionReset(user: User): Promise<tokenForgotPassword>
  abstract killSessionReset(sessionToken: tokenForgotPassword): Promise<void>
  abstract findSessionReset(id: string): Promise<tokenForgotPassword | null>
  abstract findSessionResetByUser(user_id: string): Promise<tokenForgotPassword | null>
  abstract saveSessionTokenReset(data: Partial<tokenForgotPassword>): Promise<tokenForgotPassword>
  abstract saveNewPasswordUser(data: Partial<User>): Promise<void>
  abstract getAllConnections(): Promise<number>
  abstract saveProfile(user_id: string, data: IUpdateProfileRequest): Promise<User>
  abstract uploadAvatar(user_id: string, filename: string): Promise<void>
}