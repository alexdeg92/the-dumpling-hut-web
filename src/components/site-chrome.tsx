"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative flex min-h-screen w-full max-w-full flex-col overflow-x-clip">
      <Nav />
      <main className="relative z-10 flex-1 overflow-x-clip">{children}</main>
      <Footer />
    </div>
  );
}
