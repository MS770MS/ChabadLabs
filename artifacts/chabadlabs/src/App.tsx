import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import Home from "@/pages/home";
import Resources from "@/pages/resources";
import Webinars from "@/pages/webinars";
import GetStarted from "@/pages/get-started";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/resources" component={Resources} />
          <Route path="/webinars" component={Webinars} />
          <Route path="/get-started" component={GetStarted} />
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
