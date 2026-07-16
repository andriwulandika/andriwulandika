import { Button } from "@/components/ui/button";
import HeroSceneLazy from "@/components/hero/hero-scene-lazy";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <HeroSceneLazy />
      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
        Fase 0 — Foundation Spike
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
        Andri Wulandika — Digital Headquarters
      </h1>
      <p className="max-w-md text-muted-foreground">
        Halaman ini belum final. Dipakai untuk memverifikasi Next.js + Tailwind
        + shadcn/ui + Cloudflare berjalan sebelum Fase 1 dimulai.
      </p>
      <div className="flex gap-3">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </main>
  );
}
