import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import UserAuth from "./UserAuth";

interface ProtectedProps {
  children: ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
  const isAuthenticated = UserAuth();

  return isAuthenticated ? children : redirect("/");
}
