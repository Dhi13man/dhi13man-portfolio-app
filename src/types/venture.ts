import type { Links, Images, DateRange } from "./common";

export interface VentureRole extends DateRange {
  title: string;
  location?: string;
  description: string;
  details?: string[];
}

export interface Venture {
  name: string;
  about: string;
  images?: Images;
  links?: Links;
  roles: VentureRole[];
}
