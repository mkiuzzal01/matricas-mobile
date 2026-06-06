import SearchStep from "@/components/pages/SearchStep";
import AuthProvider from "@/components/providers/AuthProvider";

export default function Search() {
  return (
    <AuthProvider>
      <SearchStep />
    </AuthProvider>
  );
}
