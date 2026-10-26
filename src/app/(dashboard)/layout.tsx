import { Suspense } from "react";
import { Sidebar, SidebarFallback } from "@/components/sidebar";

export default function DashboardLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex flex-col md:flex-row flex-1">
      {/* usePathname cần Suspense trên các route có param động (cacheComponents) */}
      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 bg-canvas px-4 sm:px-8 py-4 min-w-0 min-h-screen">{children}</main>
    </div>
  );
}
