import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Layout from "./components/Layout";
import LanguageRoute from "./components/LanguageRoute";
import LanguageRedirect from "./components/LanguageRedirect";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import MetaPixel from "./components/MetaPixel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MetaPixel />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<LanguageRedirect />} />
              <Route path="/:lang" element={<LanguageRoute />}>
                <Route index element={<Index />} />
                <Route path="kontakt" element={<Contact />} />
                {/* <Route path="kalendar" element={<Calendar />} /> */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
