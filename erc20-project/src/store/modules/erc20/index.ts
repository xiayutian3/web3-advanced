import { defineStore } from "pinia";
import { TokenState } from "./types";
import { outContract, receiveAmount } from "@/utils/web3";
import abi from "@/abi/btc";
import { ethers } from "ethers";

export const useErc20Store = defineStore("etc20", {
  state: (): TokenState | any => ({
    name: "",
    symbol: "",
    decimals: 0,
    totalSupply: 0,
    owner: "",
  }),
  getters: {
    tokenInfo(state: TokenState): TokenState {
      return { ...state };
    },
  },
  actions: {
    async getTokenInfo(tokenAddress: string): Promise<TokenState | any> {
      const contract = outContract(abi, tokenAddress);
      let totalSupply = await contract.totalSupply();
      totalSupply = receiveAmount(totalSupply, 18);

      const name = await contract.name();
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();
      const owner = await contract.owner();

      return {
        name,
        symbol,
        decimals,
        totalSupply,
        owner,
      };
    },
    async balanceOf(
      owner: string,
      tokenAddress: string
    ): Promise<number | any> {
      const contract = outContract(abi, tokenAddress);
      let balance = await contract.balanceOf(owner);
      balance = receiveAmount(balance);
      return balance;
    },
    async approve(
      owner: string,
      spender: string,
      amount: any,
      tokenAddress: string
    ) {
      const allowanceAmount = await this.allowance(
        owner,
        spender,
        tokenAddress
      );
      const allowAmount = allowanceAmount as any;
      let approveAmount = amount;
      if (amount.lt(allowAmount)) {
        approveAmount = allowAmount.sub(amount);
      }

      const contract = outContract(abi, tokenAddress);
      const tx = await contract.approve(spender, approveAmount);
      await tx.wait();
    },
    async allowance(
      owner: string,
      spender: string,
      tokenAddress: string
    ): Promise<any> {
      const contract = outContract(abi, tokenAddress);
      const approveAmount = await contract.allowance(owner, spender);
      return approveAmount;
    },
  },
});
