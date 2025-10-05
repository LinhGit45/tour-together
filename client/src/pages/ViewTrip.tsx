import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import ActivityItem from "@/components/ActivityItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Share2, Check } from "lucide-react";
import type { Trip, Activity } from "@shared/schema";

export default function ViewTrip() {
  const [, params] = useRoute("/trip/:id");
  const [copied, setCopied] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!params?.id) return;
      
      try {
        const response = await fetch(`/api/trips/${params.id}`);
        if (!response.ok) {
          throw new Error('Trip not found');
        }
        const data = await response.json();
        setTrip(data.trip);
        setActivities(data.activities);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trip');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [params?.id]);

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 flex items-center justify-center">
          <p className="text-muted-foreground">Loading trip...</p>
        </main>
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Trip Not Found</h1>
            <p className="text-muted-foreground mb-4">
              {error || "The trip you're looking for doesn't exist."}
            </p>
            <Button onClick={() => window.location.href = '/'}>Go Home</Button>
          </div>
        </main>
      </div>
    );
  }

  // Group activities by date
  const activitiesByDate = activities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);

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

          {activities.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">No activities planned yet.</p>
              </CardContent>
            </Card>
          ) : (
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
                        location={activity.location ?? undefined}
                        description={activity.description ?? undefined}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
