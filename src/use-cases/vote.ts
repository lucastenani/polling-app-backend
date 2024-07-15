import { Vote } from '@prisma/client'

import { VotesRepository } from '@/repositories/votes-repository'

interface VoteUseCaseProps {
  userId: string
  optionId: number
}

interface VoteUseCaseResponse {
  vote: Vote
}

export class VoteUseCase {
  constructor(private votesRepository: VotesRepository) {}

  async execute({
    userId,
    optionId,
  }: VoteUseCaseProps): Promise<VoteUseCaseResponse> {
    const didUserVoteOnSameOption =
      await this.votesRepository.findByUserIdAndOptionId(userId, optionId)

    if (didUserVoteOnSameOption) {
      throw new Error('User has already voted on this option.')
    }

    const vote = await this.votesRepository.create({
      option_id: optionId,
      user_id: userId,
    })

    return { vote }
  }
}
