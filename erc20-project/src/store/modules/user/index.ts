import { defineStore } from "pinia";
import { UserState } from "./types";
import { getMetamskConnect } from "@/utils/web3";
import { outContract, receiveAmount } from "@/utils/web3";
import abi from "@/abi/btc";
import { AddressDev } from "@/const";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    account: "",
    simple_account: "",
    bnb_balance: 0,
    usdt_balance: 0,
  }),
  getters: {
    userProfile(state: UserState): UserState {
      return { ...state };
    },
  },
  actions: {
    // 设置用户的信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },
    // 重置用户信息
    resetInfo() {
      this.bnb_balance = 0;
      this.usdt_balance = 0;
    },
    async login() {
      const account = await getMetamskConnect();
      this.refreshAccountInfo(account);
    },
    async refreshAccountInfo(account?: string) {
      try {
        this.account = (account ? account : this.account) as string;
        console.log("account: ", this.account);
        this.simple_account =
          this.account.substr(0, 4) + "…" + this.account.substr(-4, 4);

        const contract = outContract(abi, AddressDev.usdtAddress);
        let usdt_balance = await contract.balanceOf(this.account);
        usdt_balance = receiveAmount(usdt_balance, 18);
        this.usdt_balance = usdt_balance;
      } catch (e: any) {
        console.log("refreshAccountInfo: ", e);
      }
    },
  },
});
