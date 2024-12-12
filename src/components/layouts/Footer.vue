<script setup lang="ts" name="LayoutFooter">
  import { useSettingStore } from '@/stores/modules/setting'
import { storeToRefs } from 'pinia';

  const { hasFooter } = storeToRefs(useSettingStore())
</script>

<template>
  <el-footer v-show="hasFooter"  class="h-footer">
    <div class="h-full flex items-center justify-center text-placeholder text-sm">
      MIT Licensed <div  class="i-app-heart mx-1 !text-rose-500" /> Copyright &copy; present pheak
    </div>
  </el-footer>
</template>

<style lang="scss" scoped></style>
