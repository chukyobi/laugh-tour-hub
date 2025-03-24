
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: 'Comedy Tour Hub',
  description: 'Book tickets for the funniest comedy shows',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={new QueryClient()}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
