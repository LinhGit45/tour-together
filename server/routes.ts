import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTripSchema, insertActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/trips", async (req, res) => {
    try {
      const { trip, activities } = req.body;
      
      const validatedTrip = insertTripSchema.parse(trip);
      const createdTrip = await storage.createTrip(validatedTrip);
      
      const createdActivities = [];
      if (activities && Array.isArray(activities)) {
        for (const activity of activities) {
          const validatedActivity = insertActivitySchema.parse({
            ...activity,
            tripId: createdTrip.id,
          });
          const createdActivity = await storage.createActivity(validatedActivity);
          createdActivities.push(createdActivity);
        }
      }
      
      res.json({ trip: createdTrip, activities: createdActivities });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/trips/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const trip = await storage.getTrip(id);
      
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }
      
      const activities = await storage.getActivitiesByTripId(id);
      
      res.json({ trip, activities });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.put("/api/trips/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const trip = await storage.updateTrip(id, updates);
      
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }
      
      res.json(trip);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/trips/:tripId/activities", async (req, res) => {
    try {
      const { tripId } = req.params;
      const trip = await storage.getTrip(tripId);
      
      if (!trip) {
        return res.status(404).json({ error: "Trip not found" });
      }
      
      const validatedActivity = insertActivitySchema.parse({
        ...req.body,
        tripId,
      });
      
      const activity = await storage.createActivity(validatedActivity);
      res.json(activity);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.put("/api/activities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const activity = await storage.updateActivity(id, updates);
      
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      
      res.json(activity);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/activities/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteActivity(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Activity not found" });
      }
      
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
