import type { Sales } from '~/server/api/sales'
import { today, getLocalTimeZone } from '@internationalized/date'
import l from 'lodash'

export const calendarToday = today(getLocalTimeZone())

export const getTodayRange = () => {
  return {
    start: calendarToday.copy(),
    end: calendarToday.copy(),
  }
}

export const ruLocale = 'ru-RU'

export const sortSalesByDate = (sales: Sales) => l.sortBy(sales, 'date')
