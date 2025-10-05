import { Link } from "wouter";
import { Mountain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-lg px-2 py-1 -ml-2" data-testid="link-home">
              <Mountain className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">TourTogether</span>
            </a>
          </Link>
          
          <nav className="flex items-center gap-2">
            <Link href="/create">
              <Button data-testid="button-create-trip">Create Trip</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
