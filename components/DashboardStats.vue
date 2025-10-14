<script setup lang="ts">
import l from 'lodash'

const store = useSalesStore()
const { loading, stats } = storeToRefs(store)

// Determine corner classes for grid items on lg screens (grid-cols-4)
// it will be needed when stats cards became more than 4
const getCornerClasses = (index: number) => {
  let classes = ''
  const statsCount = l.size(stats.value)
  const itemsInLastRow = statsCount % 4
  const firstIndexLastRow = statsCount - itemsInLastRow
  const lastIndexLastRow = statsCount - 1

  // first row corner top left
  if ((index + 1) % 4 === 1 && index <= 3) {
    classes = 'lg:rounded-none lg:rounded-tl-lg'
  }
  // first row corner top right
  if ((index + 1) % 4 === 0 && index <= 3)
    classes = classes + ' ' + 'lg:rounded-none lg:rounded-tr-lg'

  // last row corner bottom left
  if (firstIndexLastRow === index)
    classes = classes + ' ' + 'lg:rounded-none lg:rounded-bl-lg'

  // 1. last row corner bottom right
  // 2. row before last corner bottom right if last row has less than 4 items
  if (
    lastIndexLastRow === index ||
    (itemsInLastRow < 4 && index === firstIndexLastRow - 1)
  )
    classes = classes + ' ' + 'lg:rounded-none lg:rounded-br-lg'

  return l.isEmpty(classes) ? 'lg:rounded-none' : classes
}
</script>

<template>
  <div
    class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px relative grid grid-cols-1 sm:grid-cols-2"
  >
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="rounded-lg items-start relative flex bg-elevated/50 ring ring-default"
      :class="getCornerClasses(index)"
    >
      <div
        class="gap-y-1.5 relative flex flex-col flex-1 gap-x-8 p-4 sm:p-6 justify-items-start"
      >
        <UAvatar
          :icon="stat.icon"
          size="xl"
          :ui="{ icon: 'size-4 text-primary' }"
          class="bg-primary/10 ring ring-inset ring-primary/25"
        />
        <div class="font-normal text-muted text-xs uppercase text-pretty">
          {{ $t(stat.labelKey) }}
        </div>
        <div class="text-2xl font-semibold text-highlighted">
          {{
            !loading
              ? `${stat.prefix ? `${stat.prefix} ` : ''}${stat.value ?? 0}`
              : '...'
          }}
        </div>
      </div>
    </div>
  </div>
</template>
