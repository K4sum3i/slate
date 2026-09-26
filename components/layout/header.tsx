import Link from "next/link";
import { GitHub } from "../icons/logos";
import CommandK from "@/components/commandK/index";
import UserBtn from "@/components/auth/userBtn";
import ModeToggle from "@/components/ChangeTheme";

export default function header() {
  return (
    <nav className="sticky top-0 z-50 flex w-full min-h-[76px] bg-white px-3 py-4 shadow-sm dark:bg-neutral-900 lg:px-6">
      <div className="flex w-full items-center justify-around">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1 pr-1 md:pr-4">
            <Link
              href={"/"}
              className="flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
            >
              <span className="self-center whitespace-nowrap text-xl font-semibold tracking-tight dark:text-white">
                Slate
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={"https://github.com/K4sum3i/slate"}
            className="inline-flex items-center space-x-3 justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-700 focus-visible:ring-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 h-9 w-9"
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
