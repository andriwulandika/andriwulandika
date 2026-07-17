"use client";

import { Button } from "@/components/ui/button";
import { logoutAdmin } from "./actions";

export default function LogoutButton() {
  return (
    <form action={logoutAdmin}>
      <Button type="submit" variant="outline" size="sm">
        Keluar
      </Button>
    </form>
  );
}
