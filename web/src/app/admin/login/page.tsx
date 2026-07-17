import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="mx-auto max-w-sm px-6 py-24">
      <h1 className="text-2xl font-semibold tracking-tight">Admin Login</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Masuk untuk melihat daftar leads.
      </p>
      <div className="mt-8">
        <LoginForm />
      </div>
    </section>
  );
}
