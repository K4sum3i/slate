"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Google, GitHub } from "@/components/icons/logos";

const socialProviders = [
  {
    name: "Google",
    icon: <Google className="h-5 w-5" />,
    provider: "google",
  },
  {
    name: "GitHub",
    icon: <GitHub className="h-5 w-5" />,
    provider: "github",
  },
];

export default function socialLogin() {
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
    <div>
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
    </div>
  );
}
