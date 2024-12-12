<script setup lang="ts" name="LayoutTabs">
import type { TabsPaneContext } from "element-plus";
import { refresh } from "@/hooks/useContent";
import { useAppStore } from "@/stores/modules/app";
import { useRoute, useRouter } from "vue-router";
import { computed, watch } from "vue";

const appStore = useAppStore();
const router = useRouter();
const route = useRoute();

watch(
  route,
  (v) => {
    const { path, meta } = v;
    appStore.addVisitedView({
      path,
      meta,
    });
  },
  { immediate: true }
);

const isSingleVisitedView = computed(() => appStore.visitedViews.length === 1);

function handleClickTab(tab: TabsPaneContext) {
  router.push(tab.paneName as string);
}

function handleRemoveTab(path: string) {
  appStore.deleteVisitedView({ path });
  if (path === route.path) {
    const lastTag = appStore.visitedViews[appStore.visitedViews.length - 1];
    router.push(lastTag.path);
  }
}

function handleRemoveOtherTab() {
  appStore.visitedViews = appStore.visitedViews.filter(
    (view) => view.path === route.path
  );
}
</script>

<template>
  <div class="flex justify-between overflow-hidden tab">

    <el-tabs
      type="card"
      :closable="appStore.visitedViews.length > 1"
      style="width: calc(100% - 60px)"
      :model-value="route.path"
      @tab-click="handleClickTab"
      @tab-remove="handleRemoveTab"
    >
      <el-tab-pane
        v-for="v in appStore.visitedViews"
        :key="v.path"
        :name="v.path"
        :label="v?.meta?.title!"
      />
    </el-tabs>

    <el-dropdown
      trigger="click"
    >
    <!-- w-50px flex-center border-l="solid root_light dark:root_dark" cursor-pointer -->
      <div class="w-[50px] flex items-center justify-center">
        <div class=" i-ep-more-filled" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="refresh = !refresh">
            <div class="i-ep-refresh mr-1" />
            <!-- {{ $t('tab.refresh') }} -->
              refresh
          </el-dropdown-item>
          <el-dropdown-item :disabled="isSingleVisitedView" @click="handleRemoveTab(route.path)">
            <div class="i-ep-close mr-1"  />
            <!-- {{ $t('tab.close') }} -->
              close
          </el-dropdown-item>
          <el-dropdown-item :disabled="isSingleVisitedView" @click="handleRemoveOtherTab">
            <div class="i-ep-delete mr-1"/>
            <!-- {{ $t('tab.closeOther') }} -->
              close other
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
  flex: 1;
  flex-shrink: 0;
  &.el-tabs--card > .el-tabs__header {
    @apply border-b-0 m-0.5;
    .el-tabs__nav {
      @apply border-none  rounded-none border border-r border-root_light dark:border-root_dark;
    }

    .el-tabs__item {
      font-weight: 400;
      @apply border-l border border-root_light dark:border-root_dark;

      &:not(.is-active) {
        color: var(--el-text-color-regular);
      }

      &.is-active {
        background-color: var(--el-color-primary-light-9);

        .is-icon-close:hover {
          background-color: var(--el-color-primary);
        }
      }
    }
  }
}
</style>
