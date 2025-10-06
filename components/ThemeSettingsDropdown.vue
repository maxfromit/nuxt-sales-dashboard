<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()
const appConfig = useAppConfig()

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]
const secondaries = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'violet']

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Theme',
      icon: 'i-lucide-palette',
      children: [
        {
          label: 'Primary',
          slot: 'chip',
          chip: appConfig.ui.colors.primary,
          content: {
            align: 'center',
            collisionPadding: 16,
          },
          children: colors.map((color) => ({
            label: color,
            chip: color,
            slot: 'chip',
            checked: appConfig.ui.colors.primary === color,
            type: 'checkbox',
            onSelect: (e) => {
              e.preventDefault()

              appConfig.ui.colors.primary = color
            },
          })),
        },
        {
          label: 'Secondary',
          slot: 'chip',
          chip:
            appConfig.ui.colors.neutral === 'neutral'
              ? 'old-neutral'
              : appConfig.ui.colors.neutral,
          content: {
            align: 'end',
            collisionPadding: 16,
          },
          children: secondaries.map((color) => ({
            label: color,
            chip: color === 'secondary' ? 'old-secondary' : color,
            slot: 'chip',
            type: 'checkbox',
            checked: appConfig.ui.colors.secondary === color,
            onSelect: (e) => {
              e.preventDefault()

              appConfig.ui.colors.secondary = color
            },
          })),
        },
      ],
    },
    {
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onSelect(e: Event) {
            e.preventDefault()

            colorMode.preference = 'light'
          },
        },
        {
          label: 'Dark',
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
