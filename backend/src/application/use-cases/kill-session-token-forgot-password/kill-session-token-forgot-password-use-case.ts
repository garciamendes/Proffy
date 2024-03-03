import { UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";

interface IKillSessionRequest {
  id: string
  token: string
}

@Injectable()
export class KillSessionTokenForgotPasswordUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute({ id }: IKillSessionRequest) {
    const sessionToken = await this.userRepository.findSessionReset(id)

    if (!sessionToken)
      throw new Error('Session not found!')

    await this.userRepository.killSessionReset(sessionToken)
  }
}