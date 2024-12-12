<script setup lang="ts">
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
import Sidebar from "@/components/layouts/Sidebar.vue";
import { useRefresh } from "@/hooks/useContent";
import { useSettingStore } from "@/stores/modules/setting";
import TabView from "@/components/layouts/TabView.vue";
import { storeToRefs } from "pinia";

const settingStore = useSettingStore();

const { hasTabView } = storeToRefs(settingStore);

const { componentKey } = useRefresh();
</script>
<template>
  <div class="admin-layout h-full">
    <el-container class="h-full bg-root">
      <Sidebar />
      <el-container>
        <el-header class="!h-auto !p-0 bg-page">
          <Header />
          <TabView v-if="hasTabView" />
        </el-header>
        <el-container direction="vertical" class="overflow-hidden">
          <div class="overflow-auto" scrollbar-hide>
            <el-main class="relative pb-0 p-3">
              <router-view v-slot="{ Component }">
                <transition
                  :name="settingStore.hasPageAnimate ? 'fade-slide' : ''"
                >
                  <component :is="Component" :key="componentKey" />
                </transition>
              </router-view>
            </el-main>
            <Footer/>
          </div>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss">
.bg-root {
  @apply bg-root_light dark:bg-root_dark;
}
.bg-page {
  @apply bg-page_light dark:bg-page_dark;
}
.page-base {
  @apply min-h-content overflow-x-hidden box-border;
}
.page-card {
  @apply page-base bg-page rounded px-6 py-5;
}
</style>
