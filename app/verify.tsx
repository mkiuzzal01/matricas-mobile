import OTPForm from "@/components/form/auth/OTPFrom";
import { useLocalSearchParams } from "expo-router";

export default function verify() {
  const { email, otp } = useLocalSearchParams<{ email: string; otp: string }>();

  return <OTPForm email={email as string} otp={otp as string} />;
}
