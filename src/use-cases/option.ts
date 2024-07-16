import { Option } from '@prisma/client'

import { OptionsRepository } from '@/repositories/options-repository'

interface OptionUseCaseProps {
  text: string
  pollId: number
}

interface OptionUseCaseResponse {
  option: Option
}

export class OptionUseCase {
  constructor(private optionsRepository: OptionsRepository) {}

  async execute({
    pollId,
    text,
  }: OptionUseCaseProps): Promise<OptionUseCaseResponse> {
    const option = await this.optionsRepository.create({
      pollId,
      text,
      vote_count: 0,
    })

    return { option }
  }
}
