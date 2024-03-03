import { CreateUserUseCase } from "@application/use-cases/create-user/user-create-use-case";
import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { AuthenticateUserUseCase } from "@application/use-cases/authenticate-user/authenticate-use-case";
import { Request } from "express";
import { LocalGuard } from "src/guards/local.guard";
import { LoggedInGuard } from "src/guards/logger-in-guard";
import { ForgotoPasswordDTO, ValidateSessionResetDTO, resetPasswordSessionResetDTO } from "../dtos/forgot-password";
import { ForgotPasswordUserUseCase } from "@application/use-cases/forgot-password-user/forgot-password-use-case";
import { KillSessionTokenForgotPasswordUseCase } from "@application/use-cases/kill-session-token-forgot-password/kill-session-token-forgot-password-use-case";
import { ValidateSessionTokenUseCase } from "@application/use-cases/validate-session-token/validate-session-token-use-case";
import { ResetPasswordUseCase } from "@application/use-cases/save-new-password/save-new-password-use-case";

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private forgotPasswordUseCase: ForgotPasswordUserUseCase,
    private killSessionTokenForgotoPasswordUseCase: KillSessionTokenForgotPasswordUseCase,
    private validateSessionTokenUseCase: ValidateSessionTokenUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase
  ) { }

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    await this.createUserUseCase.execute(body)
  }

  @Get('logout')
  async logout(@Req() request: Request) {
    request.session.destroy(() => { return { status: HttpStatus.OK } })
  }

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() request: Request) {
    return request.sessionID
  }

  @Get('current-user')
  @UseGuards(LoggedInGuard)
  async currentUser(@Req() request: Request) {
    return request.session['passport'] as unknown
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotoPasswordDTO) {
    const res = await this.forgotPasswordUseCase.execute({ email: body.email })

    return { res }
  }

  @Post('validate-session-token')
  async validateSessionToken(@Body() body: ValidateSessionResetDTO) {
    const { t, u } = body
    const status = await this.validateSessionTokenUseCase.execute({ token: t, uid: u })

    return { status }
  }

  @Patch('reset-password')
  async resetPassword(@Body() body: resetPasswordSessionResetDTO) {
    const { t, u, newPassword } = body

    await this.resetPasswordUseCase.execute({ token: t, uid: u, newPassword })
  }
}