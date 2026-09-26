"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Google, GitHub } from "@/components/icons/logos";
import { cn } from "cn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";

const socialProviders = [
  {
    name: "Login with Google",
    icon: <Google className="h-5 w-5" />,
    provider: "google",
  },
  {
    name: "Login with Github",
    icon: <GitHub className="h-5 w-5" />,
    provider: "github",
  },
];

export default function socialLogin({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [loading, setLoading] = useState<boolean>(false);
  const [provider, setProvider] = useState<string | null>();

  const handleSocialLogin = async (provider: string) => {
    try {
      setLoading(true);
      setProvider(provider);
      await signIn(provider, {
        callbackUrl: callbackUrl || "/dashboard",
      });
    } catch (error) {
      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Login with your Google or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              {socialProviders.map((sp) => (
                <Button
                  key={sp.provider}
                  variant="outline"
                  disabled={loading}
                  name={sp.name}
                  onClick={() => handleSocialLogin(sp.provider)}
                >
                  {provider === sp.provider ? <Spinner /> : sp.icon}
                  <span>{sp.name}</span>
                </Button>
              ))}
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
