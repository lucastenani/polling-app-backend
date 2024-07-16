import { Poll, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { PollsRepository } from '../poll-repository'

export class PrismaPollsRepository implements PollsRepository {
  async create(data: Prisma.PollUncheckedCreateInput): Promise<Poll> {
    const optionsArray = Array.isArray(data.options) ? data.options : []

    const poll = await prisma.poll.create({
      data: {
        title: data.title,
        description: data.description || null,
        created_at: new Date(),
        updated_at: new Date(),
        is_active: true,
        user_id: data.user_id,
        options: {
          create: optionsArray.map((option) => ({
            text: option.option_text, // Assuming 'text' is the property in your Prisma schema
            vote_count: option.vote_count || 0,
          })),
        },
      },
    })

    return poll
  }

  async findAll(): Promise<Poll[]> {
    const polls = await prisma.poll.findMany({
      where: {
        is_active: true,
      },
    })
    return polls
  }

  async findById(id: number): Promise<Poll | null> {
    const poll = await prisma.poll.findUnique({
      where: {
        id,
      },
    })

    return poll
  }

  async update(id: number, data: Prisma.PollUpdateInput): Promise<Poll> {
    const poll = await prisma.poll.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
    })

    return poll
  }

  async deactivate(id: number): Promise<Poll> {
    const poll = await prisma.poll.update({
      where: {
        id,
      },
      data: {
        is_active: false,
      },
    })

    return poll
  }
}
