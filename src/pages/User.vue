<script setup lang="ts">
import DataTable from "@/components/data-table/DataTable.vue";
import UserForm from "./UserForm.vue";
import {
  type Component,
  h,
  nextTick,
  onMounted,
  reactive,
  ref,
  shallowRef,
} from "vue";
import client from "@/utils/client";
import { TableColumnCtx } from "element-plus";

const tableData = ref([]);

const isLoading = ref(false);

const currentModal = shallowRef<Component>();

const visible = ref(false);

let pagination = reactive({
  current: 1,
  size: 10,
  total: 0,
});

export interface ColumnAttrs<T> {
  row: T;
  column: TableColumnCtx<T>;
  rowIndex: number;
}

const columns = ref([
  { prop: "username", label: "Username" },
  { prop: "email", label: "Email" },
]);

const getTableData = () => {
  isLoading.value = true;
  client
    .get(`/users`, {
      params: {
        page: pagination.current,
        pageSize: pagination.size,
      },
    })
    .then((res) => {
      console.log(res.data);
      tableData.value = res.data.users;
      pagination.total = res.data.total;
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const handleOpenVisibleModal = () => {
  currentModal.value = UserForm;

  nextTick(() => {
    visible.value = true;
  });
};

const handlePageChange = (current: number) => {
  pagination.current = current;
  getTableData();
};

const handleSizeChange = (size: number) => {
  pagination.size = size;
  getTableData();
};
const cancel = () => {
  currentModal.value = undefined;

  nextTick(() => {
    visible.value = false;
  });
};

onMounted(() => {
  getTableData();
});
</script>

<template>
  <div>
    <div class="flex justify-end">
      <el-button @click="handleOpenVisibleModal">Add New</el-button>
    </div>
    <DataTable
      ref="tableModelRef"
      v-model:pagination="pagination"
      :columns="columns"
      :data="tableData"
      :loading="isLoading"
      row-key="_id"
      @page-change="handlePageChange"
      @size-change="handleSizeChange"
    />
    <component :is="currentModal" :visible="visible" @cancel="cancel" />
  </div>
</template>

<style scoped></style>
