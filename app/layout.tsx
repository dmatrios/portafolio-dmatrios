import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { FloatingThemeButton } from "@/features/ui/FloatingThemeButton";
import { LenisProvider } from "@/shared/providers/LenisProvider";
import { FloatingLangSwitch } from "@/features/ui/FloatingLangSwitch";


export const metadata: Metadata = {
  title: "Portafolio | Dmatrios",
  description: "Portafolio profesional de Daniel Maturrano (Dmatrios).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-dvh overflow-x-hidden">
        <ThemeProvider>
          <LenisProvider>{children}</LenisProvider>
          <FloatingLangSwitch />
          <FloatingThemeButton />
         
        </ThemeProvider>
      </body>
    </html>
  );
}
