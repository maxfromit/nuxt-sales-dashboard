<template>
  <UCard
    :ui="{
      body: 'flex-1 flex flex-col',
      root: 'flex-1',
    }"
    class="flex-1 flex flex-col"
  >
    <template #header>
      <div class="flex flex-row items-center justify-between">
        <div class="text-xl font-semibold">Dashboard</div>
        <AppearenceDropdown />
      </div>
    </template>

    <div>Body</div>

    <!-- <template #footer>
      <Placeholder class="h-8" />
    </template> -->
  </UCard>
</template>
