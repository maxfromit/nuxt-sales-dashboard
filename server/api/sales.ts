import { z } from 'zod'

const querySchema = z.object({
  startDate: z.iso.date().optional(),
  endDate: z.iso.date().optional(),
})

export type Query = z.infer<typeof querySchema>

export default defineEventHandler(async (event) => {
  const queryResult = await getValidatedQuery(event, (query) =>
    querySchema.safeParse(query)
  )

  if (!queryResult.success) {
    console.error(
      'Error parsing date, returning initial data:',
      queryResult.error?.issues
    )
    const result = await fetchSales()
    return result
  }

  const result = await fetchSales(queryResult.data)

  return result
})
