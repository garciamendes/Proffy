import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, Req } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from 'bcrypt'

interface IUserRequest {
  email: string
  password: string
}

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) { }

  async execute({ email, password }: IUserRequest) {
    const userExist = await this.userRepository.findByEmail(email)

    if (!userExist)
      throw new Error('Email or password incorrect')

    const isPasswordMatch = await compare(password, userExist.password)
    if (!isPasswordMatch)
      throw new Error('Email or password incorrect')

    const payload = { sub: userExist.id }
    const access_token = await this.jwtService.signAsync(payload)

    return { access_token }
  }
}