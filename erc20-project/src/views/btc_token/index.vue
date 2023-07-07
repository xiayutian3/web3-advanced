<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Token 信息</span>
      </div>
      <div>
        <p>totalSupply: {{ totalSupply }}</p>
        <p>name: {{ name }}</p>
        <p>symbol: {{ symbol }}</p>
        <p>decimals: {{ decimals }}</p>
        <p>owner: {{ owner }}</p>
        <p>balanceOf: {{ balanceOf }}</p>
      </div>

      <div>
        <el-input
          v-model="inputAddress"
          placeholder="Please input to address"
        />
        <el-input v-model="inputAmount" placeholder="Please input btc amount" />
        <el-button type="primary" :loading="loading" @click="transferTo"
          >确认转账</el-button
        >
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { outContract, toAmount, receiveAmount } from "@/utils/web3";
import abi from "@/abi/btc";
import { AddressDev } from "@/const";

// 连接合约
const contract = outContract(abi, AddressDev.tokenAddress);

const totalSupply = ref("");
const name = ref("");
const symbol = ref("");
const decimals = ref(0);
const owner = ref("");
const balanceOf = ref("");

//读取操作
async function init() {
  totalSupply.value = await contract.totalSupply();
  totalSupply.value = receiveAmount(totalSupply.value, 18);
  name.value = await contract.name();
  symbol.value = await contract.symbol();
  decimals.value = await contract.decimals();
  owner.value = await contract.owner();
  balanceOf.value = await contract.balanceOf(owner.value);
  balanceOf.value = receiveAmount(balanceOf.value, 18);
}

init();

// 写入操作
const loading = ref(false);
const inputAmount = ref("");
const inputAddress = ref("");
async function transferTo(): Promise<void> {
  loading.value = true;

  const addr = inputAddress.value;
  const amount = toAmount(inputAmount.value, 18);
  const tx = await contract.transfer(addr, amount);
  // 等待转账成功
  await tx.wait();

  loading.value = false;
}
</script>
<style lang="scss">
.wrapper {
}
</style>
