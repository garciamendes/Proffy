import { UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { tokenForgotPassword } from "@prisma/client";
import { compare } from "bcrypt";
import * as dayjs from 'dayjs'

interface IValidateSessionTokenRequest {
  uid: string
  token: string
}

@Injectable()
export class ValidateSessionTokenUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ uid, token }: IValidateSessionTokenRequest) {
    const hasSessionToken = await this.userRepository.findSessionReset(uid)

    if (!hasSessionToken)
      return false

    return this.validations(hasSessionToken, token)
  }

  private isTokenValid(created: Date) {
    const expirationTime = 1
    const now = dayjs()
    const tokenExpiration = dayjs(created).add(expirationTime, 'hour')

    return now.isBefore(tokenExpiration)
  }

  public async validations(hasSessionToken: tokenForgotPassword, token: string) {
    const user = await this.userRepository.findById(hasSessionToken.userId)

    if (!user)
      return false

    const sessionMatch = await compare(user.id, hasSessionToken.token)
    if (!sessionMatch)
      return false

    const tokenHasBlackList = hasSessionToken.blacklist.includes(token)
    if (tokenHasBlackList)
      return false


    if (!this.isTokenValid(hasSessionToken.created)) {
      await this.userRepository.killSessionReset(hasSessionToken)
      return false
    }

    return true
  }
}