import { Container } from "@/components/common/Container";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
// THÊM MỚI: Các icon phù hợp hơn
import { BrainCircuit, PenSquare, ClipboardCheck } from "lucide-react";

// Sub-component cho các thẻ năng lực
const ApproachCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => (
  <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
    <div className="bg-primary-100 text-primary-600 flex h-10 w-10 items-center justify-center rounded-full">
      {icon}
    </div>
    <h3 className="mt-2 font-semibold text-neutral-800">{title}</h3>
    <p className="text-neutral-600">{desc}</p>
  </div>
);

export const About = () => {
  const { t } = useTranslation("common");

  const approachItems = t("about.approach.items", {
    returnObjects: true,
  }) as any[];

  return (
    <Container className="py-24 md:py-32">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-20 md:gap-24">
        {/* === HỒI 1: CÂU CHUYỆN NỀN TẢNG === */}
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-16">
          {/* Ảnh bên trái */}
          <div className="w-96 shrink-0">
            <img
              src="/avatar.png"
              alt="Portrait of Khanh Huyen"
              className="aspect-[4/5] w-full rounded-3xl object-cover object-top shadow-lg"
            />
          </div>
          {/* Nội dung bên phải */}
          <div className="order-2 flex flex-col gap-4 md:order-2">
            <span className="text-primary-500 font-serif text-2xl">
              {t("about.pageTitle")}
            </span>
            <h1 className="mt-2 font-serif text-4xl font-medium text-neutral-700">
              {t("about.story.title")}
            </h1>
            <div className="prose prose-lg mt-4 max-w-none text-neutral-600">
              <ReactMarkdown>{t("about.story.content")}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* === HỒI 2: CÁCH TIẾP CẬN MARKETING === */}
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-neutral-50 p-8 md:p-12">
          <h2 className="text-center font-serif text-3xl font-medium text-neutral-700">
            {t("about.approach.title")}
          </h2>
          <p className="max-w-xl text-center text-lg text-neutral-600">
            {t("about.approach.intro")}
          </p>
          <div className="mt-6 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <ApproachCard
              icon={<BrainCircuit size={20} />}
              title={approachItems[0].title}
              desc={approachItems[0].desc}
            />
            <ApproachCard
              icon={<PenSquare size={20} />}
              title={approachItems[1].title}
              desc={approachItems[1].desc}
            />
            <ApproachCard
              icon={<ClipboardCheck size={20} />}
              title={approachItems[2].title}
              desc={approachItems[2].desc}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
