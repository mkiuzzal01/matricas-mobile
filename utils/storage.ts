import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async setItem(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage set error:", error);
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  },

  async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  },

  async clear() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Storage clear error:", error);
    }
  },
};
