import { UserRepository } from "@application/repositories/user-repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CHOICES_MATTERS, CHOICE_DAY_WEEK } from "@prisma/client";

export interface IDayWeek {
  id: string
  dayWeek: CHOICE_DAY_WEEK
  from: Date
  to: Date
  userId: string
}

export interface IDataDayWeek {
  creates: Array<Omit<IDayWeek, 'id'>>
  updates: Array<IDayWeek>
  deletes: Array<string>
}

export interface IUpdateProfileRequest {
  id: string
  bio: string
  dayWeek: IDataDayWeek
  email: string
  fullname: string
  matter: CHOICES_MATTERS
  valueByhours: string
  whatsapp: string
}

@Injectable()
export class SaveProfileUseCase {
  constructor(
    private userRepository: UserRepository,
  ) { }

  async execute(user_id: string, data: IUpdateProfileRequest) {
    const user = await this.userRepository.findById(data.id)

    if (!user)
      return new NotFoundException()


    const userUpdated = await this.userRepository.saveProfile(user_id, data)
  }
}