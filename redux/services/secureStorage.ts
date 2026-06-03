import { storage } from "@/utils/storage";

export const secureStorage = {
  async setItem(key: string, value: any) {
    return storage.setItem(key, value);
  },

  async getItem<T>(key: string): Promise<T | null> {
    return storage.getItem<T>(key);
  },

  async removeItem(key: string) {
    return storage.removeItem(key);
  },

  async clear() {
    return storage.clear();
  },
};
