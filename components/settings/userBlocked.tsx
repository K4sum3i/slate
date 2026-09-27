import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export default function UserBlocked({ className }: { className?: string }) {
  return (
    <Alert variant={"destructive"} className={className}>
      <AlertCircleIcon />
      <AlertTitle>Your account has been blocked for service abuse</AlertTitle>
      <AlertDescription>
        <a href="https://github.com/K4sum3i/slate/issues/new/choose">
          Please contact support
        </a>{" "}
        for more information.
      </AlertDescription>
    </Alert>
  );
}
