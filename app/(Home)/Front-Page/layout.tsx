import type { Metadata } from "next";
// import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata: Metadata = {
  title: "Giggle",
  description: "Giggle",
  generator: "Giggle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>

        <div
          className="fixed inset-0 -z-20 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg.svg')" }}
        />
        <div className="relative min-h-screen flex items-center justify-center">
          <div
            className="
              relative flex flex-col items-center justify-center
              w-full h-full
              max-w-[95vw] max-h-[90vh]
              md:max-w-[700px] md:max-h-[500px]
              lg:max-w-[900px] lg:max-h-[600px]
              xl:max-w-[1110px] xl:max-h-[700px]
              2xl:max-w-[1193px] 2xl:max-h-[744px]
              rounded-[70px] overflow-hidden
              p-2 sm:p-4 md:p-8 lg:p-12
              bg-[#201F1F] bg-cover bg-center bg-no-repeat
              "
              style={{
                  backgroundImage: "url('/overlay.svg')",
                }}
                >
              <Toaster />
              <AuthProvider>
              {children}
            </AuthProvider>
          </div>
        </div>
    </div>
  );
}
