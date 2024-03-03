import { UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";

interface IUserRequest {
  email: string
}

@Injectable()
export class ForgotPasswordUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ email }: IUserRequest) {
    const userExist = await this.userRepository.findByEmail(email)

    if (!userExist)
      throw new Error('User not found!')

    const hasSessionResetPass = await this.userRepository.findSessionResetByUser(userExist.id)

    let tokenResponse = ''
    let idResponse = ''

    if (!hasSessionResetPass) {
      const { token, id } = await this.userRepository.createSessionReset(userExist)
      tokenResponse = token
      idResponse = id
    }

    const data = {
      id: hasSessionResetPass?.id,
      token: await hash(userExist.id, 10),
      created: new Date()
    }

    const sessionToken = await this.userRepository.saveSessionTokenReset(data)
    tokenResponse = sessionToken?.token as string
    idResponse = sessionToken?.id as string

    console.log(`${process.env.SET_PASSWORD_LINK_FRONTEND}?u=${idResponse}&t=${tokenResponse}`)
    return { message: 'Sended link to email' }
  }
}