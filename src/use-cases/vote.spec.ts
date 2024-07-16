import { Poll } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPollsRepository } from '@/repositories/in-memory/in-memory-polls-repository'
import { InMemoryVotesRepository } from '@/repositories/in-memory/in-memory-votes-repository'
import { PollUseCase } from '@/use-cases/poll'
import { VoteUseCase } from '@/use-cases/vote'

let votesRepository: InMemoryVotesRepository
let pollsRepository: InMemoryPollsRepository
let voteUseCase: VoteUseCase
let pollUseCase: PollUseCase

describe('Vote use cases', () => {
  beforeEach(() => {
    votesRepository = new InMemoryVotesRepository()
    pollsRepository = new InMemoryPollsRepository()
    voteUseCase = new VoteUseCase(votesRepository, pollsRepository)
    pollUseCase = new PollUseCase(pollsRepository)
  })

  const createMockOption = (text: string) => ({
    id: 1, // Adjust ID if needed for your test scenario
    text,
    vote_count: 0,
    pollId: 1,
  })

  it('Should be able to vote', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')
    const createdPoll: Poll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [option1, option2],
      userId: '1',
    })

    const { vote } = await voteUseCase.execute({
      optionId: 1,
      userId: '1',
      pollId: createdPoll.id,
    })

    expect(vote.id).toEqual(expect.any(Number))
    expect(vote.option_id).toEqual(1)
    expect(vote.user_id).toEqual('1')
  })

  it('Should update vote if user votes on a different option', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')
    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [option1, option2],
      userId: '1',
    })

    await voteUseCase.execute({
      optionId: 1,
      userId: '1',
      pollId: createdPoll.id,
    })

    const { vote: updatedVote } = await voteUseCase.execute({
      optionId: 2,
      userId: '1',
      pollId: createdPoll.id,
    })

    expect(updatedVote.id).toEqual(expect.any(Number))
    expect(updatedVote.option_id).toEqual(2)
    expect(updatedVote.user_id).toEqual('1')

    const votes = await votesRepository.findByUserId('1')
    expect(votes).toBeDefined()
    expect(votes!.option_id).toEqual(2)
  })

  it('Should not allow voting on an inactive poll', async () => {
    const option1 = createMockOption('option 1')
    const option2 = createMockOption('option 2')
    const createdPoll = await pollUseCase.createPoll({
      title: 'Favorite programming language?',
      description: 'Choose your favorite programming language',
      options: [option1, option2],
      userId: '1',
    })

    await pollUseCase.deactivatePoll(createdPoll.id)

    await expect(
      voteUseCase.execute({
        userId: '2',
        optionId: 1,
        pollId: createdPoll.id,
      }),
    ).rejects.toThrow('Poll is not active. Cannot vote.')
  })
})
