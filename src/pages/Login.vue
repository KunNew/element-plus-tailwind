<script setup lang="ts">
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import { reactive } from "vue";

interface LoginParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

const loginForm = reactive<LoginParams>({
  username: "",
  password: "",
  rememberMe: false,
});
</script>
<template>
  <div
    class="relative w-screen h-screen flex items-center justify-around overflow-hidden"
  >
    <div class="text-xl fixed top-[3%] right-[2%]">
      <ThemeSwitch />
    </div>
    <div
      class="w-[21rem] bg-[#ffffff90] dark:bg-[#22222290] rounded-xl px-6 py-6 shadow-xl"
    >
      <h1
        class="text-3xl text-center font-bold font-mono select-none mb-0 mt-4.5 brand-gradient"
      >
        Login
      </h1>
      <div class="mt-11 flex-col">
        <el-form ref="loginFormRef" :model="loginForm" :rules="[]">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              size="large"
              placeholder="Username"
            />
          </el-form-item>
          <el-form-item prop="password" :style="{ marginTop: '38px' }">
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              placeholder="Password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <div class="flex items-center justify-between w-[360px]">
              <el-checkbox v-model="loginForm.rememberMe">
                Remember Me
              </el-checkbox>
              <span class="text-sm text-primary cursor-pointer">
                Forget Password
              </span>
            </div>
          </el-form-item>
          <el-form-item :style="{ marginTop: '36px' }">
            <el-button
              auto-insert-space
              w="full"
              size="large"
              type="primary"
              class="w-full login-btn"
            >
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
