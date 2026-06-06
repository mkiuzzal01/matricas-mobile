import React from "react";
import UpdateProfileForm from "@/components/form/auth/UpdateProfileForm";
import AppLayout from "@/components/layouts/AppLayout";

export default function edit() {
  return (
    <AppLayout>
      <UpdateProfileForm />
    </AppLayout>
  );
}
