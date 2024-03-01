import { UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { hash } from 'bcrypt'

interface IUserRequest {
  fullname: string
  email: string
  password: string
}

@Injectable()
export class CreateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, fullname, password }: IUserRequest) {

    const passwordHash = await hash(password, 10)
    await this.userRepository.create({
      email,
      fullname,
      password: passwordHash
    })
  }
}