// lib/types.ts
import type { Event, User } from "@prisma/client";

// Always ensure organizer is either User or null (not undefined)
export type EventWithOrganizer = Event & { organizer: User | null };
