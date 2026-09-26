import Link from "next/link";
import { GitHub } from "../icons/logos";
import CommandK from "@/components/commandK/index";
import UserBtn from "@/components/auth/userBtn";
import ModeToggle from "@/components/ChangeTheme";

export default function header() {
  return (
    <nav className="sticky top-0 z-50 flex h-[64px] w-full items-center bg-background/80 px-3 py-3 backdrop-blur-md dark:bg-background/80 lg:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <Link
            href={"/"}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <span className="text-xs font-semibold">S</span>
            </div>
            <span className="self-center whitespace-nowrap text-lg font-semibold tracking-tight dark:text-white">
              Slate
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={"https://github.com/K4sum3i/slate"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background transition-colors hover:bg-muted hover:text-foreground dark:border-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
            aria-label="GitHub Repository"
          >
            <GitHub width={20} name="Github Repository" />
          </Link>
          <CommandK />
          <ModeToggle />
          <UserBtn />
        </div>
      </div>
    </nav>
  );
}
