"use client";

import TextType from "@/components/TextType";

export function HeroTyped({ lang }: { lang: "es" | "en" }) {
  const textsEs = ["Desarrollador", "Full-Stack", "Dmatrios", "Humano", "Esposo, Programador"];
  const textsEn = ["Developer", "Full-Stack", "Dmatrios", "Human", "Husband ", "Programmer"];

  return (
    <span
      className="
        inline-block align-baseline
        whitespace-nowrap
        text-black dark:text-white
      "
    >
      <TextType
        text={lang === "es" ? textsEs : textsEn}
        typingSpeed={75}
        deletingSpeed={50}
        pauseDuration={1200}
        showCursor
        cursorCharacter="_"
        cursorBlinkDuration={0.5}
        variableSpeed={false}
        onSentenceComplete={() => {}}
      />
    </span>
  );
}
