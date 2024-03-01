import { UserInMemoryRepository } from "@test/in-memory-repository/user-in-memory"
import { CreateUserUseCase } from "./user-create-use-case"

describe('User Create', () =>{
  it('should be able to create a user', async () => {
    const userRepository = new UserInMemoryRepository()
    const createUserUseCase = new CreateUserUseCase(userRepository)

    await createUserUseCase.execute({
      email: 'user@example.com',
      fullname: 'Teste',
      password: 'dev123'
    })

    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0].id).toBeTruthy()
  })
})