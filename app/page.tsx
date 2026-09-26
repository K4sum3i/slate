import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@/components/icons/logos";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pt-10 pb-20 md:gap-20 md:pt-14 lg:gap-24 lg:pt-16">
      <section className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div className="flex flex-col items-start gap-6 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-500">
          <h1 className="text-4xl leading-none font-medium tracking-tighter md:text-6xl">
            Shorten links, keep the data.
          </h1>
          <p className="max-w-[46ch] text-base leading-relaxed text-muted-foreground">
            Turn any link into a short one, track every click, and keep it all
            on infrastructure you control.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/auth"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-[2px]" />
            </Link>
            <a
              href="https://github.com/K4sum3i/slate"
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
              })}
            >
              <GitHub />
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
