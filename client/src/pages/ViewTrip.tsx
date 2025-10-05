import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import ActivityItem from "@/components/ActivityItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Share2, Copy, Check } from "lucide-react";

// TODO: remove mock functionality
const mockTrip = {
  id: "1",
  name: "Summer Adventure in Japan",
  destination: "Tokyo, Japan",
  startDate: "2024-07-15",
  endDate: "2024-07-22",
  description: "Exploring the vibrant streets of Tokyo, ancient temples of Kyoto, and relaxing in traditional onsens.",
  activities: [
    {
      id: "1",
      date: "2024-07-15",
      time: "09:00",
      title: "Arrival at Narita Airport",
      location: "Narita International Airport",
      description: "Pick up pocket WiFi and JR Pass at the airport"
    },
    {
      id: "2",
      date: "2024-07-15",
      time: "12:00",
      title: "Check-in at Hotel",
      location: "Shibuya District",
      description: "Drop off luggage and rest"
    },
    {
      id: "3",
      date: "2024-07-15",
      time: "15:00",
      title: "Explore Shibuya Crossing",
      location: "Shibuya",
      description: "Experience the world's busiest intersection and do some shopping"
    },
    {
      id: "4",
      date: "2024-07-16",
      time: "08:00",
      title: "Visit Senso-ji Temple",
      location: "Asakusa",
      description: "Explore Tokyo's oldest temple and browse Nakamise shopping street"
    },
    {
      id: "5",
      date: "2024-07-16",
      time: "13:00",
      title: "Lunch at Tsukiji Market",
      location: "Tsukiji",
      description: "Fresh sushi and seafood at the outer market"
    },
    {
      id: "6",
      date: "2024-07-16",
      time: "16:00",
      title: "teamLab Borderless",
      location: "Odaiba",
      description: "Interactive digital art museum experience"
    }
  ]
};

export default function ViewTrip() {
  const [, params] = useRoute("/trip/:id");
  const [copied, setCopied] = useState(false);

  // TODO: remove mock functionality - fetch real trip data
  const trip = mockTrip;

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group activities by date
  const activitiesByDate = trip.activities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, typeof trip.activities>);

  const sortedDates = Object.keys(activitiesByDate).sort();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold mb-2" data-testid="text-trip-name">
                    {trip.name}
                  </h1>
                  <div className="flex items-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg" data-testid="text-destination">{trip.destination}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span data-testid="text-dates">
                      {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
                <Button onClick={handleShare} data-testid="button-share">
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Trip
                    </>
                  )}
                </Button>
              </div>
              {trip.description && (
                <p className="text-muted-foreground" data-testid="text-description">
                  {trip.description}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="space-y-8">
            {sortedDates.map((date) => (
              <div key={date}>
                <h2 className="text-2xl font-semibold mb-4" data-testid={`text-date-header-${date}`}>
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </h2>
                <div className="space-y-3">
                  {activitiesByDate[date].map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      id={activity.id}
                      time={activity.time}
                      title={activity.title}
                      location={activity.location}
                      description={activity.description}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
