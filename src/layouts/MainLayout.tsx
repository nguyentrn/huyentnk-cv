import { Navbar } from "@/components/common/Navbar";
import { Outlet } from "react-router";
import { AnimatePresence } from "framer-motion";

export function MainLayout() {
  return (
    <div
      className={
        "relative flex min-h-screen flex-col bg-neutral-100 md:flex-row md:gap-4"
      }
    >
      <Navbar />
      <main className={"min-w-0 flex-grow bg-white shadow-xl"}>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
    </div>
  );
}
