import { IFIltersListEducators, UserRepository } from "@application/repositories/user-repository";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { exclude } from "@utils/excludeFields";

@Injectable()
export class ListEducatorsUseCase {
  constructor(private userRepository: UserRepository) { }

  async execute(filters?: IFIltersListEducators) {
    const listEducators = await this.userRepository.listEducators(filters)

    const listEducatorsResponse = [] as Omit<User, 'password'>[]

    for await (let educator of listEducators) {
      const item = exclude(educator, ['password'])
      listEducatorsResponse.push(item)
    }

    return listEducatorsResponse
  }
}