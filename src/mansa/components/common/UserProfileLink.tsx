import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function UserProfileLink({
  userId,
  children,
  className = "",
}: {
  userId?: string | null;
  children: ReactNode;
  className?: string;
}) {
  if (!userId) return <span className={className}>{children}</span>;
  return (
    <Link
      to="/profile/$userId"
      params={{ userId }}
      className={`underline-offset-2 hover:text-emerald-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${className}`}
    >
      {children}
    </Link>
  );
}
