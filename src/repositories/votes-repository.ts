import { Prisma, Vote } from '@prisma/client'

export interface VotesRepository {
  create(data: Prisma.VoteUncheckedCreateInput): Promise<Vote>
}
