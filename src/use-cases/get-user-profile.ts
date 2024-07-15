import { User } from '@prisma/client'

import { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/rosource-not-found-error'

interface GetUserUseCaseProps {
  userId: string
}

interface GetUserUseCaseResponse {
  user: User
}

export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseProps): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
