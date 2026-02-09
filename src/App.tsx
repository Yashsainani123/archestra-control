import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import DiscoveryDashboard from "@/pages/DiscoveryDashboard";
import SecurityDashboard from "@/pages/SecurityDashboard";
import CostDashboard from "@/pages/CostDashboard";
import AuditLogDashboard from "@/pages/AuditLogDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ExecutiveDashboard />} />
            <Route path="/discovery" element={<DiscoveryDashboard />} />
            <Route path="/security" element={<SecurityDashboard />} />
            <Route path="/cost" element={<CostDashboard />} />
            <Route path="/audit" element={<AuditLogDashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
