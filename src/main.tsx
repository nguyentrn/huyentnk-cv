import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { MainLayout } from "./layouts/MainLayout.tsx";
import { CV } from "@/features/resume/ResumeLayout.tsx";
import { Home } from "@/pages/Home.tsx";
import { Portfolio } from "@/pages/Portfolio.tsx";
import "./i18n.ts";
import { WebCV } from "@/pages/WebCV.tsx";
import { ProjectDetail } from "@/pages/ProjectDetail.tsx";

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
    element: <CV />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
