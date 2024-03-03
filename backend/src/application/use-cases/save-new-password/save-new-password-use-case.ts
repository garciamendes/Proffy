import { UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { ValidateSessionTokenUseCase } from "../validate-session-token/validate-session-token-use-case";

interface IResetPasswordRequest {
  uid: string
  token: string
  newPassword: string
}

@Injectable()
export class ResetPasswordUseCase {
  constructor(
    private userRepository: UserRepository,
    private validateSessionTokenUseCase: ValidateSessionTokenUseCase
  ) { }

  async execute({ uid, token, newPassword }: IResetPasswordRequest) {
    const hasSessionToken = await this.userRepository.findSessionReset(uid)

    if (!hasSessionToken)
      throw new Error('Session not valid')

    const user = await this.userRepository.findById(hasSessionToken.userId)
    if (!user)
      throw new Error('Session not valid')

    const isValid = await this.validateSessionTokenUseCase.validations(hasSessionToken, token)
    if (!isValid)
      throw new Error('Session not valid')


    const password_hash = await hash(newPassword, 10)
    const data = {
      id: user.id,
      password: password_hash
    }

    await this.userRepository.saveNewPasswordUser(data)
  }
}