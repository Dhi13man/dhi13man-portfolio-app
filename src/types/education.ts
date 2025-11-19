import type { Links, Images, DateRange } from "./common";

export interface Course extends DateRange {
  degree: string;
  field: string;
  gpa?: string;
  percentage?: string;
  description: string;
  details?: string[];
}

export interface Education {
  name: string;
  about: string;
  images?: Images;
  links?: Links;
  courses: Course[];
}
