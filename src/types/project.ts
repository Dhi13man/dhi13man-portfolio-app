import type { Links, Images, DateRange } from "./common";

export interface Project extends DateRange {
  name: string;
  description: string;
  details?: string[];
  skills?: string[];
  images?: Images;
  links?: Links;
}
