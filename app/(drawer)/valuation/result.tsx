import { useLocalSearchParams } from "expo-router";
import React from "react";
import SummaryStep from "@/components/pages/SummaryStep";

export default function Result() {
  const { id, type } = useLocalSearchParams();

  return (
    <SummaryStep reportId={Number(id)} type={type as "demo" | undefined} />
  );
}
