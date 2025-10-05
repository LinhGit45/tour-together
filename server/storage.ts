import { type Trip, type InsertTrip, type Activity, type InsertActivity } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createTrip(trip: InsertTrip): Promise<Trip>;
  getTrip(id: string): Promise<Trip | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  getActivitiesByTripId(tripId: string): Promise<Activity[]>;
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
}

export const storage = new MemStorage();
