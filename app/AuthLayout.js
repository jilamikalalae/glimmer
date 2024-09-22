"use client";

import { useSession } from "next-auth/react";
import HomeNavbar from "../app/components/HomeNavbar";
import AppNavbar from "../app/components/AppNavbar"

export default function AuthLayout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      {session ? <AppNavbar /> : <HomeNavbar />}
      <main>{children}</main>
    </>
  );
}