import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPollsRepository } from '@/repositories/in-memory/in-memory-polls-repository'

import { PollUseCase } from './poll'

const createMockOption = (text: string) => ({
  id: 1, // Adjust ID if needed for your test scenario
  text,
  vote_count: 0,
  pollId: 1,
})

describe('Poll management system', () => {
  let pollsRepository: InMemoryPollsRepository
  let pollUseCase: PollUseCase

  beforeEach(() => {
    pollsRepository = new InMemoryPollsRepository()
    pollUseCase = new PollUseCase(pollsRepository)
  })

  it('Should be able to create a new poll with two options', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')

    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [option1, option2],
      userId: '1',
    })

    expect(createdPoll.id).toBe(1)
    expect(createdPoll.title).toBe('Favorite programming language?')
    expect(createdPoll.description).toBe(
      'Choose your favorite programming language',
    )
  })

  it('Should be able to list all polls', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')

    await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      userId: '1',
      options: [option1, option2],
    })

    const option3 = createMockOption('option 1')
    const option4 = createMockOption('option 2')

    await pollUseCase.createPoll({
      title: 'Best frontend framework?',
      description: 'Choose the best frontend framework',
      userId: '1',
      options: [option3, option4],
    })

    const polls = await pollUseCase.listPolls()

    expect(polls).toHaveLength(2)
    expect(polls[0].title).toBe('Favorite programming language?')
    expect(polls[1].title).toBe('Best frontend framework?')
  })

  it('Should be able to get details of a specific poll by ID', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')

    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      userId: '1',
      options: [option1, option2],
    })

    const poll = await pollUseCase.getPollById(createdPoll.id)

    expect(poll.title).toBe('Favorite programming language?')
    expect(poll.description).toBe('Choose your favorite programming language')
  })

  it('Should be able to update an existing poll', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')

    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      userId: '1',
      options: [option1, option2],
    })

    await pollUseCase.updatePoll({
      id: createdPoll.id,
      title: 'Updated title',
      description: 'Updated description',
    })

    const updatedPoll = await pollUseCase.getPollById(createdPoll.id)

    expect(updatedPoll.title).toBe('Updated title')
    expect(updatedPoll.description).toBe('Updated description')
  })

  it('Should be able to deactivate a poll', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')

    const poll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      userId: '1',
      options: [option1, option2],
    })

    await pollUseCase.deactivatePoll(poll.id)

    expect(poll.is_active).toBe(false)
  })
})
