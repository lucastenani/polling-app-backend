import { Prisma, Vote } from '@prisma/client'

export interface VotesRepository {
  create(data: Prisma.VoteUncheckedCreateInput): Promise<Vote>
  findByUserId(userId: string): Promise<Vote | null>
  findByOptionId(optionId: number): Promise<Vote | null>
}
