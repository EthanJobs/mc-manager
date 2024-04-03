<template>
  <div class="wh-full flex">
    <article class="flex-col flex-1">
      <AppHeader class="h-60 flex-shrink-0" />
      <div class="flex-1 flex flex-col">
        <n-scrollbar class="flex-[1_0_0]">
          <slot />
          <n-back-top :right="100" />
        </n-scrollbar>
      </div>
    </article>
  </div>
</template>

<script setup>
import AppHeader from './header/index.vue'
</script>

<style lang="scss" scoped>
::v-deep(.n-scrollbar-rail) {
  display: none;
}
::v-deep(.n-back-top .n-base-icon) {
  color: #3149e7 !important;
}
</style>
