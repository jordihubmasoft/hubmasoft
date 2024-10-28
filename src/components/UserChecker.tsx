import { ReactNode, useEffect } from "react";
import { useLogin } from "@hooks/useAuthentication";
import { useRouter } from "next/router";
import useAuthStore from "store/useAuthStore";

interface UserCheckerProps {
  children: ReactNode;
}

export const UserChecker = ({ children }: UserCheckerProps) => {
  const { agentId } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!agentId) {
      router.push("/auth/login");
    }
  }, [agentId, router]);

  if (!agentId) {
    return null;
  }

  return <>{children}</>;
};
