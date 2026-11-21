import { Suspense } from "react";
import { RegisterForm } from "@/components/register-form";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="mx-auto min-h-[60vh] w-full max-w-md px-4 py-14" />}>
      <RegisterForm />
    </Suspense>
  );
}
