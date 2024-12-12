import { watch, ref } from "vue";
import { useRoute } from "vue-router";

export const refresh = ref(false);
export const componentKey = ref();

export const useRefresh = () => {
  const route = useRoute();

  watch(refresh, (v) => {
    if (v) {
      componentKey.value = `${route.path}/refresh`;
    } else {
      componentKey.value = route.path;
    }
  });
  return { componentKey };
};
