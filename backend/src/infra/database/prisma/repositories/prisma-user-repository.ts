import { UserRepository } from "@application/repositories/user-repository";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.UserCreateInput) {
    await this.prisma.user.create({ data })
  }
}