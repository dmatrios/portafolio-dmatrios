import { notFound } from "next/navigation";
import Header from "@/features/layout/Header";
import { Footer } from "@/features/layout/Footer";
import { ScrollToTopOnRouteChange } from "@/shared/ui/ScrollToTopOnRouteChange";

const SUPPORTED_LANGS = ["es", "en"] as const;

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang as (typeof SUPPORTED_LANGS)[number])) {
    notFound();
  }

  const safeLang = (lang === "en" ? "en" : "es") as "es" | "en";

  return (
    <>
      <Header lang={safeLang} />
      <ScrollToTopOnRouteChange />
      {children}
      <Footer lang={safeLang} />
    </>
  );
}
