import { redirect } from "next/navigation";
import { getLinksAndTagsByUser } from "@/lib/queries";
import Searchlinks from "./_components/searchLinks";
import LinksLimit from "./_components/linksLimit";
import SearchTag from "./_components/searchTag";
import CreateLink from "./_components/createLink";
import { LinkIcon, PackageOpenIcon, TriangleAlertIcon } from "lucide-react";
import CardLink from "./_components/cardLink";
import UserBlocked from "@/components/settings/userBlocked";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { TooltipProvider } from "@/components/ui/tooltip";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const truncate = (value: string, max = 24) =>
  value.length > max ? `${value.slice(0, max)}...` : value;

export default async function Dashboardpage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    tag?: string;
  }>;
}) {
  const params = await searchParams;
  const data = await getLinksAndTagsByUser();

  // getLinksAndTagsByUser returns null when there is no session.
  if (!data) redirect("/auth");

  const searchLink = params.search;
  const searchTag = params.tag;

  if (!data.links) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
        <Empty className="rounded-lg border border-dashed border-border py-14">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <TriangleAlertIcon />
            </EmptyMedia>
            <EmptyTitle>We couldn&apos;t load your links</EmptyTitle>
            <EmptyDescription>
              Something went wrong on our side. Try again in a moment.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Try again
            </Link>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  const query = searchLink?.toLowerCase();
  const hasFilters = Boolean(searchLink || searchTag);

  const visibleLinks = data.links
    .filter((link) => {
      if (!hasFilters) return true;

      const matchSlug = !query || link.slug.toLowerCase().includes(query);
      const matchTag =
        !searchTag || link.tags.some((tag) => tag.tagId === searchTag);

      return matchSlug && matchTag;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const createLabel = searchLink
    ? `Create /${truncate(searchLink)}`
    : "New link";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20 pt-6 sm:px-6 sm:pt-8">
      {data.userData?.blocked && <UserBlocked className="mb-3" />}
      <TooltipProvider delay={500}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h1 className="text-lg font-semibold tracking-tight">Links</h1>
          <LinksLimit userLinks={data.links.length} maxLinks={data.limit} />
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Searchlinks className="min-w-[200px] flex-1" />
          <SearchTag tags={data.tags} tagSelected={searchTag!} />
          {visibleLinks.length > 0 && (
            <CreateLink tags={data.tags} slug={searchLink}>
              {createLabel}
            </CreateLink>
          )}
        </div>

        {hasFilters && visibleLinks.length === 0 && (
          <p className="mb-2 text-xs text-muted-foreground tabular-nums">
            {visibleLinks.length} of {data.links.length} links
          </p>
        )}

        {visibleLinks.length > 0 && (
          <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {visibleLinks.map((link) => (
              <CardLink
                key={link.id}
                linkInfo={link}
                linkTags={link.tags}
                tagsInfo={data.tags}
              />
            ))}
          </ul>
        )}

        {visibleLinks.length === 0 && (
          <Empty className="rounded-lg border border-dashed border-border py-14">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                {hasFilters ? <PackageOpenIcon /> : <LinkIcon />}
              </EmptyMedia>
              {searchLink ? (
                <>
                  <EmptyTitle>
                    No links match{" "}
                    <span className="font-mono">{truncate(searchLink)}</span>
                  </EmptyTitle>
                  <EmptyDescription>
                    Check the spelling or create it with this slug.
                  </EmptyDescription>
                </>
              ) : searchTag ? (
                <>
                  <EmptyTitle>No links with this tag</EmptyTitle>
                  <EmptyDescription>
                    None of your links use it yet.
                  </EmptyDescription>
                </>
              ) : (
                <>
                  <EmptyTitle>No links yet</EmptyTitle>
                  <EmptyDescription>
                    Create your first short link to start tracking clicks.
                  </EmptyDescription>
                </>
              )}
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <CreateLink tags={data.tags} slug={searchLink}>
                  {searchLink ? createLabel : "Create link"}
                </CreateLink>
                {hasFilters && (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ variant: "ghost", size: "lg" })}
                  >
                    Clear filters
                  </Link>
                )}
              </div>
            </EmptyContent>
          </Empty>
        )}
      </TooltipProvider>
    </div>
  );
}
