import { Suspense } from "react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto min-h-[60vh] w-full max-w-md px-4 py-14" />}>
      <LoginForm />
    </Suspense>
  );
}
