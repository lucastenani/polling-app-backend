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

    console.log(votesRepository.items)

    expect(votesRepository.items).toHaveLength(3)
    expect(votesRepository.items[0].user_id).toBe('1')
    expect(votesRepository.items[0].option_id).toBe(1)
    expect(votesRepository.items[1].user_id).toBe('3')
    expect(votesRepository.items[1].option_id).toBe(2)
    expect(votesRepository.items[2].user_id).toBe('2')
    expect(votesRepository.items[2].option_id).toBe(2)
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
})
