import { Outlet } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="h-screen w-screen overflow-y-auto">
        <Outlet />
      </main>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default RootLayout;
