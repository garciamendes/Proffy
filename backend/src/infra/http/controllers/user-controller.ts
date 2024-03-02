import { CreateUserUseCase } from "@application/use-cases/create-user/user-create-use-case";
import { Body, Controller, Get, HttpStatus, Param, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "../dtos/create-user-dto";
import { AuthenticateUserUseCase } from "@application/use-cases/authenticate-user/authenticate-use-case";
import { Request } from "express";
import { LocalGuard } from "src/guards/local.guard";
import { request } from "http";
import { LoggedInGuard } from "src/guards/logger-in-guard";

@Controller('user')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase
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
}