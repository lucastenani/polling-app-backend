import { Vote } from '@prisma/client'

import { PollsRepository } from '@/repositories/poll-repository'
import { VotesRepository } from '@/repositories/votes-repository'

interface ExecuteVoteProps {
  userId: string
  optionId: number
  pollId: number
}

export class VoteUseCase {
  constructor(
    private votesRepository: VotesRepository,
    private pollsRepository: PollsRepository,
  ) {}

  async execute({
    userId,
    optionId,
    pollId,
  }: ExecuteVoteProps): Promise<{ vote: Vote }> {
    const poll = await this.pollsRepository.findById(pollId)

    if (!poll || !poll.is_active) {
      throw new Error('Poll is not active. Cannot vote.')
    }

    let existingVote = await this.votesRepository.findByUserIdAndOptionId(
      userId,
      pollId,
    )

    if (existingVote) {
      if (existingVote.option_id === optionId) {
        throw new Error('User has already voted on this option.')
      } else {
        existingVote = await this.votesRepository.update(existingVote.id, {
          option_id: optionId,
        })
      }
    } else {
      existingVote = await this.votesRepository.create({
        user_id: userId,
        option_id: optionId,
        poll_id: pollId,
      })
    }

    return { vote: existingVote }
  }
}
