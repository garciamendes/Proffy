import { UserRepository } from "@application/repositories/user-repository";
import { Prisma, User, tokenForgotPassword } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { IUpdateProfileRequest } from "@application/use-cases/save-profile/save-profile-use-case";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput) {
    await this.prisma.user.create({ data })
  }

  async findById(userId: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        dayWeek: {
          select: {
            id: true,
            dayWeek: true,
            to: true,
            from: true
          },
          orderBy: {
            created: "asc"
          }
        }
      }
    })

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

  async getAllConnections(): Promise<number> {
    const count = await this.prisma.user.count()

    return count
  }

  async saveProfile(user_id: string, data: IUpdateProfileRequest) {
    const { dayWeek, bio, email, fullname, matter, valueByhours, whatsapp } = data

    const { creates, deletes, updates } = dayWeek
    const user = await this.prisma.$transaction(async (p) => {
      for (const item of creates) {
        await p.dayWeek.create({
          data: {
            dayWeek: item.dayWeek,
            from: item.from,
            to: item.to,
            userId: user_id
          }
        })
      }

      for (const item of updates) {
        await p.dayWeek.update({
          where: { id: item.id },
          data: {
            dayWeek: item.dayWeek,
            from: item.from,
            to: item.to,
          }
        })
      }

      for (const item of deletes) {
        await p.dayWeek.delete({
          where: { id: item }
        })
      }

      const user = await this.prisma.user.update({
        where: { id: user_id },
        data: {
          bio,
          email,
          fullname,
          matter,
          valueByhours: new Prisma.Decimal(valueByhours),
          whatsapp
        },
      })

      return user
    })

    return user
  }
}