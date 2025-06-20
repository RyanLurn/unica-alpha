// biome-ignore assist/source/organizeImports: React Scan must be imported before React
import { scan } from "react-scan";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import RootLayout from "@/components/root-layout";
import ChatPage from "@/components/pages/chat";

scan({
  enabled: true,
});

// biome-ignore lint/style/noNonNullAssertion: vite react default
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
