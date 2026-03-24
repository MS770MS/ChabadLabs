import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/home";
import Tools from "@/pages/tools";
import Webinars from "@/pages/webinars";
import Showcase from "@/pages/showcase";
import Fund from "@/pages/fund";
import GrantApply from "@/pages/grant-apply";
import SkillsComingSoon from "@/pages/skills-coming-soon";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

const queryClient = new QueryClient();

// Redirect component for Wouter (no built-in Redirect)
function RedirectTo({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  useEffect(() => { setLocation(to, { replace: true }); }, [to, setLocation]);
  return null;
}

function Router() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/tools" component={Tools} />
          <Route path="/resources"><RedirectTo to="/tools" /></Route>
          <Route path="/webinars" component={Webinars} />
          <Route path="/showcase" component={Showcase} />
          <Route path="/showcase/apply" component={GrantApply} />
          <Route path="/fund" component={Fund} />
          <Route path="/skills" component={SkillsComingSoon} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
