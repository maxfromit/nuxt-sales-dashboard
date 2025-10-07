<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import l from 'lodash'

const colorMode = useColorMode()
const appConfig = useAppConfig()

const colors = [
  { label: 'Синий', value: 'blue' },
  { label: 'Красный', value: 'red' },
  { label: 'Зелёный', value: 'green' },
  { label: 'Янтарный', value: 'amber' },
  { label: 'Бирюзовый', value: 'teal' },
]

const secondaries = [
  { label: 'Фиолетовый', value: 'violet' },
  { label: 'Нейтральный', value: 'neutral' },
  { label: 'Желтый', value: 'yellow' },
  { label: 'Пурпурный', value: 'purple' },
  { label: 'Лаймовый', value: 'lime' },
]

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Цвета проекта',
      icon: 'i-lucide-palette',
      children: [
        {
          label: 'Главный',
          slot: 'chip',
          chip: appConfig.ui.colors.primary,
          content: {
            align: 'center',
            collisionPadding: 16,
          },
          children: l.map(colors, (color) => ({
            label: color.label,
            chip: color.value,
            slot: 'chip',
            checked: appConfig.ui.colors.primary === color.value,
            type: 'checkbox',
            onSelect: (e) => {
              e.preventDefault()

              appConfig.ui.colors.primary = color.value
            },
          })),
        },
        {
          label: 'Вторичный',
          slot: 'chip',
          chip:
            appConfig.ui.colors.neutral === 'neutral'
              ? 'old-neutral'
              : appConfig.ui.colors.neutral,
          content: {
            align: 'end',
            collisionPadding: 16,
          },
          children: l.map(secondaries, (color) => ({
            label: color.label,
            chip: color.value,
            slot: 'chip',
            type: 'checkbox',
            checked: appConfig.ui.colors.secondary === color.value,
            onSelect: (e) => {
              e.preventDefault()

              appConfig.ui.colors.secondary = color.value
            },
          })),
        },
      ],
    },
    {
      label: 'Тема',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Светлая',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onSelect(e: Event) {
            e.preventDefault()

            colorMode.preference = 'light'
          },
        },
        {
          label: 'Темная',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onUpdateChecked(checked: boolean) {
            if (checked) {
              colorMode.preference = 'dark'
            }
          },
          onSelect(e: Event) {
            e.preventDefault()
          },
        },
      ],
    },
  ],
])
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{
      align: 'start',
      side: 'bottom',
      sideOffset: 8,
    }"
    :ui="{
      content: 'w-48',
    }"
  >
    <UButton icon="i-lucide-settings" color="neutral" variant="outline" />
  </UDropdownMenu>
</template>
