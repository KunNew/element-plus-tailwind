<
<script setup lang="ts" name="Menu">
import { MenuLayout } from "@/enums/menuEnum";
import { routeToMenu } from "@/hooks/useMenu";
import AdminRoutes from "@/router/modules/admin";
import { useSettingStore } from "@/stores/modules/setting";
import { computed } from "vue";
import { useRoute } from "vue-router";
import MenuItem from "./MenuItem.vue";

const props = withDefaults(
  defineProps<{
    mode?: MenuLayout;
  }>(),
  {
    mode: MenuLayout.VERTICAL,
  }
);

const route = useRoute();
const activeRoute = computed(
  () => route.matched.findLast((r) => !r?.meta?.hideMenu) || route
); // last route of no `hideMenu` in meta

const settingStore = useSettingStore();
// const menuStore = useMenuStore()

const menuData = computed(() => {
  return routeToMenu(AdminRoutes);
});
</script>

<template>
  <div :class="`menu--${props.mode}`">
    <el-menu
      router
   
      :mode="props.mode"
      :collapse="settingStore.menuCollapsed"
      :default-active="route?.meta?.activeMenu || activeRoute.path"
      class="!border-r-0"
    >
      <MenuItem v-for="menu in menuData" :key="menu.index" v-bind="menu" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.menu--horizontal {
  @apply flex-1;

  :deep(.el-menu) {
    @apply justify-center;

    &.el-menu--horizontal {
      @apply border-b-0;
    }
  }
}

// vertical
.menu--vertical :deep(.el-menu) {
  @apply p-1 border-r-0;
  .el-sub-menu__title,
  .el-menu-item {
    @apply h-12 text-regular select-none;
    .icon {
      @apply mr-[10px] text-base;
    }

    &:hover {
      @apply bg-transparent text-primary;
    }

    &.is-active {
      @apply bg-primary text-white rounded-lg;

      &::before {
        @apply bg-primary;
      }
    }
  }

  &.el-menu--collapse {
    @apply p-1 w-full;

    .el-sub-menu__title,
    .el-menu-item {
      padding: 0 !important;

      &:hover {
        @apply text-regular;
      }

      .el-menu-tooltip__trigger {
        @apply p-0;
      }

      .icon {
        @apply my-0 mx-auto text-base;
      }

      // &.is-active {
      //   @apply text-primary bg-transparent;
      // }
    }
  }
}
</style> 
