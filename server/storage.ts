import { type Trip, type InsertTrip, type Activity, type InsertActivity } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createTrip(trip: InsertTrip): Promise<Trip>;
  getTrip(id: string): Promise<Trip | undefined>;
  updateTrip(id: string, trip: Partial<InsertTrip>): Promise<Trip | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  getActivitiesByTripId(tripId: string): Promise<Activity[]>;
  updateActivity(id: string, activity: Partial<InsertActivity>): Promise<Activity | undefined>;
  deleteActivity(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private trips: Map<string, Trip>;
  private activities: Map<string, Activity>;

  constructor() {
    this.trips = new Map();
    this.activities = new Map();
  }

  async createTrip(insertTrip: InsertTrip): Promise<Trip> {
    const id = randomUUID();
    const trip: Trip = { 
      ...insertTrip, 
      id,
      description: insertTrip.description ?? null 
    };
    this.trips.set(id, trip);
    return trip;
  }

  async getTrip(id: string): Promise<Trip | undefined> {
    return this.trips.get(id);
  }

  async updateTrip(id: string, updates: Partial<InsertTrip>): Promise<Trip | undefined> {
    const trip = this.trips.get(id);
    if (!trip) return undefined;
    
    const updatedTrip: Trip = {
      ...trip,
      ...updates,
      id,
      description: updates.description !== undefined ? (updates.description ?? null) : trip.description,
    };
    
    this.trips.set(id, updatedTrip);
    return updatedTrip;
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = randomUUID();
    const activity: Activity = { 
      ...insertActivity, 
      id,
      description: insertActivity.description ?? null,
      location: insertActivity.location ?? null
    };
    this.activities.set(id, activity);
    return activity;
  }

  async getActivitiesByTripId(tripId: string): Promise<Activity[]> {
    return Array.from(this.activities.values()).filter(
      (activity) => activity.tripId === tripId,
    );
  }

  async updateActivity(id: string, updates: Partial<InsertActivity>): Promise<Activity | undefined> {
    const activity = this.activities.get(id);
    if (!activity) return undefined;
    
    const updatedActivity: Activity = {
      ...activity,
      ...updates,
      id,
      description: updates.description !== undefined ? (updates.description ?? null) : activity.description,
      location: updates.location !== undefined ? (updates.location ?? null) : activity.location,
    };
    
    this.activities.set(id, updatedActivity);
    return updatedActivity;
  }

  async deleteActivity(id: string): Promise<boolean> {
    return this.activities.delete(id);
  }
}

export const storage = new MemStorage();
