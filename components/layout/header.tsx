import { cn } from "cn";
import Link from "next/link";
import { GitHub } from "../icons/logos";
import CommandK from "@/components/commandK/index";
import UserBtn from "@/components/auth/userBtn";
import { Badge } from "lucide-react";

export default function header() {
  return (
    <nav
      className={cn(
        "flex w-full",
        "pb-3 pt-4 lg:px-4",
        "sticky top-0 z-50",
        "bg-white dark:bg-neutral-900",
      )}
    >
      <div className={cn("flex w-full items-center justify-between")}>
        <div className="flex items--center space-x-5">
          <div className="flex items-center space-x-1 pr-1 md:pr-4">
            <Link
              href={"/"}
              className="flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
            >
              <span className="self-center whitespace-nowrap text-lg font-medium tracking-tight dark:text-white">
                Slate
              </span>
              <Badge className="hidden cursor-pointer md:block">Alpha</Badge>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <a>
            <GitHub width={20} name="Github Repository" />
          </a>
          <CommandK />
          <UserBtn />
        </div>
      </div>
    </nav>
  );
}
