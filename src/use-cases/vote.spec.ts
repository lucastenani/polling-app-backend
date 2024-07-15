import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryVotesRepository } from '@/repositories/in-memory/in-memory-votes-repository'
import { VoteUseCase } from '@/use-cases/vote'

let votesRepository: InMemoryVotesRepository
let sut: VoteUseCase

describe('Vote use cases', () => {
  beforeEach(() => {
    votesRepository = new InMemoryVotesRepository()
    sut = new VoteUseCase(votesRepository)
  })

  it('Should be able to vote', async () => {
    const { vote } = await sut.execute({
      optionId: 1,
      userId: '1',
    })

    expect(vote.id).toEqual(expect.any(Number))
    expect(vote.option_id).toEqual(1)
    expect(vote.user_id).toEqual('1')
  })

  it('Should not be able to vote twice in the same poll', async () => {
    await sut.execute({
      optionId: 2,
      userId: '2',
    })

    await expect(
      sut.execute({
        optionId: 2,
        userId: '2',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should allow multiple users to vote on different options', async () => {
    await sut.execute({
      optionId: 1,
      userId: '1',
    })

    await sut.execute({
      optionId: 2,
      userId: '3',
    })

    await sut.execute({
      optionId: 2,
      userId: '2',
    })

    const items = votesRepository.items

    expect(items).toHaveLength(3)
    expect(
      items.some((vote) => vote.user_id === '1' && vote.option_id === 1),
    ).toBe(true)
    expect(
      items.some((vote) => vote.user_id === '3' && vote.option_id === 2),
    ).toBe(true)
    expect(
      items.some((vote) => vote.user_id === '2' && vote.option_id === 2),
    ).toBe(true)
  })

  it('Should not allow a user to vote on the same option twice', async () => {
    await sut.execute({
      optionId: 1,
      userId: '1',
    })

    await expect(
      sut.execute({
        optionId: 1,
        userId: '1',
      }),
    ).rejects.toThrow('User has already voted on this option.')
  })

  it('Should update vote if user votes on a different option', async () => {
    await sut.execute({
      optionId: 1,
      userId: '1',
    })

    const { vote: updatedVote } = await sut.execute({
      optionId: 2,
      userId: '1',
    })

    expect(updatedVote.id).toEqual(expect.any(Number))
    expect(updatedVote.option_id).toEqual(2)
    expect(updatedVote.user_id).toEqual('1')

    const votes = await votesRepository.findByUserId('1')
    expect(votes).toBeDefined()
    expect(votes!.option_id).toEqual(2)
  })
})
