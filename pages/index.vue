<template>
  <div class="flex flex-1 flex-col">
    <header class="p-4 sm:px-6 flex flex-row items-center justify-between">
      <div class="flex flex-row items-center gap-2">
        <UIcon name="i-lucide-chart-no-axes-column" class="text-secondary" />
        <div class="text-xl font-semibold">{{ $t('app.title') }}</div>
      </div>
      <UserSettingsDropdown />
    </header>

    <USeparator />

    <DashboardPanel />
  </div>
</template>
``
