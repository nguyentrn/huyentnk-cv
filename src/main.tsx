import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { PrintableCV } from "@/pages/PrintableCV.tsx";
import { Home } from "@/pages/Home.tsx";
import { Portfolio } from "@/pages/Portfolio.tsx";
import "./i18n.ts";
import { WebCV } from "@/pages/WebCV.tsx";
import { ProjectDetail } from "@/pages/ProjectDetail.tsx";
import { About } from "@/pages/About.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "portfolio",
        element: <Portfolio />,
      },
      {
        path: "cv",
        element: <WebCV />,
      },
      {
        path: "portfolio/:slug",
        element: <ProjectDetail />,
      },
    ],
  },
  {
    path: "printable-cv",
    element: <PrintableCV />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
