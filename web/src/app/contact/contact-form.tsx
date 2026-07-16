"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ContactFormState } from "./actions";

const initialState: ContactFormState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-border/60 bg-muted/30 p-8 text-center">
        <p className="font-medium">Terima kasih!</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Pesan Anda sudah kami terima. Kami akan menghubungi Anda dalam
          1–2 hari kerja.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="company">Organisasi (opsional)</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Ceritakan kebutuhan Anda</Label>
        <Textarea id="message" name="message" required rows={5} />
      </div>

      {state.status === "error" && (
        <p role="alert" className="text-sm text-destructive">
          {state.message}
        </p>
      )}

      <Button type="submit" size="lg" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? "Mengirim..." : "Kirim & Book Consultation"}
      </Button>
    </form>
  );
}
