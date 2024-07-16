import { Prisma, Vote } from '@prisma/client'

import { VotesRepository } from '@/repositories/votes-repository'

export class InMemoryVotesRepository implements VotesRepository {
  public items: Vote[] = []
  private currentId = 1

  async create(data: Prisma.VoteUncheckedCreateInput): Promise<Vote> {
    const vote: Vote = {
      id: this.currentId,
      user_id: data.user_id,
      option_id: data.option_id,
      poll_id: data.poll_id,
      created_at: new Date(),
    }

    this.items.push(vote)
    this.currentId += 1

    return vote
  }

  async findByUserId(userId: string): Promise<Vote | null> {
    return this.items.find((vote) => vote.user_id === userId) || null
  }

  async findByUserIdAndOptionId(
    userId: string,
    optionId: number,
  ): Promise<Vote | null> {
    return (
      this.items.find(
        (vote) => vote.user_id === userId && vote.option_id === optionId,
      ) || null
    )
  }

  async update(
    id: number,
    data: Prisma.VoteUncheckedUpdateInput,
  ): Promise<Vote> {
    const vote = this.items.find((vote) => vote.id === id)

    if (!vote) {
      throw new Error('Vote not found.')
    }

    Object.assign(vote, data)

    return vote
  }
}
