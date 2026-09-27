import { redirect } from "next/navigation";

import { urlFromServer } from "@/lib/proxy/redirect";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const getDataApi = await urlFromServer(slug);

  if (getDataApi.redirect404 || getDataApi.error || !getDataApi.url) {
    return null;
  }

  redirect(getDataApi.url);
}
