<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { defineAsyncComponent, ref, shallowRef } from "vue";

const comTitle = ref("User");
const activeCom = shallowRef(defineAsyncComponent(() => import("./User.vue")));

const menuData = ref([
  // {
  //   activeCom: "Profile",
  //   comTitle: "Profile",
  //   comIcon: "ri:profile-fill", 
  //   components: shallowRef(defineAsyncComponent(() => import("./User.vue"))),
  // },
  // {
  //   activeCom: "Role",
  //   comTitle: "Role",
  //   comIcon: "ri:admin-line",
  //   components: shallowRef(defineAsyncComponent(() => import("./User.vue"))),
  // },
  {
    activeCom: "User",
    comTitle: "User",
    comIcon: "ri:user-2-fill",
    components: shallowRef(defineAsyncComponent(() => import("./User.vue"))),
  },
  // {
  //   activeCom: "Branch",
  //   comTitle: "Branch",
  //   comIcon: "ri:git-branch-fill",
  //   components: shallowRef(defineAsyncComponent(() => import("./User.vue"))),
  // },
]);

const handleSelect = (menu: any) => {
  comTitle.value = menu.comTitle;
  activeCom.value = menu.components;
};
</script>
<template>
  <div>
    <el-row :gutter="16">
      <el-col :xs="11" :sm="8" :md="5" :lg="5" :xl="5">
        <div class="page-card" style="height: calc(100vh - 180px)">
          <el-menu :default-active="comTitle">
            <el-menu-item
              v-for="menu in menuData"
              :key="menu.comTitle"
              v-bind="menu"
              :index="menu.comTitle"
              @click="handleSelect(menu)"
            >
              <Icon class="icon" :icon="menu.comIcon" />
              <span>
                {{ menu.comTitle }}
              </span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :xs="13" :sm="16" :md="19" :lg="19" :xl="19">
        <div class="page-card" style="height: calc(100vh - 220px)">
          <component :is="activeCom" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-menu) {
  @apply border-r-0;
  .el-menu-item {
    @apply h-12 text-regular select-none rounded-md my-2;
    .icon {
      @apply mr-[10px] text-base;
    }
    &:hover {
      @apply bg-light_hover text-primary;
    }
    &.is-active {
      @apply bg-primary text-white rounded-md;

      &::before {
        @apply bg-primary;
      }
    }
  }
}
</style>
