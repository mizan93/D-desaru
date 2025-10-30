import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema } from "@shared/schema";
import { sendNewInquiryNotification } from "./emailService";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create inquiry endpoint
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      
      // Send email notification
      // try {
      //   await sendNewInquiryNotification(inquiry);
      // } catch (emailError) {
      //   console.error("Failed to send email notification:", emailError);
        // Don't fail the request if email fails
      // }
      
      res.json({ success: true, inquiry });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          error: "Validation failed",
          details: error.errors 
        });
      } else {
        console.error("💥 Error creating inquiry:");
        console.error("Full error object:", JSON.stringify(error, null, 2));
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        res.status(500).json({ 
          success: false,
          error: error.message || "Failed to create inquiry" 
        });
      }
    }
  });

  // Simple admin authentication middleware
  const adminAuth = (req: any, res: any, next: any) => {
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        error: "Admin access required - please provide authorization" 
      });
    }
    
    const token = authHeader.substring(7);
    if (token !== adminPassword) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid admin credentials" 
      });
    }
    
    next();
  };

  // Protected admin endpoint to get all inquiries
  app.get("/api/inquiries", adminAuth, async (req, res) => {
    try {
      const inquiries = await storage.getInquiries();
      res.json({ success: true, inquiries });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        error: "Failed to fetch inquiries" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
