<script setup lang="ts">
import l from 'lodash'
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  today,
  getLocalTimeZone,
} from '@internationalized/date'

const store = useSalesStore()
const { range: selected } = storeToRefs(store)

const { localeProperties } = useI18n()

const language = computed(() => localeProperties?.value?.language || 'en-US')

const reset = () => {
  selected.value = {}
}

//computed to calculate today and compare it with the end of week/month to limit end dates in predefined range
const predefinedRanges = computed(() => [
  {
    label: $t('dateRangePicker.today'),
    firstDay: calendarToday.copy(),
    lastDay: calendarToday.copy(),
  },
  {
    label: $t('dateRangePicker.week'),
    firstDay: startOfWeek(calendarToday, language.value).copy(),
    lastDay:
      endOfWeek(calendarToday, language.value).compare(calendarToday) <= 0
        ? endOfWeek(calendarToday, language.value).copy()
        : calendarToday.copy(),
  },
  {
    label: $t('dateRangePicker.month'),
    firstDay: startOfMonth(calendarToday).copy(),
    lastDay:
      endOfMonth(calendarToday).compare(calendarToday) <= 0
        ? endOfMonth(calendarToday).copy()
        : calendarToday.copy(),
  },
])

type PredefinedRange = (typeof predefinedRanges.value)[number]

const selectRange = (range: PredefinedRange) => {
  if (isPredefinedRangeSelected(range)) return reset()
  selected.value = {
    start: range.firstDay.copy(),
    end: range.lastDay.copy(),
  }
}

const isPredefinedRangeSelected = (range: PredefinedRange) => {
  if (!selected.value?.start || !selected.value?.end) return false

  return (
    selected.value.start.compare(range.firstDay) === 0 &&
    selected.value.end.compare(range.lastDay) === 0
  )
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
        <template v-if="!selected?.start && !selected?.end">
          {{ $t('dateRangePicker.allPeriod') }}
        </template>
        <template v-else>
          <NuxtTime
            v-if="selected?.start?.copy()"
            :datetime="selected?.start?.copy().toString()"
            :locale="language"
            date-style="medium"
          />
          -
          <NuxtTime
            :datetime="
              selected?.end?.copy().toString() ?? calendarToday.toString()
            "
            :locale="language"
            date-style="medium"
          />
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
            :class="[
              isPredefinedRangeSelected(range)
                ? 'underline-offset-4 underline decoration-secondary '
                : 'hover:underline-offset-4 hover:underline hover:decoration-secondary',
            ]"
          />
        </div>

        <UCalendar
          v-model="selected"
          class="p-2"
          range
          :max-value="calendarToday.copy()"
          :ui="{
            cellTrigger: 'cursor-pointer data-disabled:cursor-not-allowed ',
          }"
        />
      </div>

      <USeparator />
      <div class="flex flex-1 justify-center">
        <UButton
          v-if="selected?.start || selected?.end"
          :label="$t('dateRangePicker.reset')"
          icon="i-lucide-eraser"
          variant="ghost"
          color="neutral"
          @click="reset()"
          class="w-full"
          :ui="{ base: 'flex flex-row  justify-center' }"
        />
      </div>
    </template>
  </UPopover>
</template>
