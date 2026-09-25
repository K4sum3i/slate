import { getLinksAndTagsByUser } from "@/lib/queries";
import Searchlinks from "./_components/links";
import LinksLimit from "./_components/linksLimit";
import SearchTag from "./_components/searchTag";
import CreateLink from "./_components/createLink";
import { PackageOpenIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import CardLink from "./_components/cardLink";
import Prueba from "./_components/prueba";
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
        <div className="flex items-center space-x-2">
          <LinksLimit userLinks={data.links.length} maxLinks={data.limit} />
          <SearchTag
            tags={data.tags}
            tagSelected={searchTag!}
            tagName={searchTag}
          />
          {filteredLinks.length > 0 && (
            <CreateLink tags={data.tags} slug={searchLink}>
              <Button variant={"outline"}>
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
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
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
      <div className="">
        {filteredLinks
          .sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
          .map((link) => {
            return (
              <Prueba
                key={link.id}
                linkInfo={link}
                linkTags={link.tags}
                tagsInfo={data.tags}
              />
            );
          })}
      </div>

      {filteredLinks.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center space-y-3 text-center">
          {searchLink ? (
            <PackageOpenIcon size={48} strokeWidth={0.5} />
          ) : (
            <SparklesIcon size={48} strokeWidth={0.5} />
          )}
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
          <CreateLink tags={data.tags} slug={searchLink}>
            <Button variant={"outline"}>
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
