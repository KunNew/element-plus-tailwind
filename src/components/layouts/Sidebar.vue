<script setup lang="ts" name="LayoutSider">
//   import Menu from './components/menu/index.vue'
//   import LogoView from './components/LogoView.vue'
//   import { useSettingStore } from '@/store/modules/setting'
import { useSettingStore } from "@/stores/modules/setting";
import { storeToRefs } from "pinia";
import Logo from "./Logo.vue";
import Menu from "./Menu.vue";
const { isVerticalMenu, menuCollapsed } = storeToRefs(useSettingStore());
</script>

<template>
  <el-aside
    v-if="isVerticalMenu"
    :width="menuCollapsed ? '64px' : '220px'"
    class="h-screen transition-width duration-500 ease-in-out overflow-hidden border-r border-solid border-root_light dark:border-root_dark bg-page"
  >
    <Logo />

    <el-scrollbar style="height: calc(100vh - 64px)">
      <Menu />
    </el-scrollbar>
  </el-aside>
</template>

<style lang="scss"></style>
