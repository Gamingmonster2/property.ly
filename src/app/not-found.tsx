import { redirect } from "next/navigation";

// Global 404 (outside any locale layout) — send visitors to the Arabic home
export default function NotFound() {
  redirect("/ar");
}
