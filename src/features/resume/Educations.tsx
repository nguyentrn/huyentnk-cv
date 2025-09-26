import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import ReactMarkdown from "react-markdown";
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
} from "@/features/resume/components/Timeline"; // <-- IMPORT MỚI

export const Educations = () => {
  const { tResume, educations } = useResumeData();

  return (
    <Section heading={tResume("heading.education")}>
      <Timeline>
        {educations.map((education) => (
          <TimelineItem key={education.university} className={"prose-p:my-0"}>
            <TimelineHeader
              title={education.university}
              subtitle={education.major}
              time={education.time}
            />
            <TimelineContent>
              <ReactMarkdown>{education.desc}</ReactMarkdown>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
};
