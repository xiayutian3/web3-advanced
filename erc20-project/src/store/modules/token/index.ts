import { defineStore } from "pinia";
import { TokenState } from "./types";
import { outContract, receiveAmount } from "@/utils/web3";
import abi from "@/abi/btc";
import { AddressDev } from "@/const";

export const useTokenStore = defineStore("token", {
  state: (): TokenState => ({
    address: "",
    totalSupply: 0,
    name: "",
    symbol: "",
    decimals: 0,
  }),
  getters: {
    tokenInfo(state: TokenState): TokenState {
      return { ...state };
    },
  },
  actions: {
    resetInfo() {
      this.$reset();
    },
    async fetchToken() {
      const token = await this.getToken();
      this.$state = token;
    },
    async getToken(): Promise<TokenState> {
      const contractAddress = AddressDev.tokenAddress;
      const contract = outContract(abi, contractAddress);

      let totalSupply = await contract.totalSupply();
      totalSupply = receiveAmount(totalSupply, 18);

      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();

      return {
        address: contractAddress,
        name,
        symbol,
        decimals,
        totalSupply,
      } as TokenState;
    },
  },
});
