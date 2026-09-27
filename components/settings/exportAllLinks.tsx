"use client";

import { useState } from "react";
import { DownloadIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { downloadAllLinks } from "@/lib/actions/links";
import { toast } from "../ui/toast";

export default function ExportAllLinks() {
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
    <Button
      variant="outline"
      onClick={handleDownloadLinks}
      disabled={loading}
      className="mt-1 active:scale-[0.98] motion-reduce:active:scale-100"
    >
      {loading ? <Spinner /> : <DownloadIcon />}
      <span>{loading ? "Exporting..." : "Export all links"}</span>
    </Button>
  );
}
