<script setup lang="ts" name="TotalCard">
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import Card from "./Card.vue";

const props = withDefaults(
  defineProps<{
    size?: "small" | "default";
    title: string;
    total: number;
    icon: string;
    cls?: string;
    hover?: string;
  }>(),
  {
    size: "default",
  }
);

defineEmits(["queryList"]);

const isSmallSize = computed(() => props.size === "small");
</script>

<template>
  <Card :padding="false">
    <div
      class="flex items-center justify-center"
      :class="isSmallSize ? 'p-3' : 'p-6'"
    >
      <div
        :class="
          isSmallSize
            ? 'w-14 h-14 rounded-full text-3xl mr-4'
            : 'w-16 h-16 rounded text-[2.6rem] mr-12'
        "
        class="bg-light flex items-center justify-center"
      >
        <Icon :icon="icon" :class="cls" />
      </div>
      <div class="flex flex-col">
        <span class="text-secondary text-base tracking-wide">{{ title }}</span>
        <span
          class="cursor-pointer mt-2 font-mono"
          :class="`${hover} ${isSmallSize ? 'text-2xl' : 'text-3xl'}`"
          @click="$emit('queryList')"
        >
          {{ total }}
        </span>
      </div>
    </div>
  </Card>
</template>
