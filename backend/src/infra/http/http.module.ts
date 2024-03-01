import { CreateUserUseCase } from "@application/use-cases/create-user/user-create-use-case";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user-controller";

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    CreateUserUseCase
  ]
})
export class HttpModule { }