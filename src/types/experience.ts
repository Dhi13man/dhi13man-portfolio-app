import type { Links, Images, DateRange } from "./common";

export interface Role extends DateRange {
  title: string;
  location?: string;
  description: string;
  details?: string[];
}

export interface Experience {
  name: string;
  about: string;
  images?: Images;
  links?: Links;
  roles: Role[];
}
