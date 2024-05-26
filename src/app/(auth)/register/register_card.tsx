import { AuthCard } from "@/components/auth/auth_card";

import { RegisterForm } from "./register_form";

export const RegisterCard: React.FC = () => {
  return (
    <AuthCard
      showSocial
      alternateLink="/login"
      alternateText="Already have an account?"
      title="Create account"
    >
      <RegisterForm />
    </AuthCard>
  );
};
