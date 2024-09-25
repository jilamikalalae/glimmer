import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const validateSession = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);
};

export const getUserId = () => {
  const { data: session } = useSession();
  if (!session) {
    router.push("/auth/login");
  }

  return session.user.id;
};
