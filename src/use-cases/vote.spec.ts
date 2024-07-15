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
  })

  it('Should not be able to user vote twice', async () => {
    await sut.execute({
      optionId: 1,
      userId: '1',
    })

    await expect(
      sut.execute({
        optionId: 2,
        userId: '1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should not be able to vote twice in same option', async () => {
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

  it('Should allow multiple users to vote on the same option', async () => {
    await sut.execute({
      optionId: 1,
      userId: '1',
    })

    const { vote: vote2 } = await sut.execute({
      optionId: 1,
      userId: '2',
    })

    expect(vote2.option_id).toEqual(1)
    expect(votesRepository.items.length).toEqual(2)
  })

  it('Should allow multiple users to vote on different options', async () => {
    await sut.execute({
      optionId: 1,
      userId: '1',
    })

    const { vote: vote2 } = await sut.execute({
      optionId: 2,
      userId: '2',
    })

    expect(vote2.option_id).toEqual(2)
    expect(votesRepository.items.length).toEqual(2)
  })
})
