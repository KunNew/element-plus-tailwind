<script setup lang="ts" name="ThemeSwitch">
import { useSettingStore } from "@/stores/modules/setting";
import { computed } from "vue";

withDefaults(
  defineProps<{
    type?: "base" | "switch";
  }>(),
  {
    type: "base",
  }
);
const settingStore = useSettingStore();

const darkTheme = computed(() => settingStore.isDark.value);
</script>

<template>
  <div v-if="type === 'switch'" text="2xl" flex="center" gap="4">
    <div class="i-fluent-emoji-flat-sun" />
    <el-switch
      :model-value="darkTheme"
      size="large"
      inline-prompt
      active-text="dark"
      inactive-text="light"
      @click="settingStore.toggleDark()"
    />
    <div class="i-fluent-emoji-flat-crescent-moon" />
  </div>
  <span
    v-else
    class="icon-view"
    text="xl! regular"
    cursor="pointer"
    @click="settingStore.toggleDark()"
  >
    <div v-if="darkTheme" class="i-app-sun" />
    <div v-else class="i-app-moon" />
  </span>
</template>

<style lang="scss" scoped>
:deep(.el-switch) {
  --el-switch-on-color: var(--el-switch-off-color);
}
</style>
