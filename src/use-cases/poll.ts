import { Option, Poll } from '@prisma/client'

import { PollsRepository } from '@/repositories/poll-repository'

interface CreatePollProps {
  title: string
  description?: string
  options: Option[]
  userId: string
}

interface UpdatePollProps {
  id: number
  title?: string
  description?: string
}

export class PollUseCase {
  constructor(private pollsRepository: PollsRepository) {}

  async createPoll({
    title,
    description,
    userId,
  }: CreatePollProps): Promise<Poll> {
    const poll = await this.pollsRepository.create({
      title,
      description,
      user_id: userId,
    })

    return poll
  }

  async listPolls(): Promise<Poll[]> {
    return this.pollsRepository.findAll()
  }

  async getPollById(id: number): Promise<Poll> {
    const poll = await this.pollsRepository.findById(id)

    if (!poll) {
      throw new Error('Poll not found.')
    }

    return poll
  }

  async updatePoll({ id, title, description }: UpdatePollProps): Promise<Poll> {
    const updatedPoll = await this.pollsRepository.update(id, {
      title,
      description,
    })

    return updatedPoll
  }

  async deactivatePoll(id: number): Promise<Poll> {
    const deactivatedPoll = await this.pollsRepository.deactivate(id)

    if (!deactivatedPoll) {
      throw new Error('Poll not found.')
    }

    return deactivatedPoll
  }
}
