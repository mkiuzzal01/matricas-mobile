import React from "react";
import OTPForm from "@/components/form/auth/OTPFrom";
import { useLocalSearchParams } from "expo-router";

export default function verify() {
  const { email } = useLocalSearchParams<{ email: string }>();

  return <OTPForm email={email as string} />;
}
