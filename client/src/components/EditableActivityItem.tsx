import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Pencil, Trash2, Check, X } from "lucide-react";
import { linkify, renderHtml } from "@/lib/linkify";

interface EditableActivityItemProps {
  id: string;
  time: string;
  title: string;
  date: string;
  location?: string | null;
  description?: string | null;
  onUpdate: (id: string, updates: { date: string; time: string; title: string; location?: string; description?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function EditableActivityItem({ 
  id, 
  time, 
  title, 
  date,
  location, 
  description,
  onUpdate,
  onDelete
}: EditableActivityItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTime, setEditedTime] = useState(time);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedLocation, setEditedLocation] = useState(location || "");
  const [editedDescription, setEditedDescription] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onUpdate(id, {
        date: editedDate,
        time: editedTime,
        title: editedTitle,
        location: editedLocation || undefined,
        description: editedDescription || undefined,
      });
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedDate(date);
    setEditedTime(time);
    setEditedTitle(title);
    setEditedLocation(location || "");
    setEditedDescription(description || "");
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card data-testid={`card-activity-edit-${id}`}>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                value={editedDate}
                onChange={(e) => setEditedDate(e.target.value)}
                data-testid={`input-edit-date-${id}`}
              />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input
                type="time"
                value={editedTime}
                onChange={(e) => setEditedTime(e.target.value)}
                data-testid={`input-edit-time-${id}`}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Activity Title</Label>
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              data-testid={`input-edit-title-${id}`}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Location (Optional)</Label>
            <Input
              value={editedLocation}
              onChange={(e) => setEditedLocation(e.target.value)}
              data-testid={`input-edit-location-${id}`}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={2}
              data-testid={`input-edit-description-${id}`}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              data-testid={`button-cancel-edit-${id}`}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !editedTitle}
              data-testid={`button-save-edit-${id}`}
            >
              <Check className="h-4 w-4 mr-1" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

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
              <div className="text-sm text-muted-foreground break-words overflow-wrap-anywhere" data-testid={`text-description-${id}`}>
                {renderHtml(linkify(description))}
              </div>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              data-testid={`button-edit-activity-${id}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(id)}
              data-testid={`button-delete-activity-${id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
