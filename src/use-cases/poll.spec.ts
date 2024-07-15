import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPollsRepository } from '@/repositories/in-memory/in-memory-polls-repository'

import { PollUseCase } from './poll'

describe('Poll management system', () => {
  let pollsRepository: InMemoryPollsRepository
  let pollUseCase: PollUseCase

  beforeEach(() => {
    pollsRepository = new InMemoryPollsRepository()
    pollUseCase = new PollUseCase(pollsRepository)
  })

  it('Should be able to create a new poll with two options', async () => {
    await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [{ text: 'JavaScript' }, { text: 'Python' }],
      userId: '1',
    })

    expect(pollsRepository.items).toHaveLength(1)
    expect(pollsRepository.items[0].title).toBe(
      'Favorite programming language?',
    )
    expect(pollsRepository.items[0].description).toBe(
      'Choose your favorite programming language',
    )
    expect(pollsRepository.items[0].options).toHaveLength(2)
    expect(pollsRepository.items[0].options[0].text).toBe('JavaScript')
    expect(pollsRepository.items[0].options[1].text).toBe('Python')
  })

  it('Should be able to list all polls', async () => {
    await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [{ text: 'JavaScript' }, { text: 'Python' }],
      userId: '1',
    })

    await pollUseCase.createPoll({
      title: 'Best frontend framework?',
      description: 'Choose the best frontend framework',
      options: [{ text: 'React' }, { text: 'Vue' }],
      userId: '1',
    })

    const polls = await pollUseCase.listPolls()

    expect(polls).toHaveLength(2)
    expect(polls[0].title).toBe('Favorite programming language?')
    expect(polls[1].title).toBe('Best frontend framework?')
  })

  it('Should be able to get details of a specific poll by ID', async () => {
    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [{ text: 'JavaScript' }, { text: 'Python' }],
      userId: '1',
    })

    const poll = await pollUseCase.getPollById(createdPoll.id)

    expect(poll.title).toBe('Favorite programming language?')
    expect(poll.description).toBe('Choose your favorite programming language')
    expect(poll.options).toHaveLength(2)
    expect(poll.options[0].text).toBe('JavaScript')
    expect(poll.options[1].text).toBe('Python')
  })

  it('Should be able to update an existing poll', async () => {
    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [{ text: 'JavaScript' }, { text: 'Python' }],
      userId: '1',
    })

    await pollUseCase.updatePoll({
      id: createdPoll.id,
      title: 'Updated title',
      description: 'Updated description',
      options: [{ text: 'TypeScript' }, { text: 'Ruby' }],
    })

    const updatedPoll = await pollUseCase.getPollById(createdPoll.id)

    expect(updatedPoll.title).toBe('Updated title')
    expect(updatedPoll.description).toBe('Updated description')
    expect(updatedPoll.options).toHaveLength(2)
    expect(updatedPoll.options[0].text).toBe('TypeScript')
    expect(updatedPoll.options[1].text).toBe('Ruby')
  })

  it('Should be able to deactivate a poll', async () => {
    const poll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [{ text: 'JavaScript' }, { text: 'Python' }],
      userId: '1',
    })

    await pollUseCase.deactivatePoll(poll.id)
    expect(pollsRepository.items[0].is_active).toBe(false)
  })
})
