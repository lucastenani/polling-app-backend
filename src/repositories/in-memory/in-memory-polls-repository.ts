import { Poll, Prisma } from '@prisma/client'

import { PollsRepository } from '../poll-repository'

export class InMemoryPollsRepository implements PollsRepository {
  public items: Poll[] = []
  private currentId = 1

  async create(data: Prisma.PollUncheckedCreateInput): Promise<Poll> {
    const optionsArray = Array.isArray(data.options) ? data.options : []

    const poll: Poll = {
      id: this.currentId,
      title: data.title,
      description: data.description || null,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
      user_id: data.user_id,
      options: optionsArray,
      vote_option1: 0,
      vote_option2: 0,
    }

    this.items.push(poll)
    this.currentId += 1

    return poll
  }

  async findAll(): Promise<Poll[]> {
    return this.items.filter((poll) => poll.is_active)
  }

  async findById(id: number): Promise<Poll | null> {
    const poll =
      this.items.find((poll) => poll.id === id && poll.is_active) || null
    return poll
  }

  async update(
    id: number,
    data: Prisma.PollUncheckedUpdateInput,
  ): Promise<Poll> {
    const poll = this.items.find((poll) => poll.id === id && poll.is_active)

    if (!poll) {
      throw new Error('Poll not found.')
    }

    Object.assign(poll, {
      ...data,
      updated_at: new Date(),
    })

    return poll
  }

  async deactivate(id: number): Promise<Poll> {
    const pollIndex = this.items.findIndex(
      (poll) => poll.id === id && poll.is_active,
    )

    if (pollIndex === -1) {
      throw new Error('Poll not found.')
    }

    this.items[pollIndex].is_active = false

    return this.items[pollIndex]
  }
}
