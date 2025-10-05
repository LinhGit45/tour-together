import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Travel_hero_landscape_image_805a621b.png";

export default function Hero() {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
      <img 
        src={heroImage} 
        alt="Travel destination" 
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Plan trips together, effortlessly
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create beautiful itineraries and share them with friends. No signup required.
          </p>
          <Link href="/create">
            <Button size="lg" className="text-lg px-8" data-testid="button-hero-create">
              Create Your First Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
