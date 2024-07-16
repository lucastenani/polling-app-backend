import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { OptionsRepository } from '../options-repository'

export class PrismaOptionsRepository implements OptionsRepository {
  async create(data: Prisma.OptionUncheckedCreateInput) {
    const option = await prisma.option.create({
      data: {
        pollId: data.pollId,
        text: data.text,
        vote_count: data.vote_count || 0,
      },
    })

    return option
  }
}
