import ResetScreen from "@/components/form/auth/ResetForm";
import { useLocalSearchParams } from "expo-router";

export default function Reset() {
  const { email, otp } = useLocalSearchParams();
  return <ResetScreen email={email as string} otp={otp as string} />;
}
