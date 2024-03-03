import { UserRepository } from "@application/repositories/user-repository";
import { Prisma, User, tokenForgotPassword } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput) {
    await this.prisma.user.create({ data })
  }

  async findById(userId: string) {
    const user = this.prisma.user.findUnique({ where: { id: userId } })

    if (!user)
      return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.prisma.user.findUnique({ where: { email } })

    if (!user)
      return null

    return user
  }

  async createSessionReset(user: User) {
    const tokenSession = await this.prisma.tokenForgotPassword.create({
      data: {
        userId: user.id,
        token: await hash(user.id, 10)
      }
    })

    return tokenSession
  }

  async findSessionReset(id: string) {
    const tokenSession = await this.prisma.tokenForgotPassword.findUnique({
      where: { id }
    })

    if (!tokenSession)
      return null

    return tokenSession
  }

  async killSessionReset(sessionToken: tokenForgotPassword) {
    await this.prisma.tokenForgotPassword.update({
      where: { token: sessionToken.token, id: sessionToken.id },
      data: {
        blacklist: {
          push: sessionToken.token
        }
      }
    })
  }

  async findSessionResetByUser(user_id: string) {
    const sessionToken = await this.prisma.tokenForgotPassword.findUnique({
      where: { userId: user_id }
    })

    if (!sessionToken)
      return null

    return sessionToken
  }

  async saveSessionTokenReset(data: Partial<tokenForgotPassword>) {
    const { id, ...rest } = data

    const sessionToken = await this.prisma.tokenForgotPassword.update({
      where: { id },
      data: rest
    })

    return sessionToken
  }

  async saveNewPasswordUser(data: Partial<User>) {
    const { id, password, ...rest } = data

    await this.prisma.user.update({
      where: { id },
      data: {
        password,
        modified: new Date()
      }
    })
  }
}