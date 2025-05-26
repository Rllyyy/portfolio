import { z } from "zod";

export const AssignmentSchema = z.object({
  moduleId: z.string(),
  title: z.string(),
  text: z.string(),
  date: z.string(),
  imageDescription: z.string(),
  pdfFileName: z.string(),
});

export const AssignmentsSchema = z.array(AssignmentSchema);
