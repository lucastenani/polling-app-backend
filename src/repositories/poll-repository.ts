import { Poll, Prisma } from '@prisma/client'

export interface PollsRepository {
  create(data: Prisma.PollUncheckedCreateInput): Promise<Poll>
  findAll(): Promise<Poll[]>
  findById(id: number): Promise<Poll | null>
  update(id: number, data: Prisma.PollUpdateInput): Promise<Poll>
  deactivate(id: number): Promise<Poll>
}
