<script setup lang="ts">
import l from 'lodash'
import {
  type CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  today,
  startOfWeek,
  startOfMonth,
} from '@internationalized/date'
import type { Range, CalendarRange } from '~/types'

const props = defineProps<{
  minDate: CalendarDate | null
  maxDate: CalendarDate | null
}>()

const selected = defineModel<CalendarRange>({
  required: true,
})

const emit = defineEmits<{
  (e: 'apply-date-range'): void
}>()

const predefinedRanges = [
  { label: 'Сегодня', firstDay: calendarToday.copy() },
  { label: 'Неделя', firstDay: startOfWeek(calendarToday, ruLocale).copy() },
  { label: 'Месяц', firstDay: startOfMonth(calendarToday).copy() },
]
type PredefinedRange = (typeof predefinedRanges)[number]

const availableRanges = computed(() =>
  predefinedRanges.filter((range) => {
    if (!props.maxDate) return false
    return range.firstDay.compare(props.maxDate) <= 0
  })
)

const selectRange = (range: PredefinedRange) => {
  if (!props.maxDate) return
  const endDate =
    props.maxDate.compare(calendarToday) <= 0 ? props.maxDate : calendarToday
  selected.value = {
    start: range.firstDay.copy(),
    end: endDate.copy(),
  }
}

const resetToInitial = () => {
  selected.value = {
    start: props.minDate ? props.minDate.copy() : getTodayRange().start.copy(),
    end: props.maxDate ? props.maxDate.copy() : getTodayRange().end.copy(),
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
        <RuNuxtTime v-if="selected?.start" :datetime="selected?.start" />
        <template v-if="selected?.end">
          - <RuNuxtTime :datetime="selected?.end" />
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
        <div
          v-if="!l.isEmpty(availableRanges)"
          class="p-2 sm:p-1 flex sm:flex-row justify-center sm:gap-4 gap-2"
        >
          <UButton
            v-for="(range, index) in availableRanges"
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
          :min-value="minDate ?? undefined"
          :max-value="maxDate ?? undefined"
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
