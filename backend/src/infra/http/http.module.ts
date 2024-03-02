import { CreateUserUseCase } from "@application/use-cases/create-user/user-create-use-case";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user-controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/strategies/loca.strategy";
import { Session } from "@application/use-cases/authenticate-user/session";
import { AuthenticateUserUseCase } from "@application/use-cases/authenticate-user/authenticate-use-case";

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ session: true })
  ],
  controllers: [
    UserController
  ],
  providers: [
    CreateUserUseCase,
    AuthenticateUserUseCase,
    LocalStrategy,
    Session,
  ]
})
export class HttpModule { }