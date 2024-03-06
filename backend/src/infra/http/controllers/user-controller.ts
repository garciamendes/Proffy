import { CreateUserUseCase } from "@application/use-cases/create-user/user-create-use-case";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { AuthenticateUserUseCase } from "@application/use-cases/authenticate-user/authenticate-use-case";
import { ForgotoPasswordDTO, ValidateSessionResetDTO, resetPasswordSessionResetDTO } from "../dtos/forgot-password";
import { ForgotPasswordUserUseCase } from "@application/use-cases/forgot-password-user/forgot-password-use-case";
import { KillSessionTokenForgotPasswordUseCase } from "@application/use-cases/kill-session-token-forgot-password/kill-session-token-forgot-password-use-case";
import { ValidateSessionTokenUseCase } from "@application/use-cases/validate-session-token/validate-session-token-use-case";
import { ResetPasswordUseCase } from "@application/use-cases/save-new-password/save-new-password-use-case";
import { AuthGuard } from "src/guards/auth.guard";
import { GetUserUseCase } from "@application/use-cases/get-user/get-user-use-case";
import { GetAllConnectionsUseCase } from "@application/use-cases/get-all-connections/get-all-connections-use-case";
import { IUpdateProfileRequest, SaveProfileUseCase } from "@application/use-cases/save-profile/save-profile-use-case";

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private forgotPasswordUseCase: ForgotPasswordUserUseCase,
    private killSessionTokenForgotoPasswordUseCase: KillSessionTokenForgotPasswordUseCase,
    private validateSessionTokenUseCase: ValidateSessionTokenUseCase,
    private resetPasswordUseCase: ResetPasswordUseCase,
    private getUserUseCase: GetUserUseCase,
    private getAllConnections: GetAllConnectionsUseCase,
    private saveProfileUseCase: SaveProfileUseCase,
  ) { }

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    await this.createUserUseCase.execute(body)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string, password: string }) {
    const { email, password } = body

    const { access_token } = await this.authenticateUserUseCase.execute({ email, password })
    return { access_token }
  }

  @Get('current-user')
  @UseGuards(AuthGuard)
  async currentUser(@Req() request: any) {
    const sub = request.user?.sub
    const user = await this.getUserUseCase.execute({ user_id: sub })
    return user
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

  @Get('get-all-connections')
  @UseGuards(AuthGuard)
  async getAllConnectionsEndPoint() {
    const count = await this.getAllConnections.execute()

    return { count }
  }

  @Patch('profile')
  @UseGuards(AuthGuard)
  async saveProfile(@Body() body: IUpdateProfileRequest) {
    await this.saveProfileUseCase.execute(body.id, body)
  }
}