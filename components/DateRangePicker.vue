<script setup lang="ts">
import l, { last } from 'lodash'
import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
} from '@internationalized/date'
import type { Range, CalendarRange } from '~/types'

const selected = defineModel<CalendarRange>({
  required: true,
})

const emit = defineEmits<{
  (e: 'apply-date-range'): void
}>()

const predefinedRanges = [
  {
    label: 'Сегодня',
    firstDay: calendarToday.copy(),
    lastDay: calendarToday.copy(),
  },
  {
    label: 'Неделя',
    firstDay: startOfWeek(calendarToday, ruLocale).copy(),
    lastDay: endOfWeek(calendarToday, ruLocale).copy(),
  },
  {
    label: 'Месяц',
    firstDay: startOfMonth(calendarToday).copy(),
    lastDay: endOfMonth(calendarToday).copy(),
  },
]

type PredefinedRange = (typeof predefinedRanges)[number]

const selectRange = (range: PredefinedRange) => {
  selected.value = {
    start: range.firstDay.copy(),
    end: range.lastDay.copy(),
  }
}

const resetToInitial = () => {
  selected.value = {
    start: null,
    end: null,
  }
}

const onRangeUpdate = (newValue: CalendarRange | null) => {
  if (!newValue?.start && !newValue?.end) {
    resetToInitial()
  }
  emit('apply-date-range')
}
</script>

<template>
  <UPopover>
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-calendar"
      class="data-[state=open]:bg-elevated group"
    >
      <span class="truncate">
        <template v-if="!selected?.start && !selected?.end"
          >Даты не выбраны</template
        >
        <RuNuxtTime
          v-if="selected?.start?.copy()"
          :datetime="selected?.start?.copy().toString()"
        />
        <template v-if="selected?.end">
          - <RuNuxtTime :datetime="selected?.end.toString()" />
        </template>
      </span>

      <template #trailing>
        <UIcon
          name="i-lucide-chevron-down"
          class="shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200"
        />
      </template>
    </UButton>

    <template #content>
      <div class="flex flex-col items-stretch divide-y divide-default">
        <div class="p-2 sm:p-1 flex sm:flex-row justify-center sm:gap-4 gap-2">
          <UButton
            v-for="(range, index) in predefinedRanges"
            :key="index"
            :label="range.label"
            color="neutral"
            variant="ghost"
            class="rounded-none px-4"
            truncate
            @click="selectRange(range)"
          />
        </div>

        <UCalendar
          v-model="selected"
          class="p-2"
          range
          :ui="{
            cellTrigger: 'cursor-pointer data-disabled:cursor-not-allowed ',
          }"
          @update:model-value="
            (val) => {
              if (!val?.start && !val?.end) {
                resetToInitial()
              }
              emit('apply-date-range')
            }
          "
        />
      </div>
    </template>
  </UPopover>
</template>
