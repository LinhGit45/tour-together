import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";

interface ActivityItemProps {
  id: string;
  time: string;
  title: string;
  location?: string | null;
  description?: string | null;
}

export default function ActivityItem({ id, time, title, location, description }: ActivityItemProps) {
  return (
    <Card className="relative" data-testid={`card-activity-${id}`}>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-16 text-sm font-medium text-muted-foreground" data-testid={`text-time-${id}`}>
            {time}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold mb-1" data-testid={`text-title-${id}`}>{title}</h4>
            {location && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin className="h-3 w-3" />
                <span data-testid={`text-location-${id}`}>{location}</span>
              </div>
            )}
            {description && (
              <p className="text-sm text-muted-foreground" data-testid={`text-description-${id}`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
