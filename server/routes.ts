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

  const httpServer = createServer(app);

  return httpServer;
}
