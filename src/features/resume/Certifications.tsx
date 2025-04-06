import { Lang } from "@/features/resume/types.ts";
import { Section } from "@/features/resume/Section.tsx";
import { heading } from "@/features/resume/constants.ts";

export const Certifications = ({ lang }: { lang: Lang }) => {
  return (
    <Section heading={heading.CERTIFICATION[lang]}>
      <div>Google Digital Garage</div>
      <div>Linkedln Marketing Labs</div>
      <div>Hubspot Inbound Marketing</div>
    </Section>
  );
};
