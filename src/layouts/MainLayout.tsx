import { Navbar } from "@/components/common/Navbar";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import { CustomCursor } from "@/components/common/CustomCursor";

export function MainLayout() {
  const location = useLocation(); // Lấy location hiện tại

  return (
    <>
      {/*<CustomCursor /> /!* Thêm vào đây *!/*/}
      <div
        className={
          "relative flex min-h-screen flex-col bg-neutral-100 lg:flex-row lg:gap-4"
        }
      >
        <Navbar />
        <main className={"min-w-0 flex-grow bg-white shadow-xl"}>
          <AnimatePresence mode="wait">
            <Outlet key={location.pathname} />
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}
