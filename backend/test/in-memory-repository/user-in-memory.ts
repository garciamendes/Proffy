import { UserRepository } from "@application/repositories/user-repository";
import { $Enums, Prisma, User, tokenForgotPassword } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class UserInMemoryRepository implements UserRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      fullname: data.fullname,
      avatar: data.avatar || null,
      bio: data.bio || null,
      email: data.email,
      matter: null,
      password: data.password,
      valueByhours: data.valueByhours ? new Prisma.Decimal(data.valueByhours as number) : null,
      whatsapp: data.whatsapp || null,
      created: new Date(),
      modified: new Date()
    }

    this.users.push(user)
  }

  async findById(userId: string) {
    const user = this.users.find(user => user.id === userId)

    if (!user)
      return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email)

    if (!user)
      return null

    return user
  }

  async createSessionReset(user: User): Promise<{ id: string; token: string; blacklist: string[]; userId: string; created: Date; }> {
    throw new Error("Method not implemented.");
  }

  async killSessionReset(sessionToken: { id: string; token: string; blacklist: string[]; userId: string; created: Date; }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findSessionReset(id: string): Promise<{ id: string; token: string; blacklist: string[]; userId: string; created: Date; } | null> {
    throw new Error("Method not implemented.");
  }

  async findSessionResetByUser(user_id: string): Promise<{ id: string; token: string; blacklist: string[]; userId: string; created: Date; } | null> {
    throw new Error("Method not implemented.");
  }
  async saveSessionTokenReset(data: Partial<{ id: string; token: string; blacklist: string[]; userId: string; created: Date; }>): Promise<{ id: string; token: string; blacklist: string[]; userId: string; created: Date; } | null> {
    throw new Error("Method not implemented.");
  }

  async saveNewPasswordUser(data: Partial<{ id: string; fullname: string; email: string; whatsapp: string | null; bio: string | null; avatar: string | null; password: string; valueByhours: Prisma.Decimal | null; matter: $Enums.CHOICES_MATTERS | null; modified: Date; created: Date; }>): Promise<any> {
    throw new Error("Method not implemented.");
  }
}