"use client";

export default function JobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-screen">
      {children}
    </div>
  );
}
