import { NavLink } from "react-router"; // Sửa lại import cho đúng
import { cn } from "@/lib/utils.ts";
import { MagnetizeButton } from "@/components/ui/magnetize-button.tsx";
import { useTranslation } from "react-i18next";
import { SiFacebook, SiTiktok } from "@icons-pack/react-simple-icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { Button } from "../ui/button.tsx";
import { Menu } from "lucide-react";
import Cat from "@/assets/Cat.svg?react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Ghi chú: Component LanguageSwitcher nên được tách ra file riêng
// src/components/common/LanguageSwitcher.tsx để gọn gàng hơn.
// Tuy nhiên, để giữ nguyên cấu trúc file, tôi vẫn để ở đây.
const langs = [
  { key: "vi", label: "VI" },
  { key: "en", label: "EN" },
  { key: "zh", label: "ZH" },
];

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="mt-4 flex gap-2">
      {langs.map((lang) => (
        <button
          key={lang.key}
          onClick={() => changeLanguage(lang.key)}
          disabled={i18n.language === lang.key}
          className={cn(
            "bg-primary-50 border-primary-400 text-primary-400 h-7 w-7 cursor-pointer rounded-full border text-xs font-bold",
            i18n.language === lang.key &&
              "bg-primary-400 text-primary-50 cursor-default",
          )}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

const links = [
  { label: "navbar.home", slug: "/" },
  // { label: "navbar.about", slug: "about" },
  { label: "navbar.portfolio", slug: "/portfolio" },
  { label: "navbar.cv", slug: "/cv" },
];

const socialMedias = [
  { icon: <SiFacebook className={"size-5"} />, link: "https://facebook.com" },
  { icon: <SiTiktok className={"size-5"} />, link: "https://linkedln.com" },
];

export const Background = () => {
  return (
    <div className="absolute inset-0 top-0 bottom-0 -z-20 bg-[url('/background.svg')] bg-cover opacity-10" />
  );
};

function Avatar() {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={
            "h-32 w-32 cursor-pointer rounded-full bg-[url('/avatar.png')] bg-cover"
          }
        />
      </DialogTrigger>
      <DialogContent className={"w-fit !p-0"}>
        <DialogHeader className={"hidden"}>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <img src={"/avatar.png"} alt={"avatar"}></img>
      </DialogContent>
    </Dialog>
  );
}

export const NavbarContent = () => {
  // NEW: Sử dụng hook useTranslation với namespace 'common'
  const { t } = useTranslation("common");

  return (
    <>
      <Background />
      <div className={"flex w-full grow flex-col items-center gap-4"}>
        <LanguageSwitcher />
        <Avatar />
        <div
          className={
            "text-center text-3xl leading-tight font-bold whitespace-pre-line"
          }
        >
          {t("navbar.name")}
        </div>
        <div className={"flex w-full flex-col text-lg leading-relaxed"}>
          {links.map((link) => (
            <NavLink
              key={link.slug}
              to={link.slug}
              className={({ isActive }) =>
                cn(
                  "hover:bg-primary-200/50 border-primary-500 px-8 py-3 transition-colors duration-75 hover:border-r-4",
                  isActive ? "border-r-4 font-bold" : "",
                )
              }
            >
              <div>{t(link.label)}</div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className={"flex flex-col items-center gap-4"}>
        <MagnetizeButton particleCount={14} attractRadius={50} />
        <div className={"flex gap-2"}>
          {/*{socialMedias.map((socialMedia) => (*/}
          {/*  <a // CHANGED: Bọc trong thẻ <a> để có thể click*/}
          {/*    key={socialMedia.link}*/}
          {/*    href={socialMedia.link}*/}
          {/*    target="_blank"*/}
          {/*    rel="noopener noreferrer"*/}
          {/*    className={*/}
          {/*      "hover:bg-primary-50 hover:border-primary-200 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border duration-75"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    {socialMedia.icon}*/}
          {/*  </a>*/}
          {/*))}*/}
        </div>
      </div>
    </>
  );
};

export const Navbar = () => {
  const { t } = useTranslation("common");

  return (
    <header
      className={
        "sticky top-0 z-10 h-12 shrink-0 bg-white lg:h-screen lg:w-2xs lg:min-w-2xs"
      }
    >
      <nav
        className={cn(
          "hidden h-full w-2xs min-w-2xs shrink-0 flex-col items-center justify-between overflow-hidden py-8 lg:flex",
        )}
      >
        <NavbarContent />
      </nav>

      <div
        className={
          "shadow-primary-50/70 flex h-full items-center justify-between px-4 shadow-lg lg:hidden"
        }
      >
        <div className={"w-1/4"}></div>
        <div className="flex w-1/2 justify-center gap-2 text-center font-bold">
          <div className={"h-6 w-6"}>
            <Cat />
          </div>
          <div className={"whitespace-nowrap"}>
            {t("navbar.initials", "KH")}
          </div>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <div className={"flex w-1/4 justify-end"}>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <NavbarContent />
            <SheetFooter>
              <SheetClose asChild>
                {/* CHANGED: Lấy text từ i18n */}
                <Button variant="outline">{t("navbar.close")}</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
