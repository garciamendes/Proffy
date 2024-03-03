import { AuthenticateUserUseCase } from "@application/use-cases/authenticate-user/authenticate-use-case";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string) {
    return await this.authenticateUserUseCase.validateUser({ email, password })
  }
}