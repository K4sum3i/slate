"use client";

import { DownloadIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useState } from "react";
import { downloadAllLinks } from "@/lib/actions/links";
import { toast } from "../ui/toast";

export default function exportAllLinks() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDownloadLinks = async () => {
    setLoading(true);
    try {
      const links = await downloadAllLinks();
      const blob = new Blob([JSON.stringify(links)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "slate-links.json";
      a.click();
      URL.revokeObjectURL(url);
      toast.add({
        type: "success",
        description: "Links exported successfully.",
      });
    } catch (error) {
      toast.add({
        type: "error",
        description: "Failed to download links.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownloadLinks} disabled={loading}>
      {loading ? <Spinner /> : <DownloadIcon size={14} />}
      <span>{loading ? "Exporting..." : "Export all links"}</span>
    </Button>
  );
}
