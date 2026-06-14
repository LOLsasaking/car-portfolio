import type { Metadata } from "next";
import AdminNav from "@/components/admin/AdminNav";

export const metadata: Metadata = {
  title: "Curator Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ink">
      <AdminNav />
      <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
    </div>
  );
}
