import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Activity {
  id: string;
  date: string;
  time: string;
  title: string;
  location: string;
  description: string;
}

export default function CreateTrip() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addActivity = () => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      date: startDate,
      time: "09:00",
      title: "",
      location: "",
      description: "",
    };
    setActivities([...activities, newActivity]);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
  };

  const updateActivity = (id: string, field: keyof Activity, value: string) => {
    setActivities(activities.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trip: {
            name: tripName,
            destination,
            startDate,
            endDate,
            description: description || undefined,
          },
          activities: activities.map(a => ({
            date: a.date,
            time: a.time,
            title: a.title,
            location: a.location || undefined,
            description: a.description || undefined,
          })),
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create trip');
      }
      
      const { trip } = await response.json();
      toast({
        title: "Trip created!",
        description: "Your trip has been created successfully.",
      });
      setLocation(`/trip/${trip.id}`);
    } catch (error) {
      console.error('Error creating trip:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8">Create New Trip</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trip Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tripName">Trip Name</Label>
                  <Input
                    id="tripName"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="e.g., Summer Adventure in Japan"
                    required
                    data-testid="input-trip-name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input
                    id="destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g., Tokyo, Japan"
                    required
                    data-testid="input-destination"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      data-testid="input-start-date"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      data-testid="input-end-date"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell us about your trip..."
                    rows={3}
                    data-testid="input-description"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                <CardTitle>Activities</CardTitle>
                <Button 
                  type="button" 
                  size="sm"
                  onClick={addActivity}
                  data-testid="button-add-activity"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Activity
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No activities yet. Click "Add Activity" to start planning!
                  </p>
                ) : (
                  activities.map((activity) => (
                    <Card key={activity.id} data-testid={`card-activity-form-${activity.id}`}>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div className="space-y-2">
                              <Label>Date</Label>
                              <Input
                                type="date"
                                value={activity.date}
                                onChange={(e) => updateActivity(activity.id, 'date', e.target.value)}
                                required
                                data-testid={`input-activity-date-${activity.id}`}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Time</Label>
                              <Input
                                type="time"
                                value={activity.time}
                                onChange={(e) => updateActivity(activity.id, 'time', e.target.value)}
                                required
                                data-testid={`input-activity-time-${activity.id}`}
                              />
                            </div>
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => removeActivity(activity.id)}
                            data-testid={`button-remove-activity-${activity.id}`}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Activity Title</Label>
                          <Input
                            value={activity.title}
                            onChange={(e) => updateActivity(activity.id, 'title', e.target.value)}
                            placeholder="e.g., Visit Senso-ji Temple"
                            required
                            data-testid={`input-activity-title-${activity.id}`}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Location (Optional)</Label>
                          <Input
                            value={activity.location}
                            onChange={(e) => updateActivity(activity.id, 'location', e.target.value)}
                            placeholder="e.g., Asakusa District"
                            data-testid={`input-activity-location-${activity.id}`}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Description (Optional)</Label>
                          <Textarea
                            value={activity.description}
                            onChange={(e) => updateActivity(activity.id, 'description', e.target.value)}
                            placeholder="Add notes about this activity..."
                            rows={2}
                            data-testid={`input-activity-description-${activity.id}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setLocation('/')}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                data-testid="button-submit-trip"
              >
                {isSubmitting ? "Creating..." : "Create Trip"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
