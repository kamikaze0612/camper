import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { LoginForm } from "./login_form";
import { AuthCard } from "@/components/auth/auth_card";

export const LoginCard: React.FC = () => {
  return (
    <AuthCard
      alternateLink="/register"
      alternateText="Don't have an account?"
      title="Log In"
      showSocial
    >
      <LoginForm />
    </AuthCard>
  );
};
