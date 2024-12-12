<script setup lang="ts">
import Card from "@/components/Card.vue";
import TotalCard from "@/components/TotalCard.vue";

interface DashboardCard {
  title: string;
  total: number;
  icon: string;
  cls?: string;
  hover?: string;
}

const cards: DashboardCard[] = [
  {
    title: "Stars",
    total: 99007,
    icon: "ic:round-star",
    cls: "text-5xl text-amber-500",
    hover: "hover:text-amber-500",
  },
  {
    title: "Forks",
    total: 1024,
    icon: "ph:git-fork-bold",
    cls: "text-rose-500",
    hover: "hover:text-rose-500",
  },
  {
    title: "Issues",
    total: 0,
    icon: "octicon:issue-opened-16",
    cls: "text-4xl text-green-500",
    hover: "hover:text-green-500",
  },
  {
    title: "Pull Request",
    total: 996,
    icon: "ph:git-pull-request-bold",
    cls: "text-indigo-500",
    hover: "hover:text-indigo-500",
  },
];
</script>

<template>
  <div class="page-base">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="card in cards" :key="card.title">
        <TotalCard v-bind="card" />
      </div>
    </div>
  </div>
</template>
