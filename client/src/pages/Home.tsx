import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import { Calendar, Share2, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why TourTogether?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The simplest way to plan and share travel itineraries with your friends
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={Calendar}
              title="Easy Planning"
              description="Create detailed itineraries with activities, times, and locations in minutes"
            />
            <FeatureCard
              icon={Share2}
              title="Instant Sharing"
              description="Share trips with a simple link - no signup required for viewing"
            />
            <FeatureCard
              icon={Users}
              title="Collaborate"
              description="Work together with friends to plan the perfect adventure"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
