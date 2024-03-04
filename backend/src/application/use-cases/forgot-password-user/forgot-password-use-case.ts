import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, NotFoundException } from "@nestjs/common";
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
      throw new NotFoundException('User not found')

    const hasSessionResetPass = await this.userRepository.findSessionResetByUser(userExist.id)


    if (!hasSessionResetPass) {
      const { token, id } = await this.userRepository.createSessionReset(userExist)

      console.log(`${process.env.SET_PASSWORD_LINK_FRONTEND}?u=${id}&t=${token}`)
      return { message: 'Sended link to email' }
    }

    const data = {
      id: hasSessionResetPass?.id,
      token: await hash(userExist.id, 10),
      created: new Date()
    }

    const { id, token } = await this.userRepository.saveSessionTokenReset(data)

    console.log(`${process.env.SET_PASSWORD_LINK_FRONTEND}?u=${id}&t=${token}`)
    return { message: 'Sended link to email' }
  }
}