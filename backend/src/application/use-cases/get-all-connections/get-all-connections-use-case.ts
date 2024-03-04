import { UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GetAllConnectionsUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute() {
    const count = await this.userRepository.getAllConnections()

    return count
  }
}