import { IsNotEmpty, IsEmail, isNotEmpty } from "class-validator";

export class ForgotoPasswordDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string
}

export class ValidateSessionResetDTO {
  @IsNotEmpty()
  u: string

  @IsNotEmpty()
  t: string
}

export class resetPasswordSessionResetDTO {
  @IsNotEmpty()
  u: string

  @IsNotEmpty()
  t: string

  @IsNotEmpty()
  newPassword: string
}