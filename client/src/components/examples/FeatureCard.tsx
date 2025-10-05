import FeatureCard from '../FeatureCard';
import { Calendar, Share2, Users } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <FeatureCard
        icon={Calendar}
        title="Easy Planning"
        description="Create detailed itineraries with activities, times, and locations"
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
  );
}
