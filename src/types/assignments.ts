import { z } from "zod";
import { AssignmentSchema } from "@schemas";

export type TAssignment = z.infer<typeof AssignmentSchema>;
