import { getLinksAndTagsByUser } from "@/lib/queries";
import Searchlinks from "./_components/links";
import LinksLimit from "./_components/linksLimit";
import SearchTag from "./_components/searchTag";
import CreateLink from "./_components/createLink";
import { PackageOpenIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardLink from "./_components/cardLink";
import UserBlocked from "@/components/settings/userBlocked";

export default async function Dashboardpage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    tag?: string;
  };
}) {
  const data = await getLinksAndTagsByUser();
  const searchLink = searchParams?.search;
  const searchTag = searchParams?.tag;

  if (!data) return <div>ERROR</div>;
  if (!data?.links) return <div>ERROR</div>;

  const filteredLinks = data.links.filter((link) => {
    if (!searchLink && !searchTag) return true;

    const matchSlug = !searchLink || link.slug.includes(searchLink);

    const matchTag =
      !searchTag || link.tags.some((tag) => tag.tagId === searchTag);

    return matchSlug && matchTag;
  });

  return (
    <main className="mx-auto w-full max-w-[880px] px-5 pb-20 pt-7">
      {data.userData?.blocked && <UserBlocked className="mb-3" />}
      <header className="mb-4 flex flex-wrap items-center gap-2">
        <Searchlinks className="relative min-w-[180px] flex-1" />
        <div className="flex items-center gap-2">
          <LinksLimit userLinks={data.links.length} maxLinks={data.limit} />
          <SearchTag
            tags={data.tags}
            tagSelected={searchTag!}
            tagName={searchTag}
          />
          {filteredLinks.length > 0 && (
            <CreateLink tags={data.tags} slug={searchLink}>
              <Button variant={"outline"} size="sm">
                <PlusIcon size={14} />
                <span>
                  {searchLink
                    ? `Create a link with ${searchLink} slug`
                    : "New link"}
                </span>
              </Button>
            </CreateLink>
          )}
        </div>
      </header>
      <div className="divide-y divide-border rounded-md border border-border">
        {filteredLinks
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((link) => {
            return (
              <CardLink
                key={link.id}
                linkInfo={link}
                linkTags={link.tags}
                tagsInfo={data.tags}
              />
            );
          })}
      </div>

      {filteredLinks.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center space-y-3 rounded-md border border-border py-12 text-center">
          {searchLink ? (
            <PackageOpenIcon size={48} strokeWidth={0.5} />
          ) : (
            <SparklesIcon size={48} strokeWidth={0.5} />
          )}
          <div className="space-y-1">
            {searchLink ? (
              <p>
                No links found with{" "}
                <span className="font-mono">{searchLink}</span>
              </p>
            ) : (
              <p>
                {searchTag ? "No links found with this tag" : "No links found"}
              </p>
            )}
          </div>
          <CreateLink tags={data.tags} slug={searchLink}>
            <Button variant={"outline"} size="sm">
              <PlusIcon size={14} />
              <span>
                {searchLink
                  ? `Create a link with ${searchLink} slug`
                  : "Create a new link"}
              </span>
            </Button>
          </CreateLink>
        </div>
      )}
    </main>
  );
}
