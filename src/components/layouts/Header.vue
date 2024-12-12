<script setup lang="ts">
import { useSettingStore } from "@/stores/modules/setting";
import {
  isSupported,
  isFullScreen,
  toggleFullScreen,
} from "@/hooks/useFullScreen";
import { storeToRefs } from "pinia";
import ThemeSwitch from "../ThemeSwitch.vue";
import Breadcrumb from "@/layouts/Breadcrumb.vue";

const settingStore = useSettingStore();

const { hasBreadcrumb, menuCollapsed, isVerticalMenu } =
  storeToRefs(settingStore);
</script>
<template>
  <div
    class="h-16 px-6 flex items-center justify-between border-b border-root_light dark:border-root_dark"
  >
    <div class="flex items-center gap-6">
      <span
        v-if="isVerticalMenu"
        class="cursor-pointer leading-0"
        @click="settingStore.toggleCollapse()"
      >
        <div v-show="menuCollapsed" class="i-ep-expand" />
        <div v-show="!menuCollapsed" class="i-ep-fold" />
      </span>
      <Breadcrumb v-if="hasBreadcrumb && isVerticalMenu" />
    </div>
    <div class="flex items-center gap-5">
      <div v-if="isSupported" class="icon-view" @click="toggleFullScreen">
        <div v-show="!isFullScreen" class="i-ri-fullscreen-fill" />
        <div v-show="isFullScreen" class="i-ri-fullscreen-exit-fill" />
      </div>
      <ThemeSwitch />
    </div>
    
  </div>
</template>

<style lang="scss">
.icon-view {
  @apply w-8 h-8 rounded-full flex items-center justify-center bg-light cursor-pointer text-[15px] transition-all hover:bg-light_hover;
}
:deep(.el-dropdown [role="button"]) {
  outline: none;
}
</style>
