import { Prisma, Vote } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { VotesRepository } from '../votes-repository'

export class PrismaVotesRepository implements VotesRepository {
  async create(data: Prisma.VoteUncheckedCreateInput): Promise<Vote> {
    const vote = await prisma.vote.create({
      data: {
        user_id: data.user_id,
        option_id: data.option_id,
        poll_id: data.poll_id,
        created_at: new Date(),
      },
    })
    return vote
  }

  async findByUserId(userId: string): Promise<Vote | null> {
    const vote = await prisma.vote.findFirst({
      where: {
        user_id: userId,
      },
    })
    return vote
  }

  async findByUserIdAndOptionId(
    userId: string,
    optionId: number,
  ): Promise<Vote | null> {
    const vote = await prisma.vote.findFirst({
      where: {
        user_id: userId,
        option_id: optionId,
      },
    })
    return vote
  }

  async update(
    id: number,
    data: Prisma.VoteUncheckedUpdateInput,
  ): Promise<Vote> {
    const vote = await prisma.vote.update({
      where: { id },
      data,
    })
    return vote
  }
}
