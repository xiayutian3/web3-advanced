import { createPinia } from "pinia";
import { useAppStore } from "./modules/app";
import { useUserStore } from "./modules/user";
import { useTokenStore } from "./modules/token";
import { useErc20Store } from "./modules/erc20";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { useAppStore, useUserStore, useTokenStore, useErc20Store };
export default pinia;
