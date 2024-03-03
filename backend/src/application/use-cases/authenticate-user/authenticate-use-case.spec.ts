import { UserInMemoryRepository } from "@test/in-memory-repository/user-in-memory"
import { AuthenticateUserUseCase } from "./authenticate-use-case"
import { hash } from "bcrypt"

describe('User Create', () =>{
  it('should be able to create a user', async () => {
    const userRepository = new UserInMemoryRepository()
    const authenticateUseCase = new AuthenticateUserUseCase(userRepository)

    await userRepository.create({
      email: 'teste@gmail.com',
      fullname: 'teste',
      password: await hash('dev123', 10)
    })

    const user = await authenticateUseCase.validateUser({
      email: 'teste@gmail.com',
      password: 'dev123'
    })

    expect(user).toBeTruthy()
  })
})