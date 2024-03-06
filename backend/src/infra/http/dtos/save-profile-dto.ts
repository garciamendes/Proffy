import { IsNotEmpty, IsEmail, isNotEmpty } from "class-validator";

export class saveProfileDTO {
  @IsNotEmpty()
  u: string

  @IsNotEmpty()
  t: string

  @IsNotEmpty()
  newPassword: string
}