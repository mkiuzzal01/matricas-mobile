import { View, Text } from "react-native";
import React from "react";
import AppLayout from "@/components/layouts/AppLayout";
import DeleteAccountForm from "@/components/form/auth/DeleteAccountForm";

export default function DeleteAccount() {
  return (
    <AppLayout>
      <DeleteAccountForm />
    </AppLayout>
  );
}
