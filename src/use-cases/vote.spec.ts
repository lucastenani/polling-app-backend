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
})
