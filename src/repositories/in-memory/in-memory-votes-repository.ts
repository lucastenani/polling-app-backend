import { Prisma, Vote } from '@prisma/client'

import { VotesRepository } from '../votes-repository'

export class InMemoryVotesRepository implements VotesRepository {
  public items: Vote[] = []
  private currentId = 1

  async findByUserIdAndOptionId(
    userId: string,
    optionId: number,
  ): Promise<Vote | null> {
    const existingVote = this.items.find(
      (vote) => vote.user_id === userId && vote.option_id === optionId,
    )

    return existingVote || null
  }

  async create(data: Prisma.VoteUncheckedCreateInput) {
    const existingVote = await this.findByUserIdAndOptionId(
      data.user_id,
      data.option_id,
    )

    if (existingVote) {
      throw new Error('User has already voted on this option.')
    }

    const vote: Vote = {
      id: this.currentId,
      user_id: data.user_id,
      option_id: data.option_id,
      created_at: new Date(),
    }

    this.items.push(vote)
    this.currentId += 1

    return vote
  }
}
