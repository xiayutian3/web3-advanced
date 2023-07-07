<template>
  <div>
    <Header />
    <main>
      <fade>
        <router-view></router-view>
      </fade>
    </main>
  </div>
</template>
<script setup lang="ts">
import Header from "@/components/Header/index.vue";
import { useUserStore } from "@/store";
import { changeNetwork } from "@/utils/web3";

const userStore = useUserStore();

// 0x38: bsc, 0x61: bsc test
// sepolia 测试网 11155111
async function init() {
  await changeNetwork("0x11155111");
  userStore.login();
}

init();
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
