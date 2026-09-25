import { AlertCircleIcon } from "lucide-react";
import { Alert } from "../ui/alert";

export default function userBlocked({ className }: { className?: string }) {
  return (
    <Alert variant={"destructive"} className={className}>
      <AlertCircleIcon />
      <strong>You account has been blocked for service abuse</strong>
      <p>
        <a
          href="https://github.com/K4sum3i/slate/issues/new/choose"
          className="mr-1 underline-offset-2"
        >
          Please contact the support
        </a>
        for more information.
      </p>
    </Alert>
  );
}
