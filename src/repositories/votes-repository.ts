import { Prisma, Vote } from '@prisma/client'

export interface VotesRepository {
  create(data: Prisma.VoteUncheckedCreateInput): Promise<Vote>
  findByUserId(id: string): Promise<Vote | null>
  findByUserIdAndOptionId(
    userId: string,
    optionId: number,
  ): Promise<Vote | null>
  update(id: number, data: Prisma.VoteUncheckedUpdateInput): Promise<Vote>
}
