import { useAppSelector } from "@/redux/hooks/appHook";
import { useRouter } from "expo-router";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const { token } = useAppSelector((state) => state.root.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [token, router]);

  return <>{children}</>;
}
