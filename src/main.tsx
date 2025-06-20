// biome-ignore assist/source/organizeImports: React Scan must be imported before React
import { scan } from "react-scan";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "@/App.tsx";
import RootLayout from "@/components/root-layout";

scan({
  enabled: true,
});

// biome-ignore lint/style/noNonNullAssertion: vite react default
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
