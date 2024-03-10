import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { exclude } from "@utils/excludeFields";
interface IUserRequest {
  user_id: string
}

@Injectable()
export class GetUserUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ user_id }: IUserRequest) {
    const user = await this.userRepository.findById(user_id)

    if (!user)
      throw new NotFoundException()

    const rest = exclude(user, ['password'])
    return rest
  }
}