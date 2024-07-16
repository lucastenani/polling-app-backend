import { Option, Prisma } from '@prisma/client'

export interface OptionsRepository {
  create(data: Prisma.OptionUncheckedCreateInput): Promise<Option>
}
