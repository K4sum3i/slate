import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Errorpage() {
  return (
    <Card>
      <CardHeader>Something went wrong</CardHeader>
      <CardContent>
        <Link href={"/auth"}>
          <span>Back to login</span>
        </Link>
      </CardContent>
    </Card>
  );
}
