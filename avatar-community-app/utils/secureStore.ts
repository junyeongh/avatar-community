import * as SecureStore from "expo-secure-store";

export async function getSecureStore(key: string) {
  const storedData = (await SecureStore.getItemAsync(key)) ?? null;

  return storedData;
}

export async function setSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}
