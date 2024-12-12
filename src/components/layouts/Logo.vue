<script setup lang="ts" name="LogoView">
//   import config from '@/config'
import { useSettingStore } from "@/stores/modules/setting";
import { useRouter } from "vue-router";

const settingStore = useSettingStore();

const router = useRouter();
</script>

<template>
  <div
    class="h-16 flex items-center justify-center cursor-pointer"
    @click="router.push('/home')"
  >
    <img src="@/assets/icons/logo.svg" width="28" />
    <h1
      class="text-xl text-center ml-2 font-mono whitespace-nowrap select-none"
      v-show="!settingStore.menuCollapsed"
    >
      Admin
    </h1>
  </div>
</template>

<style lang="scss" scoped></style>
