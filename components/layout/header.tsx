import Link from "next/link";

import { GitHub } from "@/components/icons/logos";
import CommandK from "@/components/commandK/index";
import UserBtn from "@/components/auth/userBtn";
import ModeToggle from "@/components/ChangeTheme";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/* Mismo lenguaje de feedback que la home: transform específico, 150ms, ease-out fuerte. */
const press =
  "transition-[transform,opacity,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]";

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only rounded-md border bg-background px-3 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-4"
      >
        Skip to content
      </a>

      {/* Mismo contenedor que <main> para que el logo quede alineado con el contenido. */}
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6"
      >
        <Link
          href="/"
          aria-label="Slate home"
          className={cn(
            "-ml-1 flex items-center gap-2 rounded-md px-1 py-1 [@media(hover:hover)]:hover:opacity-80",
            press,
            focusRing,
          )}
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground"
          >
            S
          </span>
          <span className="text-lg font-semibold tracking-tight whitespace-nowrap">
            Slate
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {/* Enlace externo: <a> con aviso de nueva pestaña, no <Link>. */}
          <a
            href="https://github.com/K4sum3i/slate"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Slate on GitHub (opens in a new tab)"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon-lg" }),
              press,
            )}
          >
            <GitHub aria-hidden="true" className="size-5" />
          </a>
          <CommandK />
          <ModeToggle />

          {/* Separa las herramientas de la cuenta. */}
          <span aria-hidden="true" className="mx-1.5 h-5 w-px bg-border" />
          <UserBtn />
        </div>
      </nav>
    </header>
  );
}
