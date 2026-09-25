import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../ui/dropdown-menu";
import UserMenu from "./userMenu";
import SignOut from "./signOut";
import { auth } from "@/auth";
import { buttonVariants } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function userBtn() {
  const session = await auth();

  const initials = session?.user.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (!session?.user) {
    return (
      <Link
        href={"/dashboard"}
        className={buttonVariants({
          variant: "outline",
          className: "group",
        })}
      >
        <span>Get Started</span>
        <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-[2px]" />
      </Link>
    );
  }
  if (session.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          name={session?.user.name ?? "User Menu"}
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          {session?.user.name && (
            <Avatar>
              <AvatarImage
                src={session?.user?.image ?? undefined}
                alt="profile Image"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"w-56"} align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className={"font-normal"}>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-meidum leading-none">
                  {session?.user.name}
                </p>
                <p className="text-xs leading-none text-neutral-400">
                  {session?.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <UserMenu />
            <SignOut />
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
