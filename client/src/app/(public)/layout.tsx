"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import { LoadingPage } from "@/components/Loading/LoadingPage";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, authLoading } = useAuthContext();

  useEffect(() => {
    if (!authLoading && user) {
      router.replace("/");
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return <LoadingPage />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
}