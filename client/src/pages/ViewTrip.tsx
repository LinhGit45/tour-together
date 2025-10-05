import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import ActivityItem from "@/components/ActivityItem";
import EditableActivityItem from "@/components/EditableActivityItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Share2, Check, Plus, Pencil, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Trip, Activity } from "@shared/schema";
import { linkify } from "@/lib/linkify";

export default function ViewTrip() {
  const [, params] = useRoute("/trip/:id");
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [isEditingTrip, setIsEditingTrip] = useState(false);
  const [editedTrip, setEditedTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    description: "",
  });
  const [newActivity, setNewActivity] = useState({
    date: "",
    time: "09:00",
    title: "",
    location: "",
    description: "",
  });

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
        setEditedTrip({
          name: data.trip.name,
          destination: data.trip.destination,
          startDate: data.trip.startDate,
          endDate: data.trip.endDate,
          description: data.trip.description || "",
        });
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

  const handleUpdateActivity = async (id: string, updates: Partial<Activity>) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update activity');
      }

      const updatedActivity = await response.json();
      setActivities(activities.map(a => a.id === id ? updatedActivity : a));
      toast({
        title: "Activity updated",
        description: "Changes saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete activity');
      }

      setActivities(activities.filter(a => a.id !== id));
      toast({
        title: "Activity deleted",
        description: "Activity removed successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddActivity = async () => {
    if (!trip || !newActivity.title) return;

    try {
      const response = await fetch(`/api/trips/${trip.id}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: newActivity.date || trip.startDate,
          time: newActivity.time,
          title: newActivity.title,
          location: newActivity.location || undefined,
          description: newActivity.description || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add activity');
      }

      const activity = await response.json();
      setActivities([...activities, activity]);
      setNewActivity({
        date: "",
        time: "09:00",
        title: "",
        location: "",
        description: "",
      });
      setIsAddingActivity(false);
      toast({
        title: "Activity added",
        description: "New activity created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add activity. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateTrip = async () => {
    if (!trip || !editedTrip.name || !editedTrip.destination) return;

    try {
      const response = await fetch(`/api/trips/${trip.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editedTrip.name,
          destination: editedTrip.destination,
          startDate: editedTrip.startDate,
          endDate: editedTrip.endDate,
          description: editedTrip.description || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update trip');
      }

      const updatedTrip = await response.json();
      setTrip(updatedTrip);
      setIsEditingTrip(false);
      toast({
        title: "Trip updated",
        description: "Trip details saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update trip. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelTripEdit = () => {
    if (trip) {
      setEditedTrip({
        name: trip.name,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        description: trip.description || "",
      });
    }
    setIsEditingTrip(false);
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

  // Sort activities by time within each date
  Object.keys(activitiesByDate).forEach(date => {
    activitiesByDate[date].sort((a, b) => a.time.localeCompare(b.time));
  });

  const sortedDates = Object.keys(activitiesByDate).sort();

  const formatDateHeader = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <Card className="mb-8">
            <CardContent className="pt-6">
              {isEditingTrip ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Trip Name</Label>
                    <Input
                      value={editedTrip.name}
                      onChange={(e) => setEditedTrip({ ...editedTrip, name: e.target.value })}
                      data-testid="input-edit-trip-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Input
                      value={editedTrip.destination}
                      onChange={(e) => setEditedTrip({ ...editedTrip, destination: e.target.value })}
                      data-testid="input-edit-trip-destination"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input
                        type="date"
                        value={editedTrip.startDate}
                        onChange={(e) => setEditedTrip({ ...editedTrip, startDate: e.target.value })}
                        data-testid="input-edit-trip-start-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input
                        type="date"
                        value={editedTrip.endDate}
                        onChange={(e) => setEditedTrip({ ...editedTrip, endDate: e.target.value })}
                        data-testid="input-edit-trip-end-date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Textarea
                      value={editedTrip.description}
                      onChange={(e) => setEditedTrip({ ...editedTrip, description: e.target.value })}
                      rows={2}
                      data-testid="input-edit-trip-description"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={handleCancelTripEdit}
                      data-testid="button-cancel-trip-edit"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleUpdateTrip}
                      disabled={!editedTrip.name || !editedTrip.destination}
                      data-testid="button-save-trip-edit"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <>
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
                          {(() => {
                            const [startYear, startMonth, startDay] = trip.startDate.split('-').map(Number);
                            const [endYear, endMonth, endDay] = trip.endDate.split('-').map(Number);
                            const startDate = new Date(startYear, startMonth - 1, startDay);
                            const endDate = new Date(endYear, endMonth - 1, endDay);
                            return `${startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
                          })()}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingTrip(true)} 
                        data-testid="button-edit-trip"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Trip
                      </Button>
                      <Button 
                        size="sm"
                        variant={isEditMode ? "default" : "outline"}
                        onClick={() => setIsEditMode(!isEditMode)} 
                        data-testid="button-toggle-edit"
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        {isEditMode ? "Done Editing" : "Edit Activities"}
                      </Button>
                      <Button size="sm" onClick={handleShare} variant="outline" data-testid="button-share">
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {trip.description && (
                    <p className="text-muted-foreground" data-testid="text-description">
                      {linkify(trip.description)}
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {isEditMode && (
            <Card className="mb-6">
              <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
                <CardTitle>Add New Activity</CardTitle>
                {!isAddingActivity && (
                  <Button onClick={() => setIsAddingActivity(true)} size="sm" data-testid="button-show-add-activity">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Activity
                  </Button>
                )}
              </CardHeader>
              {isAddingActivity && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={newActivity.date || trip.startDate}
                        onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                        data-testid="input-new-activity-date"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={newActivity.time}
                        onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                        data-testid="input-new-activity-time"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Activity Title</Label>
                    <Input
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      placeholder="e.g., Visit Museum"
                      data-testid="input-new-activity-title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Location (Optional)</Label>
                    <Input
                      value={newActivity.location}
                      onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                      placeholder="e.g., Downtown"
                      data-testid="input-new-activity-location"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Textarea
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      placeholder="Add notes..."
                      rows={2}
                      data-testid="input-new-activity-description"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsAddingActivity(false);
                        setNewActivity({
                          date: "",
                          time: "09:00",
                          title: "",
                          location: "",
                          description: "",
                        });
                      }}
                      data-testid="button-cancel-add-activity"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddActivity}
                      disabled={!newActivity.title}
                      data-testid="button-save-new-activity"
                    >
                      Add Activity
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {activities.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground">No activities planned yet.</p>
                {isEditMode && (
                  <Button onClick={() => setIsAddingActivity(true)} className="mt-4" data-testid="button-add-first-activity">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Activity
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date}>
                  <h2 className="text-2xl font-semibold mb-4" data-testid={`text-date-header-${date}`}>
                    {formatDateHeader(date)}
                  </h2>
                  <div className="space-y-3">
                    {activitiesByDate[date].map((activity) => (
                      isEditMode ? (
                        <EditableActivityItem
                          key={activity.id}
                          id={activity.id}
                          time={activity.time}
                          title={activity.title}
                          date={activity.date}
                          location={activity.location ?? undefined}
                          description={activity.description ?? undefined}
                          onUpdate={handleUpdateActivity}
                          onDelete={handleDeleteActivity}
                        />
                      ) : (
                        <ActivityItem
                          key={activity.id}
                          id={activity.id}
                          time={activity.time}
                          title={activity.title}
                          location={activity.location ?? undefined}
                          description={activity.description ?? undefined}
                        />
                      )
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
