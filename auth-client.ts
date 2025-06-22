import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { BASE_URL } from "./utils/constants";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  plugins: [
    expoClient({
      scheme: "helm",
      storagePrefix: "helm",
      storage: SecureStore,
    }),
  ],
});
