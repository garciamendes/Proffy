import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { hash } from 'bcrypt'

interface IUserRequest {
  user_id: string
}

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ user_id }: IUserRequest) {
    const user = await this.userRepository.findById(user_id)

    if (!user)
      return new NotFoundException()

    const { password, ...rest } = user
    return rest
  }
}