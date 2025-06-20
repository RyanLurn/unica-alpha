import { Outlet } from "react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="h-screen w-screen">
        <Outlet />
      </main>
      <div className="fixed top-2 right-2">
        <ModeToggle />
      </div>
      <Toaster closeButton richColors position="top-center" />
    </ThemeProvider>
  );
}

export default RootLayout;
