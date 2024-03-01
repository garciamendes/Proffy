import { IsNotEmpty, IsEmail } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  fullname: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}