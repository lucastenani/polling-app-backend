import { Prisma, Vote } from '@prisma/client'

import { VotesRepository } from '../votes-repository'

export class InMemoryVotesRepository implements VotesRepository {
  public items: Vote[] = []
  private currentId = 1

  async findByUserId(userId: string): Promise<Vote | null> {
    const didUserVote = this.items.find((vote) => vote.user_id === userId)

    return didUserVote || null
  }

  async findByOptionId(optionId: number): Promise<Vote | null> {
    const didUserVoteOnSameOption = this.items.find(
      (vote) => vote.option_id === optionId,
    )

    return didUserVoteOnSameOption || null
  }

  async create(data: Prisma.VoteUncheckedCreateInput) {
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
