import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UploadAvatarUseCase {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async execute(user_id: string, filename: string) {
    const user = await this.userRepository.findById(user_id)

    if (!user)
      return new NotFoundException()

    await this.userRepository.uploadAvatar(user_id, filename)
  }
}