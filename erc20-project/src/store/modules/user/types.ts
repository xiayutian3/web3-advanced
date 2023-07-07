export type RoleType = "" | "*" | "admin" | "user";
export interface UserState {
  account?: string;
  simple_account: string;
  bnb_balance: number;
  usdt_balance: number;
}
