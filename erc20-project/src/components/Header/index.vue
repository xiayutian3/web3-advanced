<script setup lang="ts">
import SvgIcon from "../SvgIcon/index.vue";
import { ref, reactive, computed } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import { useAppStore, useUserStore } from "@/store";
import { Sunny, Moon } from "@element-plus/icons-vue";
import { getMetamskConnect } from "@/utils/web3";

//let account = ref('连接钱包');
const state = useUserStore();
//account.value = state.account;

// const title = ref('I want to study typescript')
// 检测浏览器系统主题
// const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
const appStore = useAppStore();
// const useStore = useUserStore()
const theme = computed(() => {
  return appStore.theme;
});
const isDark = useDark({
  selector: "body",
  attribute: "arco-theme",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "arco-theme",
  onChanged(dark: boolean) {
    appStore.toggleTheme(dark);
  },
});
const toggleTheme = useToggle(isDark);
</script>

<template>
  <header
    class="antialiased bg-white Male text-slate-500 dark:text-slate-400 dark:bg-slate-900"
  >
    <div
      class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent"
    >
      <div class="mx-auto max-w-8xl">
        <div
          class="px-4 py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10"
        >
          <div
            class="wrap relative flex items-center text-2xl sm:text-2xl font-blimone"
          >
            <div
              class="mr-3 flex-none w-[2.0625rem] md:w-auto leading-6 dark:text-slate-200"
            >
              web3-dapp
            </div>
            <div class="wrap relative items-center hidden ml-auto lg:flex">
              <nav
                class="mr100 text-sm font-semibold leading-6 text-slate-700 dark:text-slate-200"
              >
                <ul class="wrap flex space-x-8">
                  <li class="mr100">
                    <router-link
                      to="/btc_token"
                      class="white-color hover:text-sky-500"
                      >BtcToken</router-link
                    >
                  </li>
                  <li>
                    <span class="white-color hover:text-sky-500">{{
                      state.simple_account
                    }}</span>
                  </li>
                </ul>
              </nav>
              <div
                class="flex items-center pl-6 ml-6 border-l border-slate-200 dark:border-slate-800"
              >
                <el-tooltip
                  :content="theme === 'light' ? '设置暗黑主题' : '设置明亮主题'"
                >
                  <el-button
                    class="nav-btn"
                    :shape="'circle'"
                    type="info"
                    plain
                    :icon="theme === 'dark' ? Sunny : Moon"
                    circle
                    size="small"
                    @click="toggleTheme()"
                  />
                </el-tooltip>
                <a
                  href="https://github.com/MaleWeb/web3-dapp"
                  target="_bank"
                  class="block ml-6 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                >
                  <SvgIcon name="svg-github" size="small" color="#999999" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mr100 {
  margin-right: 100px;
}
.prose {
  color: #334155;
  font-size: 0.875em;
  font-variant-ligatures: none;

  code {
    color: #0f172a;
    font-family: Fira Code VF, ui-monospace, SFMono-Regular, Menlo, Monaco,
      Consolas, Liberation Mono, Courier New, monospace;

    &::before {
      content: "`";
    }

    &::after {
      content: "`";
    }
  }

  &.dark\:prose-dark {
    color: #94a3b8;

    code {
      color: #e2e8f0;
    }
  }
}

.white-color {
  color: #cbd0d7;
}
</style>
