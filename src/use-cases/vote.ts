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
    const existingVote = await this.votesRepository.findByUserId(userId)
    if (existingVote && existingVote.option_id === optionId) {
      throw new Error('User has already voted on this option.')
    }

    if (existingVote && existingVote.option_id !== optionId) {
      const updatedVote = await this.votesRepository.update(existingVote.id, {
        option_id: optionId,
      })
      return { vote: updatedVote }
    }

    const vote = await this.votesRepository.create({
      option_id: optionId,
      user_id: userId,
    })

    return { vote }
  }
}
