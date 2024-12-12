<script setup lang="ts" name="BreadCrumb">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const matched = computed(() => {
  const validMatched: any[] = route.matched.filter((r) => r?.meta?.title);
  if (route?.meta?.activeMenu) {
    const parent = router.resolve(route.meta.activeMenu);
    const current = validMatched.pop();
    validMatched.push(parent, current);
  }
  return validMatched;
});
</script>

<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="r in matched"
        :key="r.path"
        :to="r.path !== route.path ? { to: r.path } : {}"
      >
        {{ r.meta.title }}
        <!-- {{ $t(r.meta.title!) }} -->
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
