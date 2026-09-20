import { getLinksAndTagsByUser } from "@/lib/queries";

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
  return <div>page</div>;
}
