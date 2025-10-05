import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Share2 } from "lucide-react";
import { Link } from "wouter";

interface TripCardProps {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export default function TripCard({ id, name, destination, startDate, endDate, description }: TripCardProps) {
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}/trip/${id}`;
    navigator.clipboard.writeText(shareUrl);
    console.log('Share link copied:', shareUrl);
  };

  return (
    <Link href={`/trip/${id}`}>
      <Card className="hover-elevate active-elevate-2 cursor-pointer transition-shadow" data-testid={`card-trip-${id}`}>
        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-xl" data-testid={`text-trip-name-${id}`}>{name}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span data-testid={`text-destination-${id}`}>{destination}</span>
            </div>
          </div>
          <Button 
            size="icon" 
            variant="ghost"
            onClick={handleShare}
            data-testid={`button-share-${id}`}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
            <Calendar className="h-4 w-4" />
            <span data-testid={`text-dates-${id}`}>
              {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
            </span>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-description-${id}`}>
              {description}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
