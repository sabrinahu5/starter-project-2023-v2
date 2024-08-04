import { ModeToggle } from "@/app/(components-navbar)/mode-toggle";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "T4SG Starter Project",
  description: "T4SG starter project 2023. Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Hydration warning suppressed because of next-themes https://github.com/pacocoursey/next-themes */}
      <body>
        <Providers>
          <div className="flex-col md:flex">
            <div className="ml-auto flex items-center space-x-4 p-4">
              <ModeToggle />
            </div>
            {/* Conditionally display website if logged in, else display login page */}
            <div className="space-y-3 p-10 pb-16 md:block">
              <main>{children}</main>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
