import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SocialLogin from "./_components/socialLogin";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your credentials to log in.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SocialLogin />
      </CardContent>
    </Card>
  );
}
