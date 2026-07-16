import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { serviceCategories } from "@/lib/services";

const primaryLinks = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Andri Wulandika
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[640px] grid-cols-2 gap-6 p-6">
                  {serviceCategories.map((category) => (
                    <div key={category.slug}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        {category.name}
                      </p>
                      <ul className="space-y-1">
                        {category.services.map((service) => (
                          <li key={service.slug}>
                            <NavigationMenuLink asChild>
                              <Link href={`/services#${service.slug}`}>
                                <span className="font-medium">{service.name}</span>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {primaryLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={link.href}
                    className="inline-flex h-9 items-center rounded-md px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button asChild size="sm">
          <Link href="/contact">Book Consultation</Link>
        </Button>
      </div>
    </header>
  );
}
