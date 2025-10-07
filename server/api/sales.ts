import { type CalendarDate, parseDate } from '@internationalized/date'

export default defineEventHandler(async (event) => {
  //   let pending = false
  const query = getQuery(event)

  if (query && (query.startDate || query.endDate)) {
    try {
      if (query?.startDate) {
        parseDate(query.startDate as string)
      }
      if (query?.endDate) {
        parseDate(query.endDate as string)
      }
    } catch (error) {
      console.error(
        'Error parsing date, returning initial data:',
        (error as Error)?.message
      )
      const result = await fetchSales()
      return result
    }
  }

  const result = await fetchSales(query)

  return result
})
