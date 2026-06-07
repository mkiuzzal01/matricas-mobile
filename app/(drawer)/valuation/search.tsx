import SearchStep from "@/components/pages/SearchStep";
import AuthProvider from "@/components/providers/AuthProvider";
import { useLocalSearchParams } from "expo-router";

export default function Search() {
  const { type } = useLocalSearchParams();

  return (
    <AuthProvider>
      <SearchStep type={type as "demo" | undefined} />
    </AuthProvider>
  );
}
