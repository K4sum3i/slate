import { getLinksAndTagsByUser } from "@/lib/queries";
import Searchlinks from "./_components/links";
import LinksLimit from "./_components/linksLimit";
import SearchTag from "./_components/searchTag";

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
    <main className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      {/* {data.userData?.blocked && <UserBlocked />} */}
      <header className="mb-5 flex w-full items-center space-x-2 md:justify-between">
        <Searchlinks className="w-full md:w-72 md:max-w-72" />
        <div className="flex items-center space-x-2">
          <LinksLimit userLinks={data.links.length} maxLinks={data.limit} />
          <SearchTag
            tags={data.tags}
            tagSelected={searchTag!}
            tagName={searchTag}
          />
        </div>
      </header>
    </main>
  );
}
