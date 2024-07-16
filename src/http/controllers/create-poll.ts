// import { PollUseCase } from '@/use-cases/poll'
// import { Request, Response } from 'express'
// import asyncHandler from 'express-async-handler'
// import { z } from 'zod'

// const createPollBodySchema = z.object({
//   title: z.string().min(1),
//   description: z.string().optional(),
//   options: z.array(z.object({ text: z.string().min(1), value_count:z.number() })).min(2), // Minimum 2 options
// })

// export const createPoll = asyncHandler(
//   async (request: Request, response: Response) => {
//     const { title, description, options } = createPollBodySchema.parse(request.body)

//     const userId = /* Your logic to get the logged-in user ID */; // Replace with logic to get user ID

//     const createPollUseCase = new PollUseCase()

//     try {
//       createPollUseCase.createPoll({
//         title,
//         description,
//         options,
//         userId,
//       })

//       response.status(201).json(newPoll)  // Respond with created poll (status code 201 for created resources)
//     } catch (err) {
//       // Handle specific errors (optional)
//       response.status(400).json({ message: err.message }) // Handle generic errors with message
//     }
//   },
// )
