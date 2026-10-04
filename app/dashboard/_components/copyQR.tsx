"use client";

import { Links } from "@/app/generated/prisma/client";
import QRCode from "react-qr-code";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

export default function copyQR({ linkInfo }: { linkInfo: Links }) {
  const handleDownloadQRImage = (type: "png" | "svg") => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);

    if (type === "svg") {
      const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
      const downloadLink = document.createElement("a");
      downloadLink.download = `${linkInfo.slug}_slate_app.svg`;
      downloadLink.href = window.URL.createObjectURL(svgBlob);
      downloadLink.click();
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const downloadLink = document.createElement("a");
        downloadLink.download = `${linkInfo.slug}_slate_app.png`;
        downloadLink.href = canvas.toDataURL("image/png");
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <DialogContent>
      <DialogHeader className="overflow-hidden">
        <DialogTitle>QR Code</DialogTitle>
        <DialogDescription className={"truncate"}>
          {linkInfo.description || "Scan to open the link."}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col items-center gap-3 py-1">
        <div className="rounded-lg bg-white p-3 ring-1 ring-foreground/10">
          <QRCode
            id="qr-code"
            size={148}
            style={{ height: "auto", display: "block" }}
            value={`http://localhost:3000/${linkInfo.slug}`}
            viewBox={`0 0 148 148`}
          />
        </div>
        <p className="w-full truncate text-center font-mono text-sm">
          <span className="text-muted-foreground">/</span>
          {linkInfo.slug}
        </p>
      </div>

      <DialogFooter>
        <DialogClose render={<Button variant={"ghost"} size={"lg"} />}>
          Close
        </DialogClose>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant={"outline"}
                size={"lg"}
                className="active:scale-[0.97] motion-reduce:active:scale-100"
              />
            }
          >
            <DownloadIcon />
            <span>Download</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className={"min-w-36"}>
            <DropdownMenuItem onClick={() => handleDownloadQRImage("png")}>
              PNG Image
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDownloadQRImage("svg")}>
              SVG Image
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogFooter>
    </DialogContent>
  );
}
