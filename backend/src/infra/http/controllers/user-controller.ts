import { CreateUserUseCase } from "@application/use-cases/create-user/user-create-use-case";
import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "../dtos/create-user-dto";

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    await this.createUserUseCase.execute(body)
  }
}