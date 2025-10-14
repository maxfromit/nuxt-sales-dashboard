<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import l from 'lodash'

const colorMode = useColorMode()
const { locales, setLocale } = useI18n()

const state = useLocalStorage('appearance', {
  primary: 'blue',
  secondary: 'violet',
})
const appConfig = useAppConfig()

// Update appConfig colors from  values saved in local storage
watch(
  () => state,
  (newState) => {
    appConfig.ui.colors.primary = newState.value.primary
    appConfig.ui.colors.secondary = newState.value.secondary
  },
  { immediate: true, deep: true }
)

const primaries = [
  { labelKey: 'colors.blue', value: 'blue' },
  { labelKey: 'colors.red', value: 'red' },
  { labelKey: 'colors.green', value: 'green' },
  { labelKey: 'colors.amber', value: 'amber' },
  { labelKey: 'colors.teal', value: 'teal' },
]

const secondaries = [
  { labelKey: 'colors.violet', value: 'violet' },
  { labelKey: 'colors.neutral', value: 'neutral' },
  { labelKey: 'colors.yellow', value: 'yellow' },
  { labelKey: 'colors.purple', value: 'purple' },
  { labelKey: 'colors.lime', value: 'lime' },
]

const { t } = useI18n()

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: t('settings_extra.colorsTitle'),
      icon: 'i-lucide-palette',
      children: [
        {
          label: t('settings.primary'),
          content: {
            align: 'center',
            collisionPadding: 16,
          },
          children: l.map(primaries, (color) => ({
            label: $t(color.labelKey),
            checked: state.value.primary === color.value,
            type: 'checkbox',
            onSelect: (e) => {
              e.preventDefault()
              state.value.primary = color.value
            },
          })),
        },
        {
          label: t('settings.secondary'),
          content: {
            align: 'end',
            collisionPadding: 16,
          },
          children: l.map(secondaries, (color) => ({
            label: $t(color.labelKey),
            type: 'checkbox',
            checked: state.value.secondary === color.value,
            onSelect: (e) => {
              e.preventDefault()
              state.value.secondary = color.value
            },
          })),
        },
      ],
    },

    {
      label: t('settings_extra.theme'),
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: t('settings.light'),
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onSelect(e: Event) {
            e.preventDefault()
            colorMode.preference = 'light'
          },
        },
        {
          label: t('settings.dark'),
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onSelect(e: Event) {
            e.preventDefault()
            colorMode.preference = 'dark'
          },
        },
      ],
    },

    {
      label: $t('settings.language'),
      icon: 'i-lucide-globe',
      children: l.map(locales.value, (locale) => ({
        label: locale?.name,
        checked: state.value.primary === locale.value,
        type: 'checkbox',
        onSelect: (e) => {
          e.preventDefault()
          setLocale(locale.code)
        },
      })),
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
