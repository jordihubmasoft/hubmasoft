import { ReactNode, useEffect } from "react";
import { useLogin } from "@hooks/useAuthentication";
import { useRouter } from "next/router";

interface UserCheckerProps {
  children: ReactNode;
}

export const UserChecker = ({ children }: UserCheckerProps) => {
  const { data } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push("/login");
    }
  }, [data, router]);

  if (!data) {
    return null;
  }

  return <>{children}</>;
};
