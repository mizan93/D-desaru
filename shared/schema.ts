import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const inquiries = pgTable("inquiries", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("firstname").notNull(),
  lastName: text("lastname").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  checkIn: text("checkin"),
  checkOut: text("checkout"),
  message: text("message").notNull(),
  createdAt: timestamp("createdat").defaultNow().notNull(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
