import ContactPage from "@/features/contact/contact-page";

type PageProps = {
  params: { slug: string };
};

export default function Page({ params }: PageProps) {
  const lang = params.slug === "en" ? "en" : "es";
  return <ContactPage lang={lang} />;
}
