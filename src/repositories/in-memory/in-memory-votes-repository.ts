import { Prisma, Vote } from '@prisma/client'

import { VotesRepository } from '../votes-repository'

export class InMemoryVotesRepository implements VotesRepository {
  public items: Vote[] = []
  private currentId = 1

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
