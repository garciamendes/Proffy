import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, Req } from "@nestjs/common";
import { compare } from 'bcrypt'

interface IUserRequest {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async validateUser({ email, password }: IUserRequest) {
    const userExist = await this.userRepository.findByEmail(email)

    if (!userExist)
      throw new Error('Email or password incorrect')

    const isPasswordMatch = await compare(password, userExist.password)
    if (!isPasswordMatch)
      throw new Error('Email or password incorrect')

    const { password: pass, ...userData } = userExist
    return userData
  }
}