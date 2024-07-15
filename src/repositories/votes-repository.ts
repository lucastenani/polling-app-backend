import { Prisma, Vote } from '@prisma/client'

export interface VotesRepository {
  create(data: Prisma.VoteUncheckedCreateInput): Promise<Vote>
  findByUserIdAndOptionId(
    userId: string,
    optionId: number,
  ): Promise<Vote | null>
}
