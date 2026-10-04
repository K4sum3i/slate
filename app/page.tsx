import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@/components/icons/logos";
import { cn } from "@/lib/utils";

const stagger = (index: number, base = 0): CSSProperties => ({
  animationDelay: `${base + index * 60}ms`,
  animationTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)",
});

const EXAMPLE_LINKS = [
  { slug: "/launch", target: "notion.so/team/launch-plan", clicks: 1284 },
  { slug: "/docs", target: "github.com/K4sum3i/slate#readme", clicks: 612 },
  { slug: "/q3-report", target: "drive.google.com/file/d/1x9…", clicks: 87 },
] as const;

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-12 pb-24 md:pt-20 lg:pt-28">
      <section
        aria-labelledby="hero-title"
        className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20"
      >
        <div className="flex flex-col items-start gap-6">
          <h1
            id="hero-title"
            className={cn(
              "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:fill-mode-backwards",
              "text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance md:text-6xl lg:text-7xl",
            )}
            style={stagger(0)}
          >
            Shorten links,
            <span className="block text-muted-foreground">keep the data.</span>
          </h1>

          <p
            className={cn(
              "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:fill-mode-backwards",
              "max-w-[46ch] text-base leading-relaxed text-pretty text-muted-foreground md:text-lg",
            )}
            style={stagger(1)}
          >
            Turn any link into a short one, track every click, and keep it all
            on infrastructure you control.
          </p>

          <div
            className={cn(
              "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:fill-mode-backwards",
              "flex flex-wrap items-center gap-3 pt-2",
            )}
            style={stagger(2)}
          >
            <Link
              href="/auth"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
              )}
            >
              Sign in
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)]:group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="https://github.com/K4sum3i/slate"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "group transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
              )}
            >
              <GitHub aria-hidden="true" />
              View on GitHub
            </a>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="w-full lg:max-w-md lg:justify-self-end"
        >
          <div className="flex items-center justify-between border-b pb-3 text-xs text-muted-foreground">
            <span>Link</span>
            <span>Clicks</span>
          </div>
          <ul className="divide-y">
            {EXAMPLE_LINKS.map((link, i) => (
              <li
                key={link.slug}
                className={cn(
                  "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:fill-mode-backwards",
                  "grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-4",
                )}
                style={stagger(i, 280)}
              >
                <span className="font-mono text-sm font-medium">
                  {link.slug}
                </span>
                <span className="text-sm font-medium tabular-nums">
                  {link.clicks.toLocaleString("en-US")}
                </span>
                <span className="truncate text-sm text-muted-foreground">
                  {link.target}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
