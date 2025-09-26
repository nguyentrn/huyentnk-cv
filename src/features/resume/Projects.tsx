// src/features/resume/Projects.tsx
import { Section } from "./Section";
import { useResumeData } from "@/hooks/useResumeData";
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineItem,
} from "@/features/resume/components/Timeline.tsx"; // <-- IMPORT MỚI

export const Projects = () => {
  const { heading, projects, tResume } = useResumeData();

  return (
    <Section heading={heading.projects}>
      {/* THAY ĐỔI Ở ĐÂY */}
      <Timeline>
        {projects.map((project) => (
          <TimelineItem key={project.name}>
            <TimelineHeader title={project.name} subtitle={project.in} />
            <TimelineContent>
              <ul className={"!my-2 !ml-0 block list-disc !pl-5 text-sm"}>
                {project.desc.map((d, index) => (
                  <li key={index} className={"!my-0 !leading-relaxed"}>
                    {d}
                  </li>
                ))}
              </ul>
              <strong>{tResume("projects.resultLabel")}</strong>
              <ul className={"!my-0 !ml-0 block list-disc !pl-5 text-sm"}>
                {project.result.map((d, index) => (
                  <li key={index} className={"!my-0 !leading-relaxed"}>
                    {d}
                  </li>
                ))}
              </ul>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      {/* KẾT THÚC THAY ĐỔI */}
    </Section>
  );
};
