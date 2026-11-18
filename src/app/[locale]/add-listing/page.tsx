import { Suspense } from "react";
import { AddListingForm } from "@/components/add-listing-form";

export default function AddListingPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto min-h-[60vh] w-full max-w-3xl px-4 py-12" />
      }
    >
      <AddListingForm />
    </Suspense>
  );
}
