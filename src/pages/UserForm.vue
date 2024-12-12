<script setup lang="ts">
import { FormInstance, FormRules } from "element-plus";
import { computed, reactive, type Ref, ref } from "vue";

withDefaults(
  defineProps<{
    visible: boolean;
    handleModalClose: () => void;
  }>(),
  {
    visible: false,
    handleModalClose: () => {},
  }
);
const emits = defineEmits(["cancel"]);

const formRef: Ref<FormInstance | undefined> = ref();

let form = reactive({
  username: "",
  email: "",
  password: "",
  status: "Active",
});

const rules = computed<FormRules>(() => {
  return {
    username: [{ required: true, message: "Username is required" }],
    email: [{ required: true, message: "Email is required" }],
    password: [
      {
        required: true,
        message: "Password is required",
        trigger: "blur",
      },
    ],
    status: [{ required: true, message: "Status is required" }],
  };
});

const statusOpts = ref([
  { label: "Active", value: "Active" },
  { label: "InActive", value: "InActive" },
]);

const handleModalClose = () => {
  emits("cancel");
};
const onSubmit = () => {
  if (!formRef.value) return;

  formRef.value.validate((isValid) => {
    if (isValid) {
    } else return;
  });
};
</script>
<template>
  <div>
    <el-dialog
      :model-value="visible"
      :before-close="handleModalClose"
      width="80%"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="140px"
        label-position="left"
        class="mt-4"
      >
        <el-row :gutter="20">
          <el-col :sm="24" :md="12">
            <el-form-item prop="username" label="Username">
              <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input type="email" v-model="form.email" />
            </el-form-item>
            <el-form-item prop="password" label="Password">
              <el-input type="password" />
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item prop="status" label="Status">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="item in statusOpts"
                  :key="item.value"
                  :label="item.value"
                  border
                  class="mr-3"
                />
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div
        class="flex justify-end gap-1 border-t mt-3 pt-2 border-root_light dark:border-root_dark"
      >
        <el-button @click="handleModalClose()">Cancel</el-button>
        <el-button type="primary" @click="onSubmit()"> Save </el-button>
      </div>
    </el-dialog>
  </div>
</template>
